const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

//set port # equal to dotenv variable, or 5000 as default
const port = process.env.PORT || 5000

//connect MongoDB (from db.js file)
connectDB()
const app = express()

//add middleware for body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//add routes
app.use('/books', require('./routes/bookRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/search', require('./routes/searchRoutes'))

//add error handler
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))