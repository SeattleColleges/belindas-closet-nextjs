"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  FormControl,
  Stack,
  InputLabel,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { SelectChangeEvent } from "@mui/material";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import {
  ProductTypeList,
  ProductGenderList,
  ProductSizeShoeList,
  ProductSizesList,
  ProductSizePantsWaistList,
  ProductSizePantsInseamList,
} from "./product-prop-list";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

interface Product {
  productType: string;
  productGender: string;
  productSizeShoe: string;
  productSizes: string;
  productSizePantsWaist: string;
  productSizePantsInseam: string;
  productDescription: string;
  productImage: string;
  isHidden: boolean;
  isSold: boolean;
}

const AddProduct = () => {

  const [formData, setFormData] = useState<Product>({
    productType: "",
    productGender: "",
    productSizeShoe: "",
    productSizes: "",
    productSizePantsWaist: "",
    productSizePantsInseam: "",
    productDescription: "",
    productImage: "",
    isHidden: false,
    isSold: false,
  })

  const [productImageBlob, setProductImageBlob] = useState<null | File>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | StaticImport>(null);
  const [previewHeight, setPreviewHeight] = useState(0);
  const imgElement = React.useRef<any>(null);
  
  useEffect(() => {
    if (!productImageBlob) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(productImageBlob);
  }, [productImageBlob]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProductImageBlob(event.target.files[0]);
      setFormData((prevData) => ({
        ...prevData,
        productImage: event.target.value, // Only storing filename
      }));
    }
  };

  // Fetch request to add product to database
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const processedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
          key,
          value === "" ? null : value, // ✅ Convert empty string to null
      ])
    );

    console.log("Submitting form:", processedFormData);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${URL}/products/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}`: "",
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const errorText = await res.text(); 
        console.error("Server Response:", errorText);
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

  const loadImageSize = () => {
    setPreviewHeight(
      (imgElement.current.naturalHeight / imgElement.current.naturalWidth) * 150
    );
  };

  const notSizeApplicable = ["", "Pants", "Shoes"];

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  if ((userRole === "admin" || userRole === "creator")) {
    return (
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Typography
            component="h1"
            variant="h3"
            sx={{ mb: 3, mt: 3 }}
          >
            Add a Product
          </Typography>

          {/* Product Type Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="type-selectlabel">Product Type</InputLabel>
            <Select
              labelId="type-selectlabel"
              id="type-select"
              aria-describedby="product-type-field"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
            >
              {Object.values(ProductTypeList).map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Product Gender Field */}
          {formData.productType == "" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="gender-selectlabel">Product Gender</InputLabel>
              <Select
                labelId="gender-selectlabel"
                id="gender-select"
                aria-describedby="product-gender-field"
                name="productGender"
                value={formData.productGender}
                onChange={handleChange}
              >
                <MenuItem value={""}>{"-"}</MenuItem>
                {Object.values(ProductGenderList).map((gender) => (
                  <MenuItem value={gender} key={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Product Size Shoe Field */}
          {formData.productType != "Shoes" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="shoesize-selectlabel">Shoe Size</InputLabel>
              <Select
                labelId="shoesize-selectlabel"
                id="shoesize-select"
                aria-describedby="product-shoesize-field"
                name="productSizeShoe"
                value={formData.productSizeShoe}
                onChange={handleChange}
              >
                <MenuItem value={""}>{"-"}</MenuItem>
                {Object.values(ProductSizeShoeList).map((size) => (
                  <MenuItem value={size} key={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Product Size Field */}
          {notSizeApplicable.includes(formData.productType) ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="size-selectlabel">Product Size</InputLabel>
              <Select
                labelId="size-selectlabel"
                id="size-select"
                aria-describedby="product-size-field"
                name="productSizes"
                value={formData.productSizes}
                onChange={handleChange}
              >
                <MenuItem value={""}>{"-"}</MenuItem>
                {Object.values(ProductSizesList).map((size) => (
                  <MenuItem value={size} key={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Product Size Pants Waist Field */}
          {formData.productType != "Pants" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="waistsize-selectlabel">Waist Size</InputLabel>
              <Select
                labelId="waistsize-selectlabel"
                id="waistsize-select"
                aria-describedby="product-waist-size-field"
                name="productSizePantsWaist"
                value={formData.productSizePantsWaist}
                onChange={handleChange}
              >
                <MenuItem value={""}>{"-"}</MenuItem>
                {Object.values(ProductSizePantsWaistList).map((size) => (
                  <MenuItem value={size} key={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Product Size Pants Inseam Field */}
          {formData.productType != "Pants" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="inseamsize-selectlabel">Inseam Length</InputLabel>
              <Select
                labelId="inseamsize-selectlabel"
                id="inseamsize-select"
                aria-describedby="product-inseam-size-field"
                name="productSizePantsInseam"
                value={formData.productSizePantsInseam}
                onChange={handleChange}
              >
                <MenuItem value={""}>{"-"}</MenuItem>
                {Object.values(ProductSizePantsInseamList).map((size) => (
                  <MenuItem value={size} key={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Product Description Field */}
          {formData.productType == "" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 250 }}>
              <TextField
                label="Product Description"
                id="product-description"
                aria-describedby="product-description-field"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                multiline
                minRows={2}
                variant="filled"
              />
            </FormControl>
          )}

          {/* Product Upload Image Field */}
          {formData.productType == "" ? null : (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ m: 1 }}
            >
              {previewUrl && (
                <Image
                  src={previewUrl}
                  ref={imgElement}
                  alt="Product Preview"
                  onLoad={loadImageSize}
                  height={previewHeight}
                  width={150}
                />
              )}
              <Button variant="contained" component="label" sx={{ width: 1 }}>
                Upload Image
                <input
                  hidden
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                  value={formData.productImage}
                />
              </Button>
            </Stack>
          )}

          {/* Submit Button */}
          {formData.productType == "" ? null : (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ m: 1, mt: 2 }}
            >
              Submit
            </Button>
          )}
        </FormControl>
      </form>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};

export default AddProduct;
