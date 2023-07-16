const Student =require('../../models/students');

exports.studentInfo = async (req,res)=>{
    try {
        const {rollNo,firstName,lastName,department} = req.body;
        const payload = {};
        if(rollNo!='' && rollNo!=undefined){
            payload.rollNo=parseInt(rollNo, 10);
        }
        if(firstName!='' && firstName!=undefined){
            payload.firstName=firstName;
        }
        if(lastName!='' && lastName!=undefined){
            payload.lastName=lastName;
        }
        if(department!='' && department!=undefined){
            payload.department=department;
        }
        console.log("payload: "+payload);
        const students = await Student.find(payload).populate({
            path:'Profile',
            populate: {
                path:'bankDetails',
                model:'BankDetails'
            }
        }).exec();
        console.log("student"+students);
        return res.send(students);
      } catch (error) {
        return res.send(error.message);
      }
};