const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const router  = express.Router()

const {
  registerUser,
  userLogin,
  getUserProfile,
  updateProfile,
  getAllUsers,
  logoutUser,
  updatePassword,
  deleteUser,
  forgotPassword,
  resetPassword,
  changeRole,

} = require('../controllers/userController')


// User Routes
router.route('/user/register').post(registerUser)
router.route('/user/login').post(userLogin)
router.route('/user/profile').get(auth, getUserProfile)
router.route('/user/profiles').get(auth, admin, getAllUsers)  // ADMIN ONLY
router.route('/user/profile/update').put(auth, updateProfile)
router.route('/user/password/update').post(auth, updatePassword)
router.route('/user/logout').get(auth, logoutUser)
router.route('/user/delete').delete(auth, admin, deleteUser) // ADMIN ONLY
router.route('/user/forgotPassword').post(forgotPassword)
router.route('/user/reset/:token').put(resetPassword)
router.route('/user/role').put(auth, admin, changeRole) // ADMIN ONLY

module.exports = router