const mongoose  = require('mongoose');
const validator = require('validator');
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
require("dotenv").config();
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
    Profile:{
        type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Profile",
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
       const token=jwt.sign({_id:this._id.toString(),accountType: "student"},process.env.JWT_SECRET,{
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
studentSchema.pre('save',async function(next){
    if(this.isModified("password")){
      this.password=await bcrypt.hash(this.password,10);
      next();
    }
});

//! we will create a new collection
const Student = new mongoose.model('Student',studentSchema);


module.exports = Student;