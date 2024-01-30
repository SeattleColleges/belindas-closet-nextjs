"use client";

import styles from './page.module.css';
import React, { useState, useEffect } from "react";

interface Product {
  productType: string[];
  productGender: string[];
  productDescription: string;
  /* more product fields can be added */
}

export default function ProductList({
    params,
  }: {
    params: { categoryId: string };
  }) {
    // Decode the categoryId before using it
    const decodedCategoryId = decodeURIComponent(params.categoryId);
    const [products, setProducts] = useState<Product[]>([]);
  
    const ViewProduct = () => {
      const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/products", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
          console.error("Error getting product:", error);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);
  
      return (
        <div className={styles.container}>
          <div className={styles.displaySection}>
            <h1>All products for {decodedCategoryId}</h1>
            <div>
              {products.map((product, index) => (
                <div key={index}>
                  <p>Product Type: {product.productType.join(', ')}</p> {/* Joining array elements */}
                  <p>Product Gender: {product.productGender.join(', ')}</p>
                  <p>Description: {product.productDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      
  };

  return <ViewProduct />;
}