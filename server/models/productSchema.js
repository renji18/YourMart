const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Provide The Product Name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please Provide The Product Description']
  },
  price: {
    type: Number,
    required: [true, 'Please Provide The Product Price'],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true
      }
    },
  ],
  category: {
    type: String,
    required: [true, 'Please Provide The Product Category'],
  },
  stock: {
    type: Number,
    required: [true, 'Please Provide The Product Stock Count'],
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserSchema',
        required: true,
      },
      name: {
        type: String, 
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      }
    }
  ],
  overallRating: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  creator:{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'UserSchema',
      required: true,
    },
    name: {
      type: String, 
      required: true,
    },
  }
})

const ProductData = new mongoose.model('productdata', productSchema)

module.exports=ProductData