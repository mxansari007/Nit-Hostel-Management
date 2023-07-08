const jwt = require('jsonwebtoken')
require("dotenv").config();
exports.auth = async (req, res, next) => {
  try {
    //extract token
   const {authorization} = res.headers
   if(!authorization) {
    return res.status(401).send('Authorization token is req')
   }
   const token = authorization.split(' ')[1]

     //if token missing, then return response
     console.log("in auth mid"+token);
     if(!token) {
      return res.status(404).send('Token is missing');
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

