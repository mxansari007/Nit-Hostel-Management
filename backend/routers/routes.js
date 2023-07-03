const express = require('express')
const router = new express.Router()
const Student = require('../models/students')
const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const auth = require('../middlewares/auth')

// student register page
router.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
    const {
      rollNo,
      firstName,
      lastName,
      year,
      password,
      confirm,
      department,
      email,
    } = req.body
    const user = new Student({
      rollNo,
      firstName,
      lastName,
      year,
      password,
      department,
      email,
    })
    const token = await user.generateAuthToken()

    const createUser = await user.save()
    res.status(201).send(createUser)
  } catch (e) {
    res.status(400).send(e)
  }
})

//// for admin login
router.post('/adminlogin', async (req, res) => {
  try {
    const { username, password } = req.body
    const findAdmin = await Admin.findOne({ username: username })
    const isMatch = await bcrypt.compare(password, findAdmin.password)
    const token = await findAdmin.generateAuthToken()
    // console.log("upto token"+token);

    // we are storing cookie in jwtoken and it will expires in 30days
    res.cookie('jwtoken', token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    })

    // console.log(`This is our cookie = ${req.cookies.jwtoken}`)

    console.log(isMatch)
    if (isMatch) {
      res.status(200).send(findAdmin)
    } else {
      res.status(404).send('Invalid Username or Password')
    }
  } catch (error) {
    res.status(404).send('Invalid Username ' + error.message)
  }
})

//// for students login

router.post('/studentlogin', async (req, res) => {
  try {
    const { rollno, password } = req.body
    const findAdmin = await Admin.findOne({
      rollno: rollno,
      password: password,
    })
    if (findAdmin) {
      res.status(200).send(findAdmin)
    } else {
      res.status(404).send('Invalid Username or Password')
    }
  } catch (error) {
    res.status(404).send('Invalid Username ' + error.message)
  }
})

//// for csv students upload
router.post('/csv', async (req, res) => {
  const data = req.body

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
