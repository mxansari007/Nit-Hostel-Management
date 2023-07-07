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
        // we are storing cookie in jwtoken and it will expires in 30days
        res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      }).status(200).send(findAdmin);
  
           
        }else{
            res.status(404).send("Invalid Username or Password");
        }
    } catch (error) {
        res.status(404).send("Invalid Username "+error.message);
    }
}