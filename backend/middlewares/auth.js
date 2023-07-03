const jwt = require('jsonwebtoken')
const routes = require('../routers/routes')

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken

    const verifyUser = jwt.verify(
      token,
      'swnf23$tzv8545?[]qpxrsehttmjnhbgyhc3t7c'
    )

    // console.log(verifyUser)
    next();
  } catch (error) {
    res.status(401).send(error)
  }
}

module.exports = auth