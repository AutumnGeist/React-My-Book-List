import axios from 'axios'

const API_URL = '/books/'

// Create new book using user token
const createBook = async (bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, bookData, config)
    return response.data
}

// Get all user books
const getBooks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

// Get specified user book
const getBook = async (bookID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + bookID, config)
    return response.data
}

// Update book
const updateBook = async (bookID, bookData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + bookID, bookData, config)
    return response.data
}

// Delete user book
const deleteBook = async (bookID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + bookID, config)
    return response.data
}

const bookService = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}

export default bookService