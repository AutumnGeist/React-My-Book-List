//for making HTTP requests, sending data back, and setting data in local storage
import axios from 'axios'

const API_URL = '/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout User
const logout = () => {
    localStorage.removeItem('user')
}

// Update User
const update = async (id, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + id, userData, config)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Forgot password, sends password reset link to user email
const forgotPassword = async (email) => {
    const response = await axios.post(API_URL + 'forgotpw', email)
    return response.data
}

// Reset forgotten password
const resetPassword = async (userData) => {
    const response = await axios.put( `${API_URL}/resetpw/${userData.id}/${userData.resetToken}`,
    { password: userData.password })
    return response.data
}

// Delete user account
const deleteUser = async (userID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + userID, config)
    return response.data
}


const userService = {
    register,
    logout,
    login,
    update,
    forgotPassword,
    resetPassword,
    deleteUser
}

export default userService