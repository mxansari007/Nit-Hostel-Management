const mongoose= require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL||'mongodb://127.0.0.1:27017/Hostel11',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("Connection established"))
.catch((err)=>{
    console.log("Connection failed "+err);
    process.exit(1);
});