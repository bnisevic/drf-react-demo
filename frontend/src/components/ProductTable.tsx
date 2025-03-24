import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProduct } from '../store/actions/productActions';
import { logout } from '../store/actions/authActions';
import { AppState } from '../store';
import { User } from '../types/User';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const ProductTable: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: AppState) => state.products.products) as Product[];
  const selectedProducts = useSelector((state: AppState) => state.products.selectedProducts);
  const user = useSelector((state: AppState) => state.auth.user) as User | null;
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');

  useEffect(() => {
    dispatch(fetchProducts(search, ordering));
  }, [search, ordering, dispatch]);

  const handleSelect = (productId: number) => {
    dispatch(selectProduct(productId));
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2>Products</h2>
        <div>
          {user && <span>{user.email}</span>}
          <button className="btn btn-secondary ms-3" onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={() => setOrdering('id')}>ID</th>
            <th onClick={() => setOrdering('name')}>Name</th>
            <th onClick={() => setOrdering('description')}>Description</th>
            <th onClick={() => setOrdering('price')}>Price</th>
            <th onClick={() => setOrdering('stock')}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id} onClick={() => handleSelect(product.id)}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
