import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer
  }
})