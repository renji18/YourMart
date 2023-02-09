const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const router  = express.Router()



const homeRoute = async(req, res, next) => {
  try {
    const {yourmart} = req.cookies
    if(yourmart)
      return res.status(201).json({msg: "User Logged In"})
    return res.status(201).json({msg:"User Not Logged In"})
  } catch (error) {
    return res.status(500).json({msg:error})
  }
}

// Root Route
router.route('/').get(homeRoute)



// User Controllers
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




// Product Controllers

const {
  createProduct,
  updateProduct,
  getOneProduct,
  getAllProducts,
  deleteProduct,
  createReview,
  getProductReviews,
  deleteReview,

} = require('../controllers/productController')

// Product Routes
router.route('/product/create').post(auth, admin, createProduct) // ADMIN ONLY
router.route('/product/update/:_id').put(auth, admin, updateProduct) // ADMIN ONLY
router.route('/product/:_id').get(auth, getOneProduct)
router.route('/products').get(auth, getAllProducts)
router.route('/product/delete/:_id').delete(auth, admin, deleteProduct) // ADMIN ONLY
router.route('/product/writeReview/:_id').post(auth, createReview) 
router.route('/product/getReviews/:_id').get(auth, getProductReviews) 
router.route('/product/deleteReviews/:_id').delete(auth, admin, deleteReview) // ADMIN ONLY



module.exports = router