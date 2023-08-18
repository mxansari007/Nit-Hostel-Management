const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.logout = async(req,res)=>{
    try{
     const cookies = req.headers.cookie;
     console.log('logout cookies \n');
     if(!cookies){
      return res.status(401).send('cookie expired you can log out');
     }
     const prevToken = cookies.split("=")[1];
     if(!prevToken){
         return res.status(401).send('could not find prevtoken ,please login again');
        }
     jwt.verify(
           String(prevToken),
           process.env.JWT_SECRET,(err,user)=>{
              if(err){
                 console.log(err);
                 return res.status(401).send("auth failed in logout token");
              }
              res.clearCookie(`${user._id}`);
              req.cookies[`${user._id}`] ="";
              console.log("logged out successfully");
             return res.status(200).json({"message":"Sucessfully logged out"});
           }) 
 
    }catch(err){
          console.log(err);
          return res.status(500).json({"message":"error in logout"});
    }
 };