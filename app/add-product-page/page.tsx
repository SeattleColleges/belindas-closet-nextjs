"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import InputSelect from "@/components/InputSelect";
import Input from "@/components/Input";

const AddProduct = () => {

  enum ProductType {
    Shoes = "Shoes",
    Shirts = "Shirts",
    Pants = "Pants",
    Skirt = "Skirt",
    JacketBlazer = "Jacket/Blazer",
    Dress = "Dress",
    CasualWear = "Casual Wear",
    Suits = "Suits",
    Accessories = "Accessories"
  }

  const [productType, setProductType] = useState(ProductType.Shoes);
  const [productGender, setProductGender] = useState("MALE");
  const [productSizeShoe, setProductSizeShoe] = useState(5);
  const [productSizes, setProductSizes] = useState("SELECT_SIZE");
  const [productSizePantsWaist, setProductSizePantsWaist] = useState(28);
  const [productSizePantsInseam, setProductSizePantsInseam] = useState(28);
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleProductTypeSelect = (e: {
    target: { value: React.SetStateAction<ProductType> };
  }) => {
    setProductType(e.target.value);
  }

  const handleProductGenderSelect = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductGender(e.target.value);
  };

  const handleProductSizeShoeSelect = (e: {
    target: { value: React.SetStateAction<any> };
  }) => {
    setProductSizeShoe(e.target.value);
  };

  const handleProductSizeSelect = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductSizes(e.target.value);
  };

  const handleProductSizePantsWaistSelect = (e: {
    target: { value: React.SetStateAction<any> };
  }) => {
    setProductSizePantsWaist(e.target.value);
  };

  const handleProductSizePantsInseamSelect = (e: {
    target: { value: React.SetStateAction<any> };
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
  // Fetch request to add product to database
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/products/new", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_KEY// JWT Token Here,
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
          options={[
            { label: "Shoes", value: ProductType.Shoes },
            { label: "Shirts", value: ProductType.Shirts },
            { label: "Pants", value: "Pants" },
            { label: "Skirt", value: "Skirt" },
            { label: "Jacket/Blazer", value: "Jacket/Blazer" },
            { label: "Dress", value: "Dress" },
            { label: "Casual Wear", value: "Casual Wear" },
            { label: "Suits", value: "Suits" },
            { label: "Accessories", value: "Accessories" },
          ]}
          onChange={handleProductTypeSelect}
          style={{ color: "black" }}
        />

        {/* Product Gender Field */}
        <InputSelect
        label="Product Gender"
        value={productGender}
        options={[
          {label: "Male", value: "MALE"},
          {label: "Female", value: "FEMALE"},
          {label: "Non-Binary", value: "NON_BINARY"}
        ]}
        onChange={handleProductGenderSelect}
        style={{color: "black"}}
        />

        {/* Product Size Shoe Field */}
        <InputSelect
        label="Product Size Shoe"
        value={productSizeShoe}
        options={[
          {label: "5", value: 5},
          {label: "6", value: 6},
          {label: "7", value: 7},
          {label: "8", value: 8},
          {label: "9", value: 9},
          {label: "10", value: 10},
          {label: "11", value: 11},
          {label: "12", value: 12},
        ]}
        onChange={handleProductSizeShoeSelect}
        style={{color: "black"}}
        />

        {/* Product Size Field */}
        <InputSelect
        label="Product Size"
        value={productSizes}
        options={[
          {label: "SELECT_SIZE", value: "SELECT_SIZE"},
          {label: "XS", value: "XS"},
          {label: "S", value: "S"},
          {label: "M", value: "M"},
          {label: "L", value: "L"},
          {label: "XL", value: "XL"},
          {label: "XXL", value: "XXL"},
        ]}
        onChange={handleProductSizeSelect}
        style={{color: "black"}}
        />

        {/* Product Size Pants Waist Field */}
        <InputSelect
        label="Product Size Pants Waist"
        value={productSizePantsWaist}
        options={[
          {label: "28", value: 28},
          {label: "30", value: 30},
          {label: "32", value: 32},
          {label: "34", value: 34},
          {label: "36", value: 36},
          {label: "38", value: 38},
          {label: "40", value: 40},
          {label: "42", value: 42},
        ]}
        onChange={handleProductSizePantsWaistSelect}
        style={{color: "black"}}
        />

        {/* Product Size Pants Inseam Field */}
        <InputSelect
        label="Product Size Pants Inseam"
        value={productSizePantsInseam}
        options={[
          {label: "28", value: 28},
          {label: "30", value: 30},
          {label: "32", value: 32},
          {label: "34", value: 34},
          {label: "36", value: 36},
          {label: "38", value: 38},
          {label: "40", value: 40},
          {label: "42", value: 42},
        ]}
        onChange={handleProductSizePantsInseamSelect}
        style={{color: "black"}}
        />

        {/* Product Description Field */}
        <Input
        label="Product Description"
        value={productDescription}
        type="text"
        onChange={handleDescriptionChange}
        style={{color: "black"}}
        />

        {/* Product Upload Image Field */}
        <Input
        label="Product Image"
        value={productImage}
        type="file"
        onChange={handleImageUpload}
        style={{color: "white"}}
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
