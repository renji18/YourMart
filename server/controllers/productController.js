const ProductData = require('../models/productSchema')
const ApiFeature = require('../middleware/productFeatures')


// Creating Product  --Admin
const createProduct = async (req, res, next) => {
  try {
    const { name } = req.body

    const foundProduct = await ProductData.findOne({ name })
    if (foundProduct)
      return res.status(404).json({ msg: "A product already exists with the following name" })

    const newProduct = new ProductData(req.body)
    newProduct.creator.user = req.user._id;
    newProduct.creator.name = req.user.name;
    await newProduct.save()
    return res.status(201).json({ msg: 'Success', newProduct })
  } catch (error) {
    return res.status(500).json({ msg: 'Error', error })
  }
}

// Updating Product Detail  --Admin
const updateProduct = async (req, res, next) => {
  try {
    const { _id } = req.params
    const foundProduct = await ProductData.findOne({ _id })
    if (!foundProduct)
      return res.status(404).json({ msg: "requested Product doesn't exist" })
    const updatedProduct = await ProductData.findByIdAndUpdate({ _id }, req.body, { new: true })
    await updatedProduct.save()
    return res.status(201).json({ msg: "Success", updatedProduct })
  } catch (error) {
    return res.status(201).json({ msg: "Error", error })
  }
}

// Getting single Product 
const getOneProduct = async (req, res, next) => {
  try {
    const { _id } = req.params
    const foundProduct = await ProductData.findOne({ _id })
    if (!foundProduct)
      return res.status(404).json({ msg: "requested Product doesn't exist" })
    return res.status(201).json({ msg: "Success", foundProduct })
  } catch (error) {
    return res.status(201).json({ msg: "Error", error })
  }
}

// Getting All Products
const getAllProducts = async (req, res, next) => {
  try {
    const productsPerPage = 6
    const apiFeatures = new ApiFeature(ProductData.find(), req.query)
      .search()
      .filter()
      .pagination(productsPerPage)
    const allProducts = await apiFeatures.query
    return res.status(201).json({ msg: "Success", allProducts })
  } catch (error) {
    return res.status(201).json({ msg: "Error", error })
  }
}

// Delete Product  --Admin
const deleteProduct = async (req, res, next) => {
  try {
    const { _id } = req.params
    const foundProduct = await ProductData.findOne({ _id })
    if (!foundProduct)
      return res.status(404).json({ msg: "requested Product doesn't exist" })

    const deletedProduct = await ProductData.findByIdAndDelete({ _id })
    return res.status(201).json({ msg: "Deleted", deletedProduct })
  } catch (error) {
    return res.status(500).json({ msg: "Error", error })
  }
}


// Creating Product Review

const createReview = async (req, res, next) => {
  try {
    const { _id } = req.params
    const { rating, review } = req.body
    const user = req.user
    const foundProduct = await ProductData.findOne({ _id })
    if (!foundProduct)
      return res.status(404).json({ msg: "requested Product doesn't exist" })
    foundProduct.reviews = foundProduct.reviews.filter(review => {
      return review.user.toString() !== user._id.toString()
    })
    const newReview = {
      user: user._id,
      name: user.name,
      rating: rating,
      comment: review
    }
    foundProduct.reviews.push(newReview)
    foundProduct.numOfReviews = foundProduct.reviews.length
    let sum = 0
    foundProduct.reviews.forEach(review => {
      sum += review.rating
    })
    foundProduct.overallRating = sum / foundProduct.numOfReviews
    await foundProduct.save()
    return res.status(201).json({ msg: "Success", foundProduct })
  } catch (error) {
    return res.status(201).json({ msg: "Error", error })
  }
}


// Get All Reviews
const getProductReviews = async (req, res, next) => {
  try {
    const { _id } = req.params
    const foundProduct = await ProductData.findOne({ _id })
    if (!foundProduct)
      return res.status(404).json({ msg: "requested Product doesn't exist" })
    return res.status(201).json({ msg: "Success", reviews: foundProduct.reviews })
  } catch (error) {
    return res.status(201).json({ msg: "Error", error })
  }
}

// Delete review  --Admin

const deleteReview = async (req, res, next) => {
  try {
    const { _id } = req.params
    const { reviewId } = req.body
    const foundProduct = await ProductData.findOne({ _id })
    if (!foundProduct)
      return res.status(404).json({ msg: "requested Product doesn't exist" })
    foundProduct.reviews = foundProduct.reviews.filter(review => {
      return review._id.toString() !== reviewId.toString()
    })
    foundProduct.numOfReviews = foundProduct.reviews.length
    if (foundProduct.numOfReviews === 0) {
      foundProduct.overallRating = 0
    } else {
      let sum = 0
      foundProduct.reviews.forEach(review => {
        sum += review.rating
      })
      foundProduct.overallRating = sum / foundProduct.numOfReviews
    }
    await foundProduct.save()
    return res.status(201).json({ msg: "Success", foundProduct })
  } catch (error) {
    return res.status(201).json({ msg: "Error", error })
  }
}

module.exports = {
  createProduct,
  updateProduct,
  getOneProduct,
  getAllProducts,
  deleteProduct,
  createReview,
  getProductReviews,
  deleteReview,
}