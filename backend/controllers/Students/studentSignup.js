const Student =require("../../models/students");
exports.studentSignup = async(req,res)=>{
    try{
        console.log(req.body);
        const {rollNo,firstName,lastName,year,password,confirm,department,email } = req.body;
        const user = new Student({
            rollNo,
            firstName,
            lastName,
            year,
            password,
            department,
            email
        });
        const createUser= await Student.save();
        res.status(201).send(createUser);
    }catch(e){
        res.status(400).send(e);
    }
}