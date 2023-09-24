const Admin=require('../models/admin');
const OTP=require('../models/OTP');
const otpGenerator = require("otp-generator")
// require otp-otpGenerator

// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if user is already present
      // Find user with provided email
      const checkUserPresent = await Admin.findOne({ email });
      // to be used in case of signup
  
      // If user found with provided email
      if (!checkUserPresent) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is not Registered with us`,
        })
      }
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      const result = await OTP.find({ email })
      console.log(result);
      if(result.length >0){
        const result2 = await OTP.findOneAndUpdate(result.email,{otp:otp});
        result2.save();
        console.log("result2"+result2);
      }else{
        const otpPayload = { email, otp }
        const otpBody = await OTP.create(otpPayload)
        console.log("OTP Body", otpBody)    
      }
      
      return res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
  }