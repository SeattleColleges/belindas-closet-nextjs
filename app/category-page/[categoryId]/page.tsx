"use client";

import styles from './page.module.css';
import React, { useState } from "react";
import InputSelect from "@/components/InputSelect";
import {
  ProductTypeList,
  ProductGenderList,
  ProductSizeShoeList,
  ProductSizesList,
  ProductSizePantsWaistList,
  ProductSizePantsInseamList,
} from "../../add-product-page/product-prop-list";

export default function ProductList({
    params,
  }: {
    params: { categoryId: string };
  }) {
    // Decode the categoryId before using it
    const decodedCategoryId = decodeURIComponent(params.categoryId);
  
    const ViewProduct = () => {
      const [productType, setProductType] = useState("SELECT_SIZE");
      const [productGender, setProductGender] = useState("SELECT_SIZE");
      const [productSizeShoe, setProductSizeShoe] = useState("SELECT_SIZE");
      const [productSizes, setProductSizes] = useState("SELECT_SIZE");
      const [productSizePantsWaist, setProductSizePantsWaist] = useState("SELECT_SIZE");
      const [productSizePantsInseam, setProductSizePantsInseam] = useState("SELECT_SIZE");
      const [productDescription, setProductDescription] = useState("");
      const [productImage, setProductImage] = useState("");
    
      const handleProductTypeSelect = (e: {
        target: { value: React.SetStateAction<string> };
      }) => {
        setProductType(e.target.value);
      };
    
      const handleProductGenderSelect = (e: {
        target: { value: React.SetStateAction<string> };
      }) => {
        setProductGender(e.target.value);
      };
    
      const handleProductSizeShoeSelect = (e: {
        target: { value: React.SetStateAction<string> };
      }) => {
        setProductSizeShoe(e.target.value);
      };
    
      const handleProductSizeSelect = (e: {
        target: { value: React.SetStateAction<string> };
      }) => {
        setProductSizes(e.target.value);
      };
    
      const handleProductSizePantsWaistSelect = (e: {
        target: { value: React.SetStateAction<string> };
      }) => {
        setProductSizePantsWaist(e.target.value);
      };
    
      const handleProductSizePantsInseamSelect = (e: {
        target: { value: React.SetStateAction<string> };
      }) => {
        setProductSizePantsInseam(e.target.value);
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

      const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const res = await fetch("http://localhost:3000/api/products", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          // If response is not ok, throw error
          if (!res.ok) {
            throw new Error(res.statusText);
          } else {
            const data = await res.json();
            console.log(data);
          }
        } catch (error) {
          console.error("Error getting product:", error);
        }
      };
  

  return (
    <div className={styles.container}>
      <form className={styles.filterSection}  onSubmit={handleSubmit}>
        <h2>Filters</h2>

        <InputSelect
          label="Product Type"
          value={productType}
          options={[
            { label: "Select", value: "SELECT_SIZE" },
            ...Object.values(ProductTypeList).map((type) => ({
            label: type,
            value: type,
          }))]}
          onChange={handleProductTypeSelect}
          style={{ color: "black", width : "100px", height : "30px", fontSize : "14px", padding: "1px"}}
        />

        <InputSelect
          label="Gender"
          value={productGender}
          options={[
            { label: "Select", value: "SELECT_SIZE" },
            ...Object.values(ProductGenderList).map((gender) => ({
            label: gender,
            value: gender,
          }))]}
          onChange={handleProductGenderSelect}
          style={{ color: "black", width : "100px", height : "30px", fontSize : "14px", padding: "1px"}}
        />

        <InputSelect
          label="Product Size Shoe"
          value={productSizeShoe}
          options={[
            { label: "Select", value: "SELECT_SIZE" },
            ...Object.values(ProductSizeShoeList).map((size) => ({
            label: size,
            value: size,
            })),
          ]}
          onChange={handleProductSizeShoeSelect}
          style={{ color: "black", width : "100px", height : "30px", fontSize : "14px", padding: "1px"}}
        />

        <InputSelect
          label="Product Size"
          value={productSizes}
          options={[
            { label: "Select", value: "SELECT_SIZE" },
            ...Object.values(ProductSizesList).map((size) => ({
              label: size,
              value: size,
            })),
          ]}
          onChange={handleProductSizeSelect}
          style={{ color: "black", width : "100px", height : "30px", fontSize : "14px", padding: "1px"}}
        />

        <InputSelect
          label="Pants Waist"
          value={productSizePantsWaist}
          options={[
            { label: "Select", value: "SELECT_SIZE" },
            ...Object.values(ProductSizePantsWaistList).map((size) => ({
            label: size,
            value: size,
          }))]}
          onChange={handleProductSizePantsWaistSelect}
          style={{ color: "black", width : "100px", height : "30px", fontSize : "14px", padding: "1px"}}
        />

        <InputSelect
          label="Pants Inseam"
          value={productSizePantsInseam}
          options={[
            { label: "Select", value: "SELECT_SIZE" },
            ...Object.values(ProductSizePantsInseamList).map((size) => ({
            label: size,
            value: size,
          }))]}
          onChange={handleProductSizePantsInseamSelect}
          style={{ color: "black", width : "100px", height : "30px", fontSize : "14px", padding: "1px"}}
        />

        <button
          className={styles.submitButton}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
    
      </form>
      <div className={styles.displaySection}>
          <h1>All products for {decodedCategoryId}</h1>
          {/* Rest of your product list rendering logic goes here */}
        </div>
      </div>
    );
  };

  return <ViewProduct />;
}