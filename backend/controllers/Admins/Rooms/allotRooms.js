const RoomsData = require('../../../models/rooms')
const StudentsData = require('../../../models/students')

exports.allotRooms = async (req, res) => {
    try {
        const totalRooms = await RoomsData.countDocuments();
        const fullyOccupiedRooms = await RoomsData.countDocuments({ status: 'full' });

        // console.log(totalRooms);
        const filter = {};

        // filters based on query parameters
        if (req.query.roomNo) {
            filter.roomNo = req.query.roomNo;
        }

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.floorNo) {
            filter.floorNo = req.query.floorNo;
        }

        // Data sorting queries 
        const sortField = req.query.sortField || 'roomNo'; // Default sort field is 'name' if not provided
        const sortOrder = req.query.sortOrder === 'desc' // Sort order, default is ascending

        // pagination queries
        const page = parseInt(req.query.page) || 0; // Default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10; // Default page size is 10 if not provided


        const data = await RoomsData.find(filter).skip(page).limit(pageSize).sort({ [sortField]: sortOrder });

        res.status(201).json({ data: data, totalRooms: totalRooms, fullyOccupiedRooms: fullyOccupiedRooms });
    } catch (error) {
        res.status(400).json({ error: 'Internal Server Error' });
    }

}