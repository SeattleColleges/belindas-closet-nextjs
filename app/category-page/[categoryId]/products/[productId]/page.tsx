'use client';

import React, { useState, useEffect } from 'react';

interface Product {
  _id: string;
  productType: string[];
  productGender: string[];
  productDescription: string;
  // Add other fields as needed
}

const ProductDetail = ({ params }: { params: { categoryId: string, productId: string } }) => {
  const [product, setProduct] = useState<Product | null>(null); // State to hold the fetched product details
  const [isLoading, setIsLoading] = useState(true); // State to track the loading status
  const [error] = useState(null); // State to hold any error that occurs during fetching

  const { categoryId, productId } = params;
  const decodedCategoryId = decodeURIComponent(categoryId);

  useEffect(() => {
    const fetchUrl = `http://localhost:3000/api/products/find/${productId}`;

    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error fetching product details: ${response.statusText}`);
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error getting product detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [decodedCategoryId, productId]); // Dependency array to trigger effect when categoryId or productId changes

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Product Page</h1>
      {/* Check if product is not null before accessing its properties */}
      {product ? (
        <div>
          <p>Product ID: {product._id}</p>
          <p>Product Type: {product.productType.join(', ')}</p>
          <p>Product Gender: {product.productGender.join(', ')}</p>
          <p>Description: {product.productDescription}</p>
        </div>
      ) : (
        <p>Product details not available.</p>
      )}
    </div>
  );
};

export default ProductDetail;