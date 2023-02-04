const express = require('express')
const app = express()
const connectDB = require('./db/connection')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routing = require('./routes/routing')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(cors({
  origin: 'http://localhost:3000',
}))

app.use('/', routing)

app.post('/user', async(req, res)=>{
  try {
    const user = new UserData(req.body)
    await user.save()
    res.status(200).json({msg: 'Success', user})
  } catch (error) {
    res.status(404).json({msg: 'Failed', error})
  }
})

const PORT = 5000
const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(()=>{
        console.log('Database Connected');
        app.listen(PORT, ()=>{
          console.log(`Server is listening on port ${PORT}...`);
        })
      })
  } catch (error) {
    
  }
}
start()