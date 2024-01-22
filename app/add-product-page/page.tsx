"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import InputSelect from "@/components/InputSelect";
import Input from "@/components/Input";
import {
  ProductTypeList,
  ProductGenderList,
  ProductSizeShoeList,
  ProductSizesList,
  ProductSizePantsWaistList,
  ProductSizePantsInseamList,
} from "./product-prop-list";
const AddProduct = () => {
  const [productType, setProductType] = useState(ProductTypeList.Shoes);
  const [productGender, setProductGender] = useState(ProductGenderList.MALE);
  const [productSizeShoe, setProductSizeShoe] = useState(
    ProductSizeShoeList[0]
  );
  const [productSizes, setProductSizes] = useState("SELECT_SIZE");
  const [productSizePantsWaist, setProductSizePantsWaist] = useState(
    ProductSizePantsWaistList[0]
  );
  const [productSizePantsInseam, setProductSizePantsInseam] = useState(
    ProductSizePantsInseamList[0]
  );
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleProductTypeSelect = (e: {
    target: { value: React.SetStateAction<ProductTypeList> };
  }) => {
    setProductType(e.target.value);
  };

  const handleProductGenderSelect = (e: {
    target: { value: React.SetStateAction<ProductGenderList> };
  }) => {
    setProductGender(e.target.value);
  };

  const handleProductSizeShoeSelect = (e: {
    target: { value: React.SetStateAction<number> };
  }) => {
    const newValue = parseInt(e.target.value.toString(), 10);
    setProductSizeShoe(newValue);
  };

  const handleProductSizeSelect = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductSizes(e.target.value);
  };

  const handleProductSizePantsWaistSelect = (e: {
    target: { value: React.SetStateAction<number> };
  }) => {
    const newValue = parseInt(e.target.value.toString(), 10);
    setProductSizePantsWaist(newValue);
  };

  const handleProductSizePantsInseamSelect = (e: {
    target: { value: React.SetStateAction<number> };
  }) => {
    const newValue = parseInt(e.target.value.toString(), 10);
    setProductSizePantsInseam(newValue);
  };

  const handleDescriptionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductDescription(e.target.value);
  };

  const handleImageUpload = (e: {
    target: { value: React.SetStateAction<any> };
  }) => {
    setProductImage(e.target.value);
  };
  // Fetch request to add product to database
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/products/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify({
          productType,
          productGender,
          productSizeShoe,
          productSizes,
          productSizePantsWaist,
          productSizePantsInseam,
          productDescription,
          productImage,
        }),
      });
      // If response is not ok, throw error
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        const data = await res.json();
        console.log(data);
        alert("Product Added!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <h1>Add a Product</h1>
        </div>
        {/* Product Type Field */}
        <InputSelect
          label="Product Type"
          value={productType}
          options={Object.values(ProductTypeList).map((type) => ({
            label: type,
            value: type,
          }))}
          onChange={handleProductTypeSelect}
          style={{ color: "black" }}
        />

        {/* Product Gender Field */}
        <InputSelect
          label="Product Gender"
          value={productGender}
          options={Object.values(ProductGenderList).map((gender) => ({
            label: gender,
            value: gender,
          }))}
          onChange={handleProductGenderSelect}
          style={{ color: "black" }}
        />

        {/* Product Size Shoe Field */}
        <InputSelect
          label="Product Size Shoe"
          value={productSizeShoe}
          options={Object.values(ProductSizeShoeList).map((size) => ({
            label: size,
            value: size,
          }))}
          onChange={handleProductSizeShoeSelect}
          style={{ color: "black" }}
        />

        {/* Product Size Field */}
        <InputSelect
          label="Product Size"
          value={productSizes}
          options={[
            { label: "Select Size", value: "SELECT_SIZE" },
            ...Object.values(ProductSizesList).map((size) => ({
              label: size,
              value: size,
            })),
          ]}
          onChange={handleProductSizeSelect}
          style={{ color: "black" }}
        />

        {/* Product Size Pants Waist Field */}
        <InputSelect
          label="Product Size Pants Waist"
          value={productSizePantsWaist}
          options={Object.values(ProductSizePantsWaistList).map((size) => ({
            label: size,
            value: size,
          }))}
          onChange={handleProductSizePantsWaistSelect}
          style={{ color: "black" }}
        />

        {/* Product Size Pants Inseam Field */}
        <InputSelect
          label="Product Size Pants Inseam"
          value={productSizePantsInseam}
          options={Object.values(ProductSizePantsInseamList).map((size) => ({
            label: size,
            value: size,
          }))}
          onChange={handleProductSizePantsInseamSelect}
          style={{ color: "black" }}
        />

        {/* Product Description Field */}
        <Input
          label="Product Description"
          value={productDescription}
          type="text"
          onChange={handleDescriptionChange}
          style={{ color: "black" }}
        />

        {/* Product Upload Image Field */}
        <Input
          label="Product Image"
          value={productImage}
          type="file"
          onChange={handleImageUpload}
          style={{ color: "white" }}
        />

        {/* Submit Button */}
        <button
          className={styles.submitButton}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
