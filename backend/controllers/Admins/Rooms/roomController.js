const Rooms = require('../../../models/rooms')
const Students = require('../../../models/students')

exports.roomControllers = async (req, res) => {
    try {

        const data = await Room.find();
        const { } = req.body;


    } catch (err) {
        return res.status(401).send("error " + err.message);
    }

}