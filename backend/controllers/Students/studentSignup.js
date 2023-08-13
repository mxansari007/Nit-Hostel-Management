const Profile = require("../../models/Profile");
const Student = require("../../models/students");
const BankDetail = require("../../models/BankDetails");
exports.studentSignup = async (req, res) => {
    try {
        // console.log(req.body);
        const { rollNo, firstName, lastName, year, password, department, email,
            gender,officialEmail,branch,course, dateOfBirth, contactNumber,
            secondaryNumber, fatherName, fatherOccupation,
            motherName, motherOccupation, semester, bloodGroup,
            identificationMark, address,state,
            AccountHolderName, AccountNumber,BankName, IFSC,
            image,aadhaarFrontImage,aadhaarBackImage} = req.body;

        const bankDetails = new BankDetail({
            AccountHolderName,
            AccountNumber,
            BankName,
            IFSC
        })

        await bankDetails.save();

        const profile = new Profile({
            gender,officialEmail,branch,course, dateOfBirth, contactNumber,
            secondaryNumber, fatherName, fatherOccupation,
            motherName, motherOccupation, semester, bloodGroup,
            identificationMark, address,image, aadhaarFrontImage,aadhaarBackImage,bankDetails: bankDetails._id
        })
        // console.log(profile)
        await profile.save();




        const user = new Student({
            rollNo,
            firstName,
            lastName,
            year,
            password,
            department,
            email,
            Profile: profile._id,

        });

        // console.log(user)
        await user.save();

        res.status(201).send(profile);
        // res.status(201).send(user);

    } catch (e) {
        res.status(400).send(e);
    }
}