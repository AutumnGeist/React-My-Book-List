import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from './userService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    //set to user if exists, otherwise null
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register user 
export const register = createAsyncThunk('user/register', async (user, thunkAPI) => {
    try {
        return await userService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Login user 
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
    try {
        return await userService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Logout user
export const logout = createAsyncThunk('user/logout', () => {
    userService.logout()
})

//Update user
export const update = createAsyncThunk('user/update', async ({id, userData}, thunkAPI) => {
   try {
        const token = thunkAPI.getState().user.user.token
        return await userService.update(id, userData, token)
   } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
   }
})

//Forgot password
export const forgotPassword = createAsyncThunk('users/forgotpw', async (email, thunkAPI) => {
    try {
        return await userService.forgotPassword(email)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Reset password
export const resetPassword = createAsyncThunk('users/resetpw', async (userData, thunkAPI) => {
    try {
        return await userService.resetPassword(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete user account
export const deleteUser = createAsyncThunk('user/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().user.user.token
        return await userService.deleteUser(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || (error.message && error.response.data) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
        .addCase(update.pending, (state) => {
            state.isLoading = true
        })
        .addCase(update.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = 'Account updated'
            state.user.name = action.payload.name
            state.user.email = action.payload.email
        })
        .addCase(update.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(forgotPassword.pending, (state) => {
            state.isLoading = true
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.message;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.message;
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = userSlice.actions
export default userSlice.reducer