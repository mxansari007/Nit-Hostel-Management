const mongoose  = require('mongoose');
const validator = require('validator');

const adminSchema=new mongoose.Schema({
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
});


//! we will create a new collection
const Admin = new mongoose.model('Admin',adminSchema);


module.exports = Admin;