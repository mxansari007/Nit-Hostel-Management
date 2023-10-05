const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const adminSchema=new mongoose.Schema({
    password:{
        type:String,
        required:[true,"please enter a password"]
    },
    email:{
        type:String,
        unique:[true,"please enter a email address"],
        required:true,
        validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("invalid email");
                }
            }
    },
    mobile:{
        type :Number,
    }
   
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