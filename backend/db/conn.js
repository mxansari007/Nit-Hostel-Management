const mongoose= require("mongoose");
require("dotenv").config();

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
=======
console.log(`uri is ${process.env.MONGODB_URL}`);
mongoose.connect(`${process.env.MONGODB_URL}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
>>>>>>> 80d5cf8b8c3cdc0ce2c2b21df1e5da0403d65f86
.then(()=>console.log("Connection established"))
.catch((err)=>{
    console.log("Connection failed "+err);
    process.exit(1);
});