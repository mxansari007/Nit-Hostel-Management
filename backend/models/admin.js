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
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

adminSchema.methods.generateAuthToken =async function(next){
    try{
       const token=jwt.sign({_id:this._id.toString(),accountType: "admin"},process.env.JWT_SECRET,{
        expiresIn: "1h",
    });
       this.tokens=this.tokens.concat({token});
       await this.save();
       return token;
    }catch(e){
          res.send("the error occurred"+error);
          console.log("the error occurred"+error);
    }
};
//! we will create a new collection
const Admin = new mongoose.model('Admin',adminSchema);


module.exports = Admin;