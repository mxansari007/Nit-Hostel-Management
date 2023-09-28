const Admin=require('../models/admin');
const OTP=require('../models/OTP');
const bcrypt=require("bcryptjs");
exports.forgotPassword = async (req, res) => {
     try{
       //extract var
        const {email,newPassword,confirmPassword,otp} = req.body;
        // we have used otp as key although otp has been already verified
        // but for extra security we need to check otp here again
        const check=await OTP.findOne({email});
        console.log("check "+check);
        console.log("otp "+ check.otp);

        if(check){
         if(check.otp==otp){

          if (confirmPassword !== newPassword) {
            return res.json({
              success: false,
              message: "Password and Confirm Password Does not Match",
            });
          }
          //encrypt the password
          const encryptedPassword = await bcrypt.hash(newPassword, 10);
          //update the password in db
	        const changed=	await Admin.findOneAndUpdate(
			              {email },
                    { password: encryptedPassword },
                    { new: true }
                    );
          console.log(changed);
            res.json({
            success: true,
            message: `Password change Successful`,
          });
         }else{
           return res.status(500).json({ success: false, message:"Internal Server Error"});
         }
        }else{
          return res.status(500).json({ success: false, message:"Internal Server Error"});
        }
     }catch(err){
      console.log(err.message)
      return res.status(500).json({ success: false, err: "Internal Server Error" })
     }
  }