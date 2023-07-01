const express =require('express');
const router =new express.Router();

const {studentInfo} =require("../controllers/Admins/studentInfo");
const {csvUpload} =require("../controllers/Admins/csvUpload");
const {studentLogin} =require("../controllers/Students/studentLogin");
const {adminLogin} =require("../controllers/Admins/auth");
const {studentSignup} =require("../controllers/Students/studentSignup");

//// student signup
router.post('/signup',studentSignup);

//// for admin login
router.post('/adminlogin',adminLogin);

//// for students login

router.post('/studentlogin',studentLogin);

//// for csv students upload
router.post('/csv', csvUpload);
//// view student data
router.post('/viewStudentInfo',studentInfo);

module.exports = router;
