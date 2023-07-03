const express =require('express');
const router =new express.Router();
const multer  = require('multer');


const {studentInfo} =require("../controllers/Admins/studentInfo");
const {csvUpload} =require("../controllers/Admins/csvUpload");
const {studentLogin} =require("../controllers/Students/studentLogin");
const {adminLogin} =require("../controllers/Admins/auth");
const {studentSignup} =require("../controllers/Students/studentSignup");
const {pdfDownload} =require("../controllers/pdf-download");
const {auth} = require("../middlewares/auth");

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./backend/public/uploads')
    },
    filename:(req,file,cb)=>{
       cb(null,file.originalname);
    }
});
var upload = multer({storage:storage});

//// student signup
router.post('/signup',studentSignup);

//// for admin login
router.post('/adminlogin',adminLogin);

//// for students login

router.post('/studentlogin',studentLogin);

//// for csv students upload
router.post('/csv',auth,upload.single('file'), csvUpload);
//// to download pdf file
router.post('/pdfDownload',auth,pdfDownload);
//// view student data
router.post('/viewStudentInfo',auth,studentInfo);

  data.map((key) => {
    let roll = key.rollNo
    roll = parseInt(roll, 10)
    key.rollNo = roll
    let year = key.year
    year = parseInt(year, 10)
    key.year = year
  })
  console.log(data)
  try {
    const sks = await Student.insertMany(data)
    console.log(sks)
    res.send(sks)
  } catch (error) {
    res.status(400).send(error)
  }
})
//// view student data
router.post('/viewStudentInfo', auth, async (req, res) => {
  try {
    const { rollNo, firstName, lastName, department } = req.body
    const payload = {}
    if (rollNo != '' && rollNo != undefined) {
      payload.rollNo = parseInt(rollNo, 10)
    }
    if (firstName != '' && firstName != undefined) {
      payload.firstName = firstName
    }
    if (lastName != '' && lastName != undefined) {
      payload.lastName = lastName
    }
    if (department != '' && department != undefined) {
      payload.department = department
    }
    console.log('payload: ' + payload)
    const students = await Student.find(payload).exec()
    console.log('student' + students)
    res.send(students)
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
