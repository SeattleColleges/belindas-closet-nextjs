"use client";

import styles from './page.module.css';
import React, { useState, useEffect, Dispatch, SetStateAction, createContext, Context } from "react";
import Link from 'next/link';
import ProductCard from "@/components/ProductCard";
import google_play from "../../google_play.png";
;

const placeholderImg = google_play
interface Product {
  _id: string;
  productImage: typeof placeholderImg;
  productType: string[];
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
  }, [categoryId]); 

  return (
    <div className={styles.displaySection}>
      <h1>Found {products.length} products in {categoryId}</h1>
      <div className={styles.productContainer}>
        {products.map((product, index) => (
          <ProductCard 
          image={google_play} 
          categories={product.productType} 
          description={product.productDescription} 
          href={`/category-page/${categoryId}/products/${product._id}`} // Construct the URL 
          key={index} 
        />
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