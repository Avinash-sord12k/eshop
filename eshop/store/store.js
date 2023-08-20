import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice/authSlice'
import signinReducer from './signinSlice/signinSlice'
import signupReducer from './signupSlice/signupSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    signin: signinReducer,
    signup: signupReducer,
  },
})

export default store;