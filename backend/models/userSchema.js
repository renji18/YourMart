const mongoose = require('mongoose')
const validator = require('validator') 

const addressSchema = new mongoose.Schema({
  
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error('Invalid Email Format')
    },
  },
  number: {
    type: Number,
    unique: true,
    validate(value) {
      if (!value.toString().length === 10)
        throw new Error('Invalid Phone Number Format')
    },
  },
  address: {
    type:Object,
    required:true,
    flatApartment: {
      type: String,
      required: true,
    },
    societyStreet: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
      validate(value) {
        if (!value.toString().length === 6)
          throw new Error('Invalid Phone Number Format')
      },
    }
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})

const UserData = new mongoose.model('UserData', userSchema)

module.exports = UserData;