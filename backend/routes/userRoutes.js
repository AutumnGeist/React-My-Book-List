const express = require('express')
const router = express.Router()
const {registerUser, loginUser, updateUser, forgotPassword, resetPassword, deleteUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

//register new user
router.post('/', registerUser)
//user login
router.post('/login', loginUser)
//update user
router.put('/:id', protect, updateUser)
//forgot password
router.post('/forgotpw', forgotPassword)
//reset password
router.put('/resetpw/:id/:resetToken', resetPassword)
//delete user account
router.delete('/:id', protect, deleteUser)

module.exports = router