import _ from 'underscore'

export const selectFaveAuthors = (state) => {
    let authors = []
    const {books} = state.book
    books.forEach((book) => {
        if(book.faveAuthor) {
            authors.push(book.authors.toString())
        }
    })
    //remove duplicates
    authors = _.uniq(authors)
    return authors
}

export const selectFaveBooks = (state) => {
    let faveBooks = []
    const {books} = state.book
    books.forEach((book) => {
        if(book.faveBook) {
           faveBooks.push(book)
        }
    })
    return faveBooks
}