//logic for book routes
const asyncHandler = require('express-async-handler')
const Book = require('../models/bookModel')
const User = require('../models/userModel')

//get books, @route: GET /books/, @access: Private
const getBooks = asyncHandler(async (req, res) => {
    //get user specific books
    const books = await Book.find({user: req.user}).sort({title: Book.title})
    res.status(200).json(books)
})

//get book, @route: GET /books/:id, @access: Private
const getBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    }
    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the book's user
    if(book.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    res.status(200).json(book)
})

//add book, @route POST /books/, @access: Private
const addBook = asyncHandler(async (req, res) => {
    const book = await Book.create({
        user: req.user.id,
        title: req.body.bookData.title,
        authors: req.body.bookData.authors,
        publishedDate: req.body.bookData.publishedDate,
        categories: req.body.bookData.categories,
        image: req.body.bookData.image,
        score: req.body.bookData.score,
        status: req.body.bookData.status,
        pagesRead: req.body.bookData.pagesRead,
        pageCount: req.body.bookData.pageCount,
        startDate: req.body.bookData.startDate,
        endDate: req.body.bookData.endDate,
        faveBook: req.body.bookData.faveBook,
        faveAuthor: req.body.bookData.faveAuthor
    })
    //update favorite authors
    if(req.body.bookData.faveAuthor) {
        await addFaveAuthors(req.user.id, req.body.bookData.authors)
    }
    console.log("Book added successfully:", book)
    res.status(200).json(book)
})

//update book, @route PUT /books/:id, @access: Private
const updateBook = asyncHandler(async (req, res) => {
    //check for book
    const book = await Book.findById(req.params.id)
    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    }
    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the book's user
    if(book.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    //update and save
    book.status = req.body.status
    book.score = req.body.score
    book.pagesRead = req.body.pagesRead
    book.startDate = req.body.startDate
    book.endDate = req.body.endDate
    book.faveBook = req.body.faveBook
    book.faveAuthor = req.body.faveAuthor
    await book.save()
    console.log("Book updated")
    //update favorite authors
    if(req.body.faveAuthor) {
        await addFaveAuthors(req.user, book.authors)
    }else {
        await removeFaveAuthors(req.user, book.authors)
    }
    res.status(200).json(book)
})

//delete book, @route DELETE /books/:id, @access: Private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
    if(!book) {
        res.status(400)
        throw new Error('Book not found')
    }
    //check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the book's user
    if(book.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    //remove from DB
    await book.remove()
    console.log("Book deleted")
    res.status(200).json({id: req.params.id})
})

//check other user books for same author and set faveAuthor to true
const addFaveAuthors = async (user, author) => {
    const userBooks = await Book.find({user: user})
    userBooks.forEach(async (book) => {
        if(book.authors.includes(author)) {
            //check if there is more than one author
            if(book.authors.length === 1) {
                book.faveAuthor = true
                await book.save()
            }
        }
    })
}

//check other user books and set faveAuthor to false
const removeFaveAuthors = async (user, author) => {
    const userBooks = await Book.find({user: user})
    userBooks.forEach(async (book) => {
        if(book.authors.includes(author)) {
            book.faveAuthor = false
            await book.save()
        }
    })
}


module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}


