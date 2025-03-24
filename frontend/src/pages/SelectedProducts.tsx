import React, { useEffect, useState } from 'react';
import axios from '../axios';

const SelectedProducts: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSelected = async () => {
      try {
        const response = await axios.get('/products/selected/');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch selected products', error);
      }
    };
    fetchSelected();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Selected Products</h2>
      <ul className="list-group">
        {products.map((product: any) => (
          <li key={product.id} className="list-group-item">
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedProducts;
