const Admin=require('../models/admin');
const bcrypt=require("bcryptjs");
exports.changePassword = async (req, res) => {
    try{
        //extract variables
         const {email,oldPassword,newPassword,confirmPassword} = req.body;
         //find admin
         const admin= await Admin.findOne({email});
         if(!admin){
            return res.json({
                success: false,
                message: "admin not found",
              });
         }
         //compare given password with password in db
         const isMatch=await bcrypt.compare(oldPassword,admin.password);
         if(!isMatch){
            return res.json({
                success: false,
                message: "OldPassword is Worng",
              });
         }
          //check if confirm password is equal to new password
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
          
      }catch(err){
       console.log(err.message)
       return res.status(500).json({ success: false, err: "Internal Server Error" })
      }
  }