const Student = require('../../models/students');

exports.studentInfo = async (req, res) => {
    try {
        const { rollNo, firstName, lastName, department } = req.body;
        const payload = {};
        if (rollNo != '' && rollNo != undefined) {
            payload.rollNo = parseInt(rollNo, 10);
        }
        if (firstName != '' && firstName != undefined) {
            payload.firstName = firstName;
        }
        if (lastName != '' && lastName != undefined) {
            payload.lastName = lastName;
        }
        if (department != '' && department != undefined) {
            payload.department = department;
        }
        console.log("payload: " + payload);

        // Data sorting queries 
        const sortField = req.query.sortField || 'rollNo'; // Default sort field is 'name' if not provided
        const sortOrder = req.query.sortOrder === 'desc' // Sort order, default is ascending

        // pagination queries
        const page = parseInt(req.query.page) || 0; // Default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10; // Default page size is 10 if not provided

        const students = await Student.find(payload).populate({
            path: 'Profile',
            populate: {
                path: 'bankDetails',
                model: 'BankDetails',
            },
        }).populate({
            path: 'Rooms'
        }).skip(page).limit(pageSize).sort({ [sortField]: sortOrder });;
        console.log("student" + students);
        return res.send(students);
    } catch (error) {
        return res.send(error.message);
    }
};