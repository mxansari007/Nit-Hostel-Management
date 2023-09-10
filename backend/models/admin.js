const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },  
   
});

adminSchema.methods.generateAuthToken =async function(next){
    try{
       const token=jwt.sign({_id:this._id,accountType: "admin"},process.env.JWT_SECRET);
       return token;
    }catch(e){
        console.log("the error occurred generate auth token function"+e);
        throw 501;
    }
};
//! we will create a new collection
const Admin = new mongoose.model('Admin',adminSchema);


module.exports = Admin;