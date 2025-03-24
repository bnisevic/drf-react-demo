import { FETCH_PRODUCTS_SUCCESS, SELECT_PRODUCT } from '../actions/productActions';

const initialState = {
  products: [],
  selectedProducts: JSON.parse(localStorage.getItem('selectedProducts') || '[]'),
};

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case SELECT_PRODUCT:
      const updatedSelectedProducts = [...state.selectedProducts, action.payload];
      localStorage.setItem('selectedProducts', JSON.stringify(updatedSelectedProducts));
      return { ...state, selectedProducts: updatedSelectedProducts };
    default:
      return state;
  }
};

export default productReducer;
