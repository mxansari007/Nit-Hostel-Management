const Admin=require('../models/admin');
const OTP=require('../models/OTP');
// require otp-otpGenerator

// Send OTP For Email Verification
exports.verifyotp = async (req, res) => {
    try {
      const { email,otp } = req.body;
  
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
      const otpcheck= await OTP.findOne({email,otp});
      if(otpcheck){
        return res.status(200).json({
            success: true,
            message: `OTP verified successfully`,
          })  
      }
      return res.status(200).json({
        success: false,
        message: `wrong OTP`,
      })  
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
  }