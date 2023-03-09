const express = require('express')
const router = express.Router()
const {getBooks, getBook, addBook, updateBook, deleteBook} = require('../controllers/bookController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getBooks)
router.get('/:id', protect, getBook)
router.post('/', protect, addBook)
router.put('/:id', protect, updateBook)
router.delete('/:id', protect, deleteBook)

module.exports = router