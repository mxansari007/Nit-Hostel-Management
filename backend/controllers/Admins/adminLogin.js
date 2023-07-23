const Admin = require("../../models/admin");
const bcrypt=require("bcryptjs");

exports.adminLogin=async (req,res)=>{
    try {
        const {username,password}=req.body;
        const findAdmin = await Admin.findOne({username: username});
        const isMatch=await bcrypt.compare(password,findAdmin.password);
        const token= await findAdmin.generateAuthToken();
        // console.log("upto token "+token);
        // console.log(isMatch);
        if(isMatch){
            const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        // expires:10000,
				httpOnly: true,
                path: "/",
                secure:true,
                sameSite:'none'
			};
        // we are storing cookie in jwtoken and it will expires in 30days
        res.cookie('accessToken', token, options).status(200).send(token);
  
           
        }else{
            res.status(401).send("Invalid Username or Password");
        }
    } catch (error) {
      return res.status(404).send("Invalid Username "+error.message);
    }
}