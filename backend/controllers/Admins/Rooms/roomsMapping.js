const Room = require('../../../models/rooms');
//const addStudent = require('../../../controllers/Admins/Rooms/addStudent');
const Student = require('../../../models/students')

exports.roomsMapping = async (req, res) => {

    try {
        const data = req.body; // Array of objects [{ roomNo, rollNo }, ...]

        for (const item of data) {
            const { roomNo, rollNo } = item;

            // Find the room document based on roomNo
            const room = await Room.findOne({ roomNo });

            if (!room) {
                return res.status(404).json({ error: 'Room not found.' });
            }

            if (room.students.length === 2) {
                return res.status(401).json({ error: 'Room is full.' });
            }

            console.log(room);
            // Find the student document based on rollNo
            const student = await Student.findOne({ rollNo }).populate('Rooms');

            if (!student) {
                return res.status(404).json({ error: 'Student not found.' });
            }

            if (student.Rooms.length === 1) {
                return res.status(401).json({ error: `Student already in room ${student.Rooms[0].roomNo}` });
            }
            console.log(student);

            // Update the students array in the room document with the reference to the student
            room.students.push(student._id);
            student.Rooms.push(room._id);
            // Save the updated room document

            if (room.status === 'vacant') {
                room.status = 'Half-filled'
            } else {
                room.status = 'Fully-filled';
            }


            await room.save();
            await student.save()
        }

        res.status(200).json({ message: 'Students added to rooms successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
};