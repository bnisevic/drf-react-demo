export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const SELECT_PRODUCT = 'SELECT_PRODUCT';

export const fetchProducts = (search: string, ordering: string) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { search, ordering }, // Replace with actual product fetching logic
  };
};

export const selectProduct = (product: any) => {
  return {
    type: SELECT_PRODUCT,
    payload: product,
  };
};
