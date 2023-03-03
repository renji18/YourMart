const UserData = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sendmail = require('../middleware/sendMail')
const cloudinary = require('cloudinary')


// Registering User
const registerUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    })
    const user = new UserData(req.body)
    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
    const token = await user.generateToken()
    if (!token)
      return res.status(404).json({ msg: "Token Not Generated" })
    await user.save()
    res.cookie('yourmart', token, {
      httpOnly: true,
    })
    return res.status(201).json({ msg: "Success", user })
  } catch (error) {
    return res.status(500).json({ msg: "Failed", error })
  }
}

// Logging In User
const userLogin = async (req, res, next) => {
  try {
    const { email } = req.body
    const { password } = req.body
    if (!email || !password)
      return res.status(404).json({ msg: "Fields Empty" })
    const user = await UserData.findOne({ email })
    if (!user)
      return res.status(402).json({ msg: "User doesn't exist" })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(403).json({ msg: "Wrong Credentials" })
    if (user.tokens.length > 5)
      user.tokens = []
    const token = await user.generateToken()
    await user.save()
    res.cookie('yourmart', token, {
      httpOnly: true,
    })
    res.status(201).json({ msg: "Login successful", user })
  } catch (error) {
    res.status(500).json({ msg: "Login unsuccessful", error })
  }
}


// Getting Single User
const getUserProfile = async (req, res, next) => {
  try {
    res.status(201).json({ msg: 'success', user: req.user })
  } catch (error) {
    return res.status(402).json({ msg: "User doesn't exist", error })
  }
}

// Getting all users  -- Admin

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserData.find()
    res.status(201).json({ msg: "Success", users })
  } catch (error) {
    return res.status(402).json({ msg: "User doesn't exist", error })
  }
}


// Update User -- Profile
const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email
    }
    if (req.body.avatar !== '' && req.body.avatar !== 'undefined') {
      const user = await UserData.findOne({ email: req.user.email })
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId)
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale',
      })
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
    }
    await UserData.findOneAndUpdate({ email: req.user.email }, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
    res.status(201).json({ msg: "Success", success: true })
  } catch (error) {
    res.status(201).json({ msg: "Error", error })
  }
}

// Update User Password
const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword } = req.body
    const { newPassword } = req.body
    const { confirmPassword } = req.body
    if (newPassword !== confirmPassword)
      return res.status(404).json({ error: "Passwords don't match" })
    const isMatch = await bcrypt.compare(oldPassword, req.user.password)
    if (!isMatch)
      return res.status(404).json({ error: "Incorrect Password" })
    req.user.password = newPassword
    const token = await req.user.generateToken()
    await req.user.save()
    res.cookie('yourmart', token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      )
    })
    res.status(201).json({ msg: "Success", success: true })
  } catch (error) {
    res.status(404).json({ msg: "Error", error })
  }
}


// Log out User
const logoutUser = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObject) => {
      return tokenObject.token != req.token
    })
    res.clearCookie('yourmart')
    await req.user.save()
    return res.status(201).json({ msg: "success", user: req.user })
  } catch (error) {
    return res.status(500).json({ msg: "error", error })
  }
}

// Delete User  -- Admin
const deleteUser = async (req, res, next) => {
  try {
    const { deleteId } = req.body
    const found = await UserData.findOne({ email: deleteId })
    if (!found) {
      return res.status(404).json({ msg: "User not found" })
    }
    const deleted = await UserData.findOneAndDelete({ email: deleteId })
    return res.status(201).json({ msg: "deleted", deleted })
  } catch (error) {
    return res.status(404).json({ msg: "Error", error })
  }
}

// Forgot Password

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body
    const foundUser = await UserData.findOne({ email: email })
    if (!foundUser)
      return res.status(201).json({ msg: "User Not Found" })
    if (foundUser.resetPassword.resetPasswordToken) {
      foundUser.resetPassword.resetPasswordToken = undefined
      foundUser.resetPassword.resetPasswordTime = undefined
    }
    foundUser.resetPassword.resetPasswordToken = await foundUser.generateToken()
    foundUser.resetPassword.resetPasswordTime = Date.now()
    await foundUser.save()
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/user/reset/${foundUser.resetPassword.resetPasswordToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email, then please ignore it.`
    await sendmail({
      email: foundUser.email,
      subject: `YourMart Password Recovery`,
      message
    })
    res.status(200).json({ success: "Success", msg: `Email Sent To ${foundUser.email} successfully` })
  } catch (error) {
    res.status(500).json({ success: "Fail", error })
  }
}


// Reset Password

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params
    const { password } = req.body
    const { confirmPassword } = req.body
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const foundUser = await UserData.findOne({ _id: verifyUser._id })
    if (token !== foundUser.resetPassword.resetPasswordToken)
      return res.status(500).json({ msg: "Token Expired, request email again" })
    if ((Date.parse(foundUser.resetPassword.resetPasswordTime) + 300000) < Date.now())
      return res.status(500).json({ msg: "Illegal Token, already Expired" })
    if (password !== confirmPassword)
      return res.status(500).json({ msg: "Passwords don't match, please check again" })
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (isMatch)
      return res.status(500).json({ msg: "Cannot Use Previous Password As Old Password" })
    foundUser.password = password
    const newToken = await foundUser.generateToken()
    await foundUser.save()
    res.cookie('yourmart', newToken, {
      httpOnly: true,
      expires: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      )
    })
    return res.status(201).json({ msg: 'Success', success: true })
  } catch (error) {
    return res.status(500).json({ msg: 'Illegal Token', error })
  }
}

// Change User Role
const changeRole = async (req, res, next) => {
  try {
    const { email } = req.body
    const { role } = req.body
    const foundUser = await UserData.findOne({ email: email })
    if (!foundUser)
      return res.status(201).json({ msg: "User Not Found" })
    if (foundUser.role === role)
      return res.status(201).json({ msg: `The following user is already assigned the role ${role}` })
    foundUser.role = role
    const newToken = await foundUser.generateToken()
    await foundUser.save()
    res.cookie('yourmart', newToken, {
      httpOnly: true,
      expires: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      )
    })
    return res.status(201).json({ msg: 'Success', foundUser })
  } catch (error) {
    return res.status(500).json({ msg: 'error', error })
  }
}



module.exports = {
  registerUser,
  userLogin,
  getUserProfile,
  updateProfile,
  logoutUser,
  getAllUsers,
  updatePassword,
  deleteUser,
  forgotPassword,
  resetPassword,
  changeRole,
}