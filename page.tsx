'use client';

import { useEffect, useState } from 'react';
import '../../styles/archived-products.css';

interface Product {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
}

const ArchivedProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/archived-products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching archived products:', error));
  }, []);

  return (
    <div className="archived-products-page">
      <h1>Archived Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-tile">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.shortDescription}</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .archived-products-page {
          padding: 20px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .product-tile {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        .product-tile img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default ArchivedProductsPage;
