// Add an empty export statement to make this file a module
export {};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface ProductsState {
  products: Product[];
  selectedProducts: number[];
}

const initialState: ProductsState = {
  products: [],
  selectedProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    selectProduct(state, action: PayloadAction<number>) {
      state.selectedProducts.push(action.payload);
    },
  },
});

export const { setProducts, selectProduct } = productsSlice.actions;
export default productsSlice.reducer;
