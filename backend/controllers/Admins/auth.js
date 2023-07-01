const Admin = require("../../models/admin");
const bcrypt=require("bcryptjs");

exports.adminLogin=async (req,res)=>{
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
}