const Student =require('../../models/students');
const Profile = require('../../models/Profile');
const BankDetails = require('../../models/BankDetails');

exports.jsonUpload = async (req,res)=>{
    
    const jsonObj=req.body;
   try {
    const alldb=await Student.find({});
    let insertPayload=[];
    let update=[];

    //?code to seperate insertpayload and update
    jsonObj.forEach((item,index)=>{
      const exists=alldb.some((student)=>{
             return student.rollNo == item.rollNo || student.email == item.email;
      });
      if(exists){
          update.push(item);
      }else{
          insertPayload.push(item);
      }
    });
    

   
//? Separate student, profile, and bank details data
const students = [];
const profiles = [];
const bankDetails = [];
insertPayload.forEach((obj)=>{
students.push({rollNo:obj.rollNo,
               firstName:obj.firstName,
               lastName:obj.lastName,
               year:obj.year,
               department:obj.department,
               password:obj.password,
               email:obj.email
               });
profiles.push({
               gender:obj.gender,
               dateOfBirth:obj.dateOfBirth,
               contactNumber:obj.contactNumber,
               secondaryNumber:obj.secondaryNumber,
               fatherName:obj.fatherName,
               fatherOccupation:obj.fatherOccupation,
               motherName:obj.motherName,
               motherOccupation:obj.motherOccupation,
               semester:obj.semester,
               bloodGroup:obj.bloodGroup,
               identificationMark:obj.identificationMark,
               address:obj.address,
               });

  bankDetails.push({
               AccountHolderName:obj.AccountHolderName,
               AccountNumber:obj.AccountNumber,
               BankName:obj.BankName,
               IFSC:obj.IFSC
                  });
});

// console.log("student");
// console.log(students);
// console.log("profiles");
// console.log(profiles);
// console.log("bankdetails");
// console.log(bankDetails);
//? Function to create a bank details document and return its ID
async function createBankDetails(bankDetailsData) {
const createdBankDetails = await BankDetails.create(bankDetailsData);
return createdBankDetails._id;
}

//? Function to create a profile document and return its ID
async function createProfile(profileData) {
const createdProfile = await Profile.create(profileData);
return createdProfile._id;
}

//? Create bank details documents one by one
const bankDetailsPromises = bankDetails.map((bankDetailsData) =>
createBankDetails(bankDetailsData)
);

//? Wait for all bank details creation promises to resolve
Promise.all(bankDetailsPromises)
.then((bankDetailsIds) => {
  //? Update profile objects with bank details IDs
  const updatedProfiles = profiles.map((profile, index) => ({
    ...profile,
    bankDetails: bankDetailsIds[index],
  }));
  // console.log("updatedProfiles");
  // console.log(updatedProfiles);
  //? Create profile documents with updated data
  return Profile.insertMany(updatedProfiles);
})
.then((createdProfiles) => {
  //? Retrieve the profile IDs
  const profileIds = createdProfiles.map((profile) => profile._id);
  
  //? Update student objects with profile IDs
  const updatedStudents = students.map((student, index) => ({
    ...student,
    Profile: profileIds[index],
  }));
  // console.log("updatedStudents");
  // console.log(updatedStudents);
  //? Create student documents with updated data
  return Student.insertMany(updatedStudents);
  })
.then((createdStudents) => {
  console.log('Student documents created:', createdStudents);
  return res.send(update);
})
.catch((error) => {
  console.error('Error:', error);
  return res.send(error);
});    
   } catch (error) {
      return res.send(error);
   }
};