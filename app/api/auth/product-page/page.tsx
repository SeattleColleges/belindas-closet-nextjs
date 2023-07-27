'use client';

import React, { useState } from 'react';
import styles from '../product-page/page.module.css';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setProductName(e.target.value);
  }

  const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setProductDescription(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const jsonText = JSON.stringify({
      productName: productName,
      productDescription: productDescription,
    })

    console.log(jsonText)
}

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1>Add a Product</h1>
      </div>
      <div className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Add a Product:</label>
            <input type="text" name="productName" onChange={handleNameChange} value={productName} style={{color: 'black'}} />
          </div>
          <div>
            <label>Add a Description:</label>
            <input type="text" name="productName" onChange={handleDescriptionChange} value={productDescription} style={{color: 'black'}} />
          </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
