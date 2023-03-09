const express = require('express')
const router = express.Router()
const {searchBooks} = require('../controllers/searchController')

router.get('/:query', searchBooks)

module.exports = router