const express = require('express');
const router = new express.Router();
const multer = require('multer');
const path = require('path');

const { jsonRoomUpload } = require("../controllers/Admins/Rooms/jsonRoomUpload");
const { studentInfo } = require("../controllers/Admins/studentInfo");
const { csvUpload } = require("../middlewares/csvUpload");
const { jsonUpload } = require('../controllers/Admins/jsonUpload');
const { studentLogin } = require("../controllers/Students/studentLogin");
const { adminLogin } = require("../controllers/Admins/adminLogin");
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

//// for students login

router.post('/studentlogin', studentLogin);

//// for csv students upload
router.post('/csv', auth, upload.single('file'), csvUpload, jsonUpload);
router.post('/roomCSV', upload.single('file'), csvUpload, jsonRoomUpload);
router.post('/roomMap', upload.single('file'), csvUpload, roomsMapping);

////for json students upload
router.post('/jsonUpload', auth, jsonUpload);
//// to download pdf file
router.post('/pdfDownload', auth, pdfDownload);
//// view student data
router.post('/viewStudentInfo', auth, studentInfo);

//// controllers  for  allot room

// data filtering routes
router.get('/allotRooms', allotRooms)
router.post('/addStudent', auth, addStudent);
router.post('/removeStudent', auth, removeStudent);
// upload room csv/Excel




module.exports = router;
