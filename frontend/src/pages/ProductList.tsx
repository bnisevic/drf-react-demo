import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('');
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post('/auth/logout/');
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/', {
          params: { search, ordering },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, [search, ordering, navigate]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Product List</h2>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>
      <input type="text" className="form-control mb-3" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select className="form-select mb-3" value={ordering} onChange={(e) => setOrdering(e.target.value)}>
        <option value="">Default</option>
        <option value="price">Price</option>
        <option value="-price">Price Desc</option>
      </select>
      <ul className="list-group">
        {products.map((product: any) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{product.name}</span>
            <button className="btn btn-sm btn-outline-primary" onClick={async () => {
              await axios.post(`/products/${product.id}/select/`);
            }}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
