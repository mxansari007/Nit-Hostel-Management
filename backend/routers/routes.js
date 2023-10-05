const express = require('express');
const router = new express.Router();
const multer = require('multer');
const path = require('path');

const { jsonRoomUpload } = require("../controllers/Admins/Rooms/jsonRoomUpload");
const { studentInfo } = require("../controllers/Admins/studentInfo");
const { deleteStudent } = require("../controllers/Admins/deleteStudent");
const { csvUpload } = require("../middlewares/csvUpload");
const { jsonUpload } = require('../controllers/Admins/jsonUpload');
const { studentLogin } = require("../controllers/Students/studentLogin");
const { adminLogin } = require("../controllers/Admins/adminLogin");
const { logout } = require('../controllers/Admins/logout');
const { sendotp } = require('../controllers/sendotp');
const { verifyotp } = require('../controllers/verifyotp');
const { forgotPassword } = require('../controllers/forgotPassword');
const { changePassword } = require('../controllers/changePassword');
const { studentSignup } = require("../controllers/Students/studentSignup");
const { pdfDownload } = require("../controllers/pdf-download");
const { auth } = require("../middlewares/auth");
const { allotRooms } = require('../controllers/Admins/Rooms/allotRooms');
const { addStudent } = require('../controllers/Admins/Rooms/addStudent');
const { removeStudent } = require('../controllers/Admins/Rooms/removeStudent');
const { roomsMapping } = require('../controllers/Admins/Rooms/roomsMapping');

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
router.get('/logout', logout);
router.post('/sendotp',sendotp);
router.post('/verifyotp',verifyotp);
router.post('/forgotPassword',forgotPassword);
router.post('/changePassword',auth,changePassword);

//// for students login

router.post('/studentlogin', studentLogin);

//// for csv uploads
router.post('/csv', auth, upload.single('file'), csvUpload, jsonUpload);
router.post('/roomCSV',auth, upload.single('file'), csvUpload, jsonRoomUpload);
router.post('/roomMap',auth, upload.single('file'), csvUpload, roomsMapping);

////for json students upload
router.post('/jsonUpload', auth, jsonUpload);

//// to download pdf file
router.post('/pdfDownload', auth, pdfDownload);

//// studentInfo page data

router.post('/viewStudentInfo',auth, studentInfo);
router.delete('/deleteStudent', auth, deleteStudent);

//// controllers  for  allot room

// data filtering routes
router.get('/allotRooms',auth, allotRooms)
router.post('/addStudent', auth, addStudent);
router.post('/removeStudent', auth, removeStudent);

module.exports = router;
