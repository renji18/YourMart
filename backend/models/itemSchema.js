const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  rating:{
    type:Number,
    required:true,
  },
  desc:{
    type:String,
    required:true,
  },
})

const itemSchema = new mongoose.Schema({
  category:{
    type:String,
    required:true,
  },

  image:String,

  price:{
    type:Number,
    required:true,
  },

  name:{
    type:String,
    required:true,
  },

  reviews:[ reviewSchema ]
})


const ItemData = new mongoose.model('ItemData', itemSchema)

module.exports=ItemData;