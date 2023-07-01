const mongoose  = require('mongoose');
const validator = require('validator');
const ProfileSchema=new mongoose.Schema({
    gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
    secondaryNumber:{
        type: Number,
    },
    fatherName:{
        type: String,
    },
    fatherOccupation:{
        type: String,
    },
    motherName:{
        type: String,
    },
    motherOccupation:{
        type: String,
    },
    semester:{
        type:Number
    },
    bloodGroup:{
        type: String,
    },
    identificationMark:{
        type: String,
    }
    ,
    address:{
        type: String,
    },
    bankDetails:{
        type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "BankDetails",
    }
});

//! we will create a new collection
const Profile = new mongoose.model('Profile',ProfileSchema);


module.exports = Profile;