import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState(() => localStorage.getItem('search') || '');
  const [ordering, setOrdering] = useState(() => localStorage.getItem('ordering') || '');
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));
  const navigate = useNavigate();

  const logout = async () => {
    await axios.post('/auth/logout/');
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchUser = async () => {
      try {
        const userRes = await axios.get('/user/');
        setEmail(userRes.data.email);
        localStorage.setItem('email', userRes.data.email);
      } catch (error) {
        console.error('Failed to fetch user info');
      }
    };

    const fetchSelected = async () => {
      try {
        const selectedRes = await axios.get('/products/selected/');
        setSelected(selectedRes.data.map((p: any) => p.id));
      } catch (error) {
        console.error('Failed to fetch selected products');
      }
    };

    fetchUser();
    fetchSelected();
  }, [navigate]);

  useEffect(() => {
    if (!search) {
      setProducts([]);
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
  }, [search, ordering]);

  const handleSelect = async (id: number) => {
    await axios.post(`/products/${id}/select/`);
    setSelected((prev) => [...new Set([...prev, id])]);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    localStorage.setItem('search', value);
  };

  const handleOrderingChange = (value: string) => {
    setOrdering(value);
    localStorage.setItem('ordering', value);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Product List</h2>
        <div>
          <span className="me-3">{email}</span>
          <button className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
        </div>
      </div>
      <input type="text" className="form-control mb-3" placeholder="Search" value={search} onChange={(e) => handleSearchChange(e.target.value)} />
      <select className="form-select mb-3" value={ordering} onChange={(e) => handleOrderingChange(e.target.value)}>
        <option value="">Default</option>
        <option value="price">Price Asc</option>
        <option value="-price">Price Desc</option>
        <option value="name">Name Asc</option>
        <option value="-name">Name Desc</option>
        <option value="description">Description Asc</option>
        <option value="-description">Description Desc</option>
        <option value="stock">Stock Asc</option>
        <option value="-stock">Stock Desc</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id} className={selected.includes(product.id) ? 'table-success' : ''}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary" onClick={() => handleSelect(product.id)}>
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
