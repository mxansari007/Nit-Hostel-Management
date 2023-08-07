const Rooms = require('../../../models/rooms')
const Students = require('../../../models/students')

exports.roomController = async (req, res) => {
    try {

        // getting students information
        const { rollNo, roomNo, floorNo, status, occupancy } = req.body;
        const data = await Students.findOne({ rollNo });
        const idOfStudent = data._id

        const isRoomExist = await Rooms.findOne({ roomNo }) === 'true';

        if (isRoomExist === undefined) {
            const allottedRoom = new Rooms({
                roomNo, floorNo, status, occupancy, students: idOfStudent
            })

            await allottedRoom.save()
        } else {
            console.log(idOfStudent)
        }



        // const data1 = await Students.findOne(idOfStudent);



        return res.status(200).send({ data: data });


    } catch (err) {
        return res.status(401).send("error " + err.message);
    }

}