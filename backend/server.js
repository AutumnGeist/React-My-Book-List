const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

//set port # equal to dotenv variable, or 5000 as default
const port = process.env.PORT || 5000

const app = express()

//add middleware for body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//add routes
app.use('/books', require('./routes/bookRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/search', require('./routes/searchRoutes'))

//serve frontend (for deployment)
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

//add error handler
app.use(errorHandler)

//connect MongoDB (from db.js file)
connectDB().then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`))
})
