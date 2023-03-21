const jwt = require('jsonwebtoken')
const UserData = require('../models/userSchema')

const auth = async(req, res, next) => {
  try {
    const {yourmart} = req.cookies

    if(!yourmart)
      return next(new Error("Please Login to Access this resource"))

    const verifyUser = jwt.verify(yourmart, process.env.JWT_SECRET_KEY)

    req.user = await UserData.findOne({_id: verifyUser._id})
    req.token = yourmart
    next()
  } catch (error) {
    console.log('Error in authorization', error);
  }
}

module.exports = auth