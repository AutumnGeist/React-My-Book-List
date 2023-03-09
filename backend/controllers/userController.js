//logic for user routes
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')

//URL for password reset link
const URL = (process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.PROD_URL)

//register new user, @route POST /users, @access Public
const registerUser = asyncHandler(async (req, res) => {   
    const {name, email, password} = req.body
    //validate all fields were submitted
    if(!name || !email || !password) {
        res.status(400).send('Please add all fields')
        throw new Error('Please add all fields')
    }
    //check is user exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400).send("User already exists")
        throw new Error('User already exists')
    }
    //hash the password
    const hashedPassword = await hashPassword(password)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    //check if user was successfully created
    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400).send('Invalid user data')
        throw new Error('Invalid user data')
    }
})

//login & authenticate user, @route POST /users/login, @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    //Check for user email
    const user = await User.findOne({email})
    //Check the password
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400).send('Invalid credentials')
        throw new Error('Invalid credentials')
    }
})

//update user, @route PUT, @access Private (user must be logged in)
const updateUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const token = req.headers.authorization.split(' ')[1]
    const user = await User.findById(req.params.id)
    //check if user was found
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the user matches the logged in user
    if(user._id != req.params.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    //check if changing the password
    if(password !== null) {
        //hash the new password
        const hashedPassword = await hashPassword(password)
        user.password = hashedPassword
    }
    //update and save the user
    user.name = name
    user.email = email
    await user.save()
    console.log("User updated")
    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token
    })
})

//get reset password link, @route POST, @access Public
const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body
    //check is user exists
    const user = await User.findOne({email})
    if(!user) {
        res.status(400).send('Account not found')
        throw new Error('Account not found')
    }
    //create reset token
    const secret = process.env.JWT_SECRET + user.password
    const resetToken = jwt.sign({email: user.email, id: user._id}, secret, {expiresIn: '30m'})
    //create reset link and message
    const link = `${URL}/resetpw/${user._id}/${resetToken}` 
    const message = `
    <h1>My Book List</h1>
    <p>Hello ${user.name},</p>
    <p>We received a request to reset the password for your account.</p>
    <p>To reset your password, please click on the link below:</p>
    <a href=${link}>Reset Password</a>
    <p>This link will expire in 30 minutes.</p>`
    //send link to user email
    sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: message
    })
    res.status(200).json("Email was sent")
})

//reset password with token, @route PUT, @access Private
const resetPassword = asyncHandler(async (req, res) => {
    const {id, resetToken} = req.params
    const {password} = req.body
    //check the password
    if (!password) {
        res.status(400).send("Please provide a password")
        throw new Error("Please provide a password")
    }
    //check is user exists
    const user = await User.findById(id)
    if(!user) {
        res.status(400).send('No user found')
        throw new Error('No user found')
    }
    //verify the token
    let valid = false
    const secret = process.env.JWT_SECRET + user.password
    const verify = jwt.verify(resetToken, secret, (err) => {
        if (err) {
            res.status(403).send('Unauthorized')
            throw new Error(err)
        }else {
            valid = true
        }
    })    
    if(valid) {
        //hash password and save to DB
        const hashedPassword = await hashPassword(password)
        user.password = hashedPassword
        await user.save()
        console.log("User password was reset")
        res.status(201).send("Password was reset")
    }else {
        console.log("Not verified")
        res.status(403).send("Not verified")
    }
})

//delete user, @route DELETE /users/:id, @access: Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    //check for user
    if(!user) {
        res.status(400)
        throw new Error('User not found')
    }
    //remove from DB
    await user.remove()
    console.log("User account deleted")
    res.status(200).json({id: req.params.id})
})

//Hash Password
const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(pw, salt)
    return hashedPassword
}

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    forgotPassword,
    resetPassword,
    deleteUser
}