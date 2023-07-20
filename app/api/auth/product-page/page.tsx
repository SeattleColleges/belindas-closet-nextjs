'use client';

import React, { useState } from 'react';
import styles from '../product-page/page.module.css';

const AddProduct = () => {
  const [productName, setProductName] = useState("");

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setProductName(e.target.value);
  }

  const handleSubmit = (e: any) => {
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1>Add a Product</h1>
      </div>
      <div className={styles.main}>
        <form onSubmit={handleSubmit}>
          <label>Add a Product:</label>
          <input type="text" name="productName" onChange={handleChange} value={productName} style={{color: 'black'}} />
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
