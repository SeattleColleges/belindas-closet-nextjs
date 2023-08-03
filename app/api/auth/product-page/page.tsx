'use client';

import React, { useState } from 'react';
import styles from '../product-page/page.module.css';

const AddProduct = () => {
  const [productValue, setProductValue] = useState("");
  const [sizeValue, setSizeValue] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleDescriptionChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setProductDescription(e.target.value);
  }
  
  const handleProductSelect = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setProductValue(e.target.value);
  };

  const handleSizeSelect = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSizeValue(e.target.value);
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
}

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1>Add a Product</h1>
      </div>
      <div className={styles.main}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Type:</label>
              <select value={productValue} onChange={handleProductSelect} style={{color: 'black'}}>
                <option value="">Choose</option>
                <option value="Option 1">Shoes</option>
                <option value="Option 2">Long sleeve shirt</option>
                <option value="Option 3">Short sleeve shirt</option>
                <option value="Option 4">Pant</option>
                <option value="Option 5">Skirt</option>
                <option value="Option 6">Tie</option>
                <option value="Option 7">Belt</option>
                <option value="Option 8">Jacket/blazer</option>
                <option value="Option 9">Handbag</option>
                <option value="Option 10">Dress</option>
                <option value="Option 11">Hat</option>
                <option value="Option 12">Scarf</option>
                <option value="Option 13">Gown (graduation)</option>
                <option value="Option 14">Hoodie</option>
                <option value="Option 15">Sweatshirt</option>
            </select>
          </div>
          <div>
          <label>Size:</label>
            <select value={sizeValue} onChange={handleSizeSelect} style={{color: 'black'}}>
              <option value="">Choose</option>
              <option value="Option 1">XXS</option>
              <option value="Option 2">XS</option>
              <option value="Option 3">S</option>
              <option value="Option 4">M</option>
              <option value="Option 5">L</option>
              <option value="Option 6">XL</option>
              <option value="Option 7">XXL</option>
              <option value="Option 8">XXXL</option>
              <option value="Option 9">XXXXL</option>
            </select>
          </div>
          <div>
            <label>Optional Description:</label>
            <input type="text" name="productName" onChange={handleDescriptionChange} value={productDescription} style={{color: 'black'}} />
          </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
