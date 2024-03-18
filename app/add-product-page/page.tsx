"use client";

import React, { useState } from "react";
import { FormControl, Stack, InputLabel, Box, Button, TextField, Typography, Select, MenuItem, } from '@mui/material';
import {
  ProductTypeList,
  ProductGenderList,
  ProductSizeShoeList,
  ProductSizesList,
  ProductSizePantsWaistList,
  ProductSizePantsInseamList,
} from "./product-prop-list";
const AddProduct = () => {
  const defaultType: string = ProductTypeList.Shoes;
  const [productType, setProductType] = useState(defaultType);
  const defaultGender: string = ProductGenderList.MALE
  const [productGender, setProductGender] = useState(defaultGender);
  const [productSizeShoe, setProductSizeShoe] = useState(ProductSizeShoeList[0]);
  const defaultSize: string = ProductSizesList.L;
  const [productSizes, setProductSizes] = useState(defaultSize);
  const [productSizePantsWaist, setProductSizePantsWaist] = useState(ProductSizePantsWaistList[0]);
  const [productSizePantsInseam, setProductSizePantsInseam] = useState(ProductSizePantsInseamList[0]);
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

  const handleProductSizeShoeSelect = (event: any) => {
    const newValue = parseInt(event.target.value.toString(), 10);
    setProductSizeShoe(newValue);
  };

  const handleProductSizeSelect = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductSizes(e.target.value);
  };

  const handleProductSizePantsWaistSelect = (event: any) => {
    const newValue = parseInt(event.target.value.toString(), 10);
    setProductSizePantsWaist(newValue);
  };

  const handleProductSizePantsInseamSelect = (event: any) => {
    const newValue = parseInt(event.target.value.toString(), 10);
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
    <Box width={800} display="flex" alignItems="center" flexDirection="column" gap={2} bgcolor='#293745' p={3}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Typography component='h1' variant='h3' sx={{color: 'white', marginBottom: "15px"}}>
              Add a Product
            </Typography>

          {/* Product Type Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="type-selectlabel">Product Type</InputLabel>
            <Select labelId="type-selectlabel" 
              id="type-select" 
              value={productType}
              aria-describedby="product-type-field"
              onChange={handleProductTypeSelect}
            >
              {Object.values(ProductTypeList).map((type) => (
                <MenuItem value={type} key={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Product Gender Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="gender-selectlabel">Product Gender</InputLabel>
            <Select labelId="gender-selectlabel" 
              id="gender-select" 
              value={productGender}
              aria-describedby="product-gender-field"
              onChange={handleProductGenderSelect}
            >
              {Object.values(ProductGenderList).map((gender) => (
                <MenuItem value={gender} key={gender}>{gender}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Product Size Shoe Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="shoesize-selectlabel">Shoe Size</InputLabel>
            <Select labelId="shoesize-selectlabel" 
              id="shoesize-select" 
              value={productSizeShoe}
              aria-describedby="product-shoesize-field"
              onChange={handleProductSizeShoeSelect}
            >
              {Object.values(ProductSizeShoeList).map((size) => (
                <MenuItem value={size} key={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Product Size Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="size-selectlabel">Product Size</InputLabel>
            <Select labelId="size-selectlabel" 
              id="size-select" 
              value={productSizes}
              aria-describedby="product-size-field"
              onChange={handleProductSizeSelect}
            >
              {Object.values(ProductSizesList).map((size) => (
                <MenuItem value={size} key={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Product Size Pants Waist Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="waistsize-selectlabel">Waist Size</InputLabel>
            <Select labelId="waistsize-selectlabel" 
              id="waistsize-select" 
              value={productSizePantsWaist}
              aria-describedby="product-waist-size-field"
              onChange={handleProductSizePantsWaistSelect}
            >
              {Object.values(ProductSizePantsWaistList).map((size) => (
                <MenuItem value={size} key={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Product Size Pants Inseam Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="inseamsize-selectlabel">Inseam Length</InputLabel>
            <Select labelId="inseamsize-selectlabel" 
              id="inseamsize-select" 
              value={productSizePantsInseam}
              aria-describedby="product-inseam-size-field"
              onChange={handleProductSizePantsInseamSelect}
            >
              {Object.values(ProductSizePantsInseamList).map((size) => (
                <MenuItem value={size} key={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Product Description Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <TextField label="Product Description"
              aria-describedby="product-description-field"
              id="product-description"
              onChange={handleDescriptionChange}
              multiline
              minRows={2}
              variant="filled"/>
          </FormControl>
          
          {/* Product Upload Image Field */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ m: 1 }}>
            <Button variant="contained" component="label" sx={{ width: 1 }}>
              Upload Image
              <input hidden multiple type="file" onChange={handleImageUpload} value={productImage}/>
            </Button>
          </Stack>

          {/* Submit Button */}
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit" sx={{ mt: 1 }}>
            Submit
          </Button>
        </FormControl>
      </form>
    </Box>    
  );
};

export default AddProduct;
