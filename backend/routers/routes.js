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

module.exports = router;
