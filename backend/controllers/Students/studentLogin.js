const Admin =require("../../models/admin");

exports.studentLogin= async (req,res)=>{
    try {
        const {rollno,password}=req.body;
        const findAdmin = await Admin.findOne({rollno: rollno, password: password});
        if(findAdmin){
            res.status(200).send(findAdmin);
        }else{
            res.status(404).send("Invalid Username or Password");
        }
    } catch (error) {
        res.status(404).send("Invalid Username "+error.message);
    }
}