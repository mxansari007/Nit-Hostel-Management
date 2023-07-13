const jwt = require('jsonwebtoken')
require("dotenv").config();
exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token = req.Cookies.token 
    || req.body.token;

     //if token missing, then return response
     console.log("in auth mid"+token);
     if(!token) {
      return res.status(404).send('TOken is missing');
  }
   try {
    const verifyUser = jwt.verify(
      token,
      process.env.JWT_SECRET
    )
    console.log(verifyUser);
   } catch (error) {
     return res.send("invalid token")
   }

    next();
  } catch (error) {
     return res.status(401).send("auth me"+error);
  }
}

