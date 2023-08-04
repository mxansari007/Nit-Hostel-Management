const Profile = require("../../models/Profile");
const Student = require("../../models/students");
exports.studentSignup = async (req, res) => {
    try {
        // console.log(req.body);
        const { rollNo, firstName, lastName, year, password, department, email,
            gender, dateOfBirth, contactNumber,
            secondaryNumber, fatherName, fatherOccupation,
            motherName, motherOccupation, semester, bloodGroup,
            identificationMark, address, bankDetails } = req.body;

        const profile = new Profile({
            gender, dateOfBirth, contactNumber,
            secondaryNumber, fatherName, fatherOccupation,
            motherName, motherOccupation, semester, bloodGroup,
            identificationMark, address, bankDetails
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
            Profile: profile._id
        });

        // console.log(user)
        await user.save();

        res.status(201).send(profile);
        // res.status(201).send(user);

    } catch (e) {
        res.status(400).send(e);
    }
}