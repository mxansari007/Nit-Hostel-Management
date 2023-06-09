const mongoose  = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "swnf23$tzv8545?[]qpxrsehttmjnhbgyhc3t7c";
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
       const token=jwt.sign({_id:this._id.toString()},JWT_SECRET);
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