const mongoose= require("mongoose");

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("Connection established"))
.catch((err)=>console.log("Connection failed "+err));