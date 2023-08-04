const express = require('express');
const router = new express.Router();
const multer = require('multer');
const path = require('path');


const { studentInfo } = require("../controllers/Admins/studentInfo");
const { csvUpload } = require("../middlewares/csvUpload");
const { jsonUpload } = require('../controllers/Admins/jsonUpload');
const { studentLogin } = require("../controllers/Students/studentLogin");
const { adminLogin } = require("../controllers/Admins/adminLogin");
const { studentSignup } = require("../controllers/Students/studentSignup");
const { pdfDownload } = require("../controllers/pdf-download");
const { auth } = require("../middlewares/auth");



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
console.log(path.join(__dirname, '../public/uploads'));
//// student signup
router.post('/studentSignup', studentSignup);

//// for admin login
router.post('/adminlogin', adminLogin);

//// for students login

router.post('/studentlogin', studentLogin);

//// for csv students upload
router.post('/csv', auth, upload.single('file'), csvUpload, jsonUpload);
////for json students upload
router.post('/jsonUpload', auth, jsonUpload);
//// to download pdf file
router.post('/pdfDownload', auth, pdfDownload);
//// view student data
router.post('/viewStudentInfo', auth, studentInfo);

//// controllers  for  allot room

// router.addRooms('/addRooms',addRooms);

//*  get count 
// router.get('/getCount',auth,getCount);
// router.post('/roomsSearch',auth,roomsSearch);

module.exports = router;
