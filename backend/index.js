import express from "express"
import "dotenv/config"
import mongoose from 'mongoose'
import booksRoutes from './routes/booksRoutes.js'
import cors from 'cors'

const app = express()
app.use(express.json())

const port = process.env.PORT || 4000
const mongodbURL = process.env.mongodbURL

// Middleware for handling CORS Policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors())
// Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: `http://localhost:${port}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   })
// )

app.use('/books', booksRoutes)

mongoose.connect(mongodbURL)
  .then(() => {
    console.log('Connection to db successfuly')
  })
  .catch((e) => console.log(e))

app.listen(port, () => {
  console.log(`Server running in port ${port}`)
})
