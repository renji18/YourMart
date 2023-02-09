const ProductData = require('../models/productSchema')
const ApiFeature = require('../middleware/productFeatures')


// Creating Product  --Admin
const createProduct = async (req, res, next) => {
  try {
    const newProduct = new ProductData(req.body)
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

// create product review, get product reviews, delete review

const createReview = async (req, res, next) => {
  try {
    const { _id } = req.params
    const { rating, review } = req.body
    const user = req.user

    const foundProduct = await ProductData.findOne({ _id })

    if (!foundProduct)
      return res.status(404).json({ msg: "requested Product doesn't exist" })
    
    
  } catch (error) {

  }
}


module.exports = {
  createProduct,
  updateProduct,
  getOneProduct,
  getAllProducts,
  deleteProduct,
  createReview,

}