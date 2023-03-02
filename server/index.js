const express = require('express')
const app = express()
const connectDB = require('./db/connection')
require('dotenv').config()
const router = require('./routes/routing')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(fileUpload())

app.use('/', router)


const port = process.env.PORT

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI)  
      .then(() => {
        console.log('Connected to database');
        app.listen(port, () =>{
          console.log(`Server is listening on port ${port}...`);
        })
      })
  } catch (error) {
    console.log('Database not connected');
  }
}

start()