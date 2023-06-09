const express =require('express');
const router =new express.Router();
const Student =require('../models/students');
const Admin = require('../models/admin');


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

        console.log("await se pehle");
        const createUser= await user.save();
        // res.status(201).send({message:"User registered successfully "+createUser.firstName + " "+ createUser.lastName});
        console.log("res se pehle");
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
});


router.post('/adminlogin',async (req, res)=>{
    try {
        const username=req.body.username;
        const password=req.body.password;
        const User= await Admin.findOne({username:username})
        console.log(User);
        res.send({message:`Success ${User.username}`});
    } catch (error) {
        res.status(404).send("Invalid Username");
    }


    // const {username, password} = req.body;
    // const dbdata=await Admin.find({username:username});
    // console.log(dbdata.password + " " + password);
    // if(dbdata){
    //     if(dbdata.password==password){
    //       res.status(200).send({message: `Login successful  ${dbdata}`});
    //      }else{
    //         res.status(400).send({message:`password is incorrect  ${dbdata} and will be`});
    //     }
    // }else{
    //      res.send({message: `User not registered ${dbdata} nnnjn`});
    // }
});

module.exports = router;