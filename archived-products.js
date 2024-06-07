//pages/archived-products.js

import { useEffect, useState } from 'react';
import '../styles/archived-products.css';

const ArchivedProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/archived-products')
    
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching archived products:', error));
  }, []);

  return (
    <div className="archived-products-page">
      <h1>Archived Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-tile">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.shortDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivedProductsPage;
