import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from './bookService'

const initialState = {
    books: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Note: the book routes are protected, need user token to access

// create new book
export const createBook = createAsyncThunk('books/create', async (bookData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await bookService.createBook(bookData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all user books
export const getBooks = createAsyncThunk('books/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await bookService.getBooks(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get specified user book
export const getBook = createAsyncThunk('books/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await bookService.getBook(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update specified user book
export const updateBook = createAsyncThunk('books/update', async ({id, bookData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await bookService.updateBook(id, bookData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete user book
export const deleteBook = createAsyncThunk('books/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await bookService.deleteBook(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(createBook.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createBook.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.books.push(action.payload)
        })
        .addCase(createBook.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getBooks.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getBooks.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.books = action.payload
        })
        .addCase(getBooks.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateBook.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateBook.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.books = state.books.map((book) => 
                book._id === action.payload.id ? {
                    ...book,
                    status: action.payload.status,
                    score: action.payload.score,
                    pagesRead: action.payload.pagesRead,
                    startDte: action.payload.startDate,
                    endDate: action.payload.endDate
                } : book
            )
        })
        .addCase(updateBook.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteBook.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.books = state.books.filter((book) => book._id !== action.payload.id)
        })
        .addCase(deleteBook.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = bookSlice.actions
export default bookSlice.reducer