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
    occupants: {
        type: Number
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