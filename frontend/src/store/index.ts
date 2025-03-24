import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export default store;
