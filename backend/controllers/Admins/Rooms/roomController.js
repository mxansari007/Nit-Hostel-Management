const Rooms = require('../../../models/rooms')
const Students = require('../../../models/students')

exports.roomController = async (req, res) => {
    try {

        // getting students information
        let { rollNo, roomNo, floorNo, status, occupancy } = req.body;

        const studentData = await Students.findOne({ rollNo });
        const idOfStudent = studentData._id

        const roomData = await Rooms.findOne({ roomNo });
        const idOfRoom = roomData._id
        if (roomData.students.length !== 2) {

            try {
                const allotRoom = await Rooms.findByIdAndUpdate(idOfRoom, { $push: { students: idOfStudent } });
                // console.log(allotRoom);
                await Students.findByIdAndUpdate(idOfStudent, { Rooms: idOfRoom });

                // after allotment we update the room status as well
                if (status === 'vacant') {
                    await Rooms.findByIdAndUpdate(idOfRoom, { status: 'Half-filled' })
                } else {
                    await Rooms.findByIdAndUpdate(idOfRoom, { status: 'Fully-filled' })
                }

                // 
                res.status(200).send('Room Successfully Alloted');

            } catch (error) {
                return res.status(401).send("error " + error.message);
            }
        } else {
            res.status(201).send('cannot allot room');

        }

    } catch (err) {
        return res.status(401).send("error " + err.message);

    }

}
