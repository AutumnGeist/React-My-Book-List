import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice'
import bookReducer from '../features/book/bookSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer
  },
});
