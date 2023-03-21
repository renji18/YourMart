const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  shippingInfo:{
    address:{
      type:String,
      required:true,
    },
    city:{
      type:String,
      required:true,
    },
    state:{
      type:String,
      required:true,
    },
    country:{
      type:String,
      required:true,
    },
    pinCode:{
      type:String,
      required:true,
    },
    phoneNo :{
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
      stock:{
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