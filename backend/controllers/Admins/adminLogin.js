const Admin = require("../../models/admin");
const bcrypt=require("bcryptjs");

exports.adminLogin=async (req,res)=>{
    try {
        const {email,password}=req.body;
        console.log(email + password);
        const findAdmin = await Admin.findOne({email});
        console.log(findAdmin);
        if(!findAdmin){
            return res.status(401).send("email not registered");
        }
        const isMatch=await bcrypt.compare(password,findAdmin.password);
        const token= await findAdmin.generateAuthToken();
        console.log("token from admin login \n "+token+"\n");
        if(isMatch){
            const options = {
				expires: new Date(Date.now() +   15 * 60 * 60 * 1000),
        // expires:10000,
				httpOnly: true,
                path: "/",
                sameSite: 'none',
                secure:true
			};
        // we are storing cookie in jwtoken and it will expires in 30days
        res.cookie(String(findAdmin._id), token, options);
        res.status(200).send("token successfully stored");
        }else{
            res.status(401).send("Invalid Username or Password");
        }
    } catch (error) {
        res.status(404).send("Unable to login Internal server error "+error);
    }
}