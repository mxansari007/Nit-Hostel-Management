const Rooms = require('../../../models/rooms')
const Students = require('../../../models/students')

// romove students references from room collection
const removeStudentFromRoom = async (roomData, idOfRoom, idOfStudent) => {

    const stringObjectIdToRemove = idOfStudent.toString();

    const newStudent = roomData.students.filter(item => item.toString() !== stringObjectIdToRemove);
    // console.log(newStudent);

    await Rooms.findByIdAndUpdate(idOfRoom, { students: newStudent });
    if (roomData.status === 'Fully-filled') {
        await Rooms.findByIdAndUpdate(idOfRoom, { status: 'Half-filled' })
    } else {
        await Rooms.findByIdAndUpdate(idOfRoom, { status: 'vacant' })
    }
}


// REMOVE room refernce from students collection
const removeRoomFromStudent = async (studentData, idOfStudent, idOfRoom) => {


    const stringObjectIdToRemove = idOfRoom.toString();

    const newRoom = studentData.Rooms.filter(item => item.toString() !== stringObjectIdToRemove);

    await Students.findByIdAndUpdate(idOfStudent, { Rooms: newRoom });
}

exports.removeStudent = async (req, res) => {

    try {
        const { roomNo, rollNo } = req.body;

        const studentData = await Students.findOne({ rollNo });
        const roomData = await Rooms.findOne({ roomNo });
        const idOfRoom = roomData._id;
        const idOfStudent = studentData._id;


        removeStudentFromRoom(roomData, idOfRoom, idOfStudent);
        removeRoomFromStudent(studentData, idOfStudent, idOfRoom);

        res.status(200).send({ success: true })

    } catch (err) {
        return res.status(401).send("error " + err.message);
    }
}