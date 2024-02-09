"use client";

import styles from './page.module.css';
import React, { useState, useEffect, Dispatch, SetStateAction, createContext, Context } from "react";
import Link from 'next/link';
interface Product {
  _id: string;
  productType: string[];
  productGender: string[];
  productDescription: string;
  // more product fields can be added
}

async function fetchData(categoryId: string, setProducts: Dispatch<SetStateAction<Product[]>>) {
  const apiUrl = 'http://localhost:3000/api/products/findByType/';
  const queryParam = encodeURIComponent(categoryId);
  const fetchUrl = `${apiUrl}${queryParam}`;

  try {
    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      setProducts(data);
      console.log(data);
    }
  } catch (error) {
    console.error('Error getting product:', error);
  }
}

const ViewProduct = ({ categoryId }: { categoryId: string }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData(categoryId, setProducts); // Pass categoryId to fetchData
  }, [categoryId]); // Add categoryId as a dependency

  return (
    <div className={styles.displaySection}>
      <h1>Found {products.length} products in {categoryId}</h1>
      <div className={styles.productList}>
        {products.map((product, index) => (
          <div key={index} className={styles.product}>
            <p>product ID: {product._id}</p>
            <p>Product Type: {product.productType.join(', ')}</p>
            <p>Description: {product.productDescription}</p>
            <Link href={`/category-page/${categoryId}/products/${product._id}`} legacyBehavior>
              <a>View Details</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProductList({ params }: { params: { categoryId: string } }) {
  const decodedCategoryId = decodeURIComponent(params.categoryId);

  return (
    <div className={styles.container}>
      <ViewProduct categoryId={decodedCategoryId} />
    </div>
  );
}