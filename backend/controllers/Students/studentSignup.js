const Profile = require("../../models/Profile");
const Student = require("../../models/students");
const BankDetail = require("../../models/BankDetails");
exports.studentSignup = async (req, res) => {
    try {
        // console.log(req.body);
        const { rollNo, firstName, lastName, year, password, department, email,
            gender, dateOfBirth, contactNumber,
            secondaryNumber, fatherName, fatherOccupation,
            motherName, motherOccupation, semester, bloodGroup,
            identificationMark, address, AccountHolderName, AccountNumber,image, BankName, IFSC } = req.body;

        const bankDetails = new BankDetail({
            AccountHolderName,
            AccountNumber,
            BankName,
            IFSC
        })

        await bankDetails.save();

        const profile = new Profile({
            gender, dateOfBirth, contactNumber,
            secondaryNumber, fatherName, fatherOccupation,
            motherName, motherOccupation, semester, bloodGroup,
            identificationMark, address,image, bankDetails: bankDetails._id
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