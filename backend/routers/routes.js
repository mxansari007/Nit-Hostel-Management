const express =require('express');
const router =new express.Router();
const Student =require('../models/students');
const Admin = require('../models/admin');
const bcrypt=require("bcryptjs");

router.post('/signup',async(req, res)=>{
    try{
        console.log(req.body);
        const {rollNo,firstName,lastName,year,password,confirm,department,email } = req.body;
        const user = new Student({
            rollNo,
            firstName,
            lastName,
            year,
            password,
            department,
            email
        });
        const token= await user.generateAuthToken();

        const createUser= await user.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
});

//// for admin login
router.post('/adminlogin',async (req, res)=>{
    try {
        const {username,password}=req.body;
        const findAdmin = await Admin.findOne({username: username});
        const isMatch=await bcrypt.compare(password,findAdmin.password);
        const token= await findAdmin.generateAuthToken();
        console.log("upto token"+token);
        console.log(isMatch);
        if(isMatch){
            res.status(200).send(findAdmin);
        }else{
            res.status(404).send("Invalid Username or Password");
        }
    } catch (error) {
        res.status(404).send("Invalid Username "+error.message);
    }
});

//// for students login

router.post('/studentlogin',async (req, res)=>{
    try {
        const {rollno,password}=req.body;
        const findAdmin = await Admin.findOne({rollno: rollno, password: password});
        if(findAdmin){
            res.status(200).send(findAdmin);
        }else{
            res.status(404).send("Invalid Username or Password");
        }
    } catch (error) {
        res.status(404).send("Invalid Username "+error.message);
    }
});

//// for csv students upload
router.post('/csv', (req,res)=>{
    const data=req.body;
    data.map((key)=>{
     let roll=key.rollNo;
      roll=parseInt(roll, 10);
      key.rollNo=roll;
     let year=key.year;
      year=parseInt(year, 10);
      key.year=year;
    });
    console.log(data);
    try {
    Student.insertMany(data).then((ress)=>{
            res.status(201).send(ress);
        })
    }catch (error){
        res.status(400).send(error);
    }
});


module.exports = router;
