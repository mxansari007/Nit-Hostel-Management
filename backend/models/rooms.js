const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNo: {
        type: Number,
        required: true,
        unique: true
    },
    floorNo: {
        type: Number
    },
    occupancy: {
        type: String
    },
    status: {
        type: String
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    }],
});


//! we will create a new collection
const Rooms = new mongoose.model('Rooms', roomSchema);


module.exports = Rooms;