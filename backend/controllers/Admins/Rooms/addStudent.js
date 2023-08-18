const Rooms = require('../../../models/rooms')
const Students = require('../../../models/students')

const handelRoom = async (roomNo, studentData) => {
    const roomData = await Rooms.findOne({ roomNo });
    const idOfRoom = roomData._id;
    const idOfStudent = studentData._id

    // if the student doesn't allot any room
    if (studentData.Rooms.length === 0) {
        if (roomData.students.length !== 2) {

            try {


                const allotRoom = await Rooms.findByIdAndUpdate(idOfRoom, { $push: { students: idOfStudent } });
                // console.log(allotRoom);
                await Students.findByIdAndUpdate(idOfStudent, { Rooms: idOfRoom });

                // after allotment we update the room status as well

                if (roomData.status === 'vacant') {
                    await Rooms.findByIdAndUpdate(idOfRoom, { status: 'Half-filled' })
                } else {
                    await Rooms.findByIdAndUpdate(idOfRoom, { status: 'Fully-filled' })
                }

                return 'Success';

            } catch (error) {
                return ("error " + error.message);
            }
        } else {
            return 'Fully-filled';

        }
    } else {
        return 'allreadyAlloted'

    }


}

exports.addStudent = async (req, res) => {
    try {

        // getting students information
        const { rollNo, roomNo } = req.body;

        const studentData = await Students.findOne({ rollNo });
        // console.log(studentData)
        // if student's data doesn't exist in database(i.e student is not registered)
        if (studentData === null) {
            return res.status(500).send({ message: 'Student not found' });
        } else {

            const result = await handelRoom(roomNo, studentData);
            return res.status(200).send({ status: result });
        }


    } catch (err) {
        return res.status(500).send("error " + err.message);

    }

}
