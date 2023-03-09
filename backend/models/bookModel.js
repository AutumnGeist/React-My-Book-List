const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true,
    },
    publishedDate: {
        type: String
    },
    categories: {
        type: [String]
    },
    image: {
        type: String
    },
    score: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    pagesRead: {
        type: Number
    },
    pageCount: {
        type: Number
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    faveBook: {
        type: Boolean,
        default: false
    },
    faveAuthor: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Book', bookSchema)