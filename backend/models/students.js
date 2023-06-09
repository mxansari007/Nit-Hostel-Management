const mongoose  = require('mongoose');
const validator = require('validator');

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
        required:true
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
});


//! we will create a new collection
const Student = new mongoose.model('Student',studentSchema);


module.exports = Student;