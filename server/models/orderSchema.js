const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  shippingInfo:{
    address:{
      floorApartment:String,
      societyStreet:String,
      city:String,
      state:String,
      zipcode:{
        type:Number,
        validate(value){
          if(!value.toString().length === 6)
            throw new Error("Invalid zipcode")
        }
      }
    },
    number :{
      type:Number,
      requried:true,
    },
  },
  orderItems:[
    {
      name:{
        type:String,
        required:true,
      },
      price:{
        type:String,
        required:true,
      },
      quantity:{
        type:Number,
        required:true,
      },
      image:{
        type:String,
        required:true,
      },
      product:{
        type:mongoose.Schema.ObjectId,
        ref:"ProductData",
        required:true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'UserData',
    required: true,
  },
  paymentInfo:{
    id:{
      type:String,
      required:true,
    },
    status:{
      type:String,
      required:true,
    },
  },
  paidAt:{
    type:Date,
    default:Date.now,
    required:true,
  },
  itemsPrice:{
    type:Number,
    required:true,
  },
  taxPrice:{
    type:Number,
    required:true,
  },
  shippingPrice:{
    type:Number,
    required:true,
  },
  totalPrice:{
    type:Number,
    required:true,
  },
  orderStatus:{
    type:String,
    required:true,
    default:"Processing",
  },
  deliveredAt:Date,
  createdAt:{
    type:Date,
    default:Date.now,
  },
})

const OrderData = new mongoose.model('orderdata', orderSchema)

module.exports=OrderData