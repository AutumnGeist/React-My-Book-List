//fetch book data from the Google Books API
const axios = require('axios');

const asyncHandler = require('express-async-handler')

//search books, @route: GET /search/, @access: Public
const searchBooks = asyncHandler(async (req, res) => {
    const query = req.params.query
    if(!query) {
        res.status(400)
        throw new Error('Please add a search value')
    }
    const response = await axios.get(process.env.BOOKS_API + query + '&maxResults=20')
    const foundBooks = await response.data.items

    if(foundBooks.totalItems === 0) {
        res.status(404).json('No Books Found')
    }else{
        res.status(200).json(foundBooks)
    }
    // res.json('Search Books')
})

module.exports = { searchBooks }