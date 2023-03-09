//Middleware to authorize JWT token
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token

    //check that the headers include "Bearer: <some token>"
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header by splitting the header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from the token but don't include the password
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    //if no token
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}

module.exports = {protect}