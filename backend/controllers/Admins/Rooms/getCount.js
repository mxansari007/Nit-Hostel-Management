const Rooms = require('../../../models/rooms');

exports.getCount = async (req, res) => {
    try {
        const data = await Rooms.find();
        // const VacantCount = await Rooms.countDocuments({ occupancy: { $eq: 0 } });
        const totalRooms = data.length;
        console.log(totalRooms);
        // console.log(VacantCount);
        return res.json({
            success: true,
            data: data,
            // VacantCount: VacantCount,
            totalRooms: totalRooms
        });
    } catch (err) {
        return res.status(401).send("error getting count of rooms" + err.message);
    }
};