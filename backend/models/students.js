const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "swnf23$tzv8545?[]qpxrsehttmjnhbgyhc3t7c";

const studentSchema=new mongoose.Schema({
    rollNo:{
        type:Number,
        min:8,
        required:true,
        unique:[true,"Phone number already present"],
    },
    firstName:{
        type:String,
        required:true,
        minlength:3
    },
    lastName:{
        type:String,
        required:true,
        minlength:3
    },
    year:{
        type:Number,
        required:true,
     },
     password:{
        type:String,
        // required: true
    },
    department:{
            type:String,
            required:true,
        },
    email:{
        type:String,
        required:true,
        unique:[true,"Email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

studentSchema.methods.generateAuthToken =async function(next){
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
studentSchema.pre('save',async function(next){
    if(this.isModified("password")){
      this.password=await bcrypt.hash(this.password,10);
      next();
    }
});

//! we will create a new collection
const Student = new mongoose.model('Student',studentSchema);


module.exports = Student;