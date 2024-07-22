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
// WARNING: You won't be able to connect to local backend unless you remove the env variable below.
const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";

const AddProduct = () => {
  const [productType, setProductType] = useState<string>("");
  const [productGender, setProductGender] = useState<string>("");
  const [productSizeShoe, setProductSizeShoe] = useState<number | string>("");
  const [productSizes, setProductSizes] = useState<string>("");
  const [productSizePantsWaist, setProductSizePantsWaist] = useState<
    number | string
  >("");
  const [productSizePantsInseam, setProductSizePantsInseam] = useState<
    number | string
  >("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [productImageBlob, setProductImageBlob] = useState<null | File>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | StaticImport>(
    null
  );
  const [previewHeight, setPreviewHeight] = useState(0);

  const imgElement = React.useRef<any>(null);

  useEffect(() => {
    if (!productImageBlob) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };

    reader.readAsDataURL(productImageBlob);
  }, [productImageBlob]);

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
    target: { value: React.SetStateAction<number | string> };
  }) => {
    setProductSizeShoe(e.target.value);
  };

  const handleProductSizeSelect = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductSizes(e.target.value);
  };

  const handleProductSizePantsWaistSelect = (e: {
    target: { value: React.SetStateAction<number | string> };
  }) => {
    setProductSizePantsWaist(e.target.value);
  };

  const handleProductSizePantsInseamSelect = (e: {
    target: { value: React.SetStateAction<number | string> };
  }) => {
    setProductSizePantsInseam(e.target.value);
  };

  const handleDescriptionChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setProductDescription(e.target.value);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setProductImageBlob(event.target.files![0]);
    setProductImage(event.target.value);
  };
  // Fetch request to add product to database
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${URL}/products/new`, {
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
            sx={{ marginBottom: "15px" }}
          >
            Add a Product
          </Typography>

          {/* Product Type Field */}
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="type-selectlabel">Product Type</InputLabel>
            <Select
              labelId="type-selectlabel"
              id="type-select"
              value={productType}
              aria-describedby="product-type-field"
              onChange={handleProductTypeSelect}
            >
              {Object.values(ProductTypeList).map((type) => (
                <MenuItem value={type} key={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Product Gender Field */}
          {productType == "" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="gender-selectlabel">Product Gender</InputLabel>
              <Select
                labelId="gender-selectlabel"
                id="gender-select"
                value={productGender}
                aria-describedby="product-gender-field"
                onChange={handleProductGenderSelect}
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
          {productType != "Shoes" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="shoesize-selectlabel">Shoe Size</InputLabel>
              <Select
                labelId="shoesize-selectlabel"
                id="shoesize-select"
                value={productSizeShoe}
                aria-describedby="product-shoesize-field"
                onChange={handleProductSizeShoeSelect}
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
          {notSizeApplicable.includes(productType) ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="size-selectlabel">Product Size</InputLabel>
              <Select
                labelId="size-selectlabel"
                id="size-select"
                value={productSizes}
                aria-describedby="product-size-field"
                onChange={handleProductSizeSelect}
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
          {productType != "Pants" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="waistsize-selectlabel">Waist Size</InputLabel>
              <Select
                labelId="waistsize-selectlabel"
                id="waistsize-select"
                value={productSizePantsWaist}
                aria-describedby="product-waist-size-field"
                onChange={handleProductSizePantsWaistSelect}
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
          {productType != "Pants" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="inseamsize-selectlabel">Inseam Length</InputLabel>
              <Select
                labelId="inseamsize-selectlabel"
                id="inseamsize-select"
                value={productSizePantsInseam}
                aria-describedby="product-inseam-size-field"
                onChange={handleProductSizePantsInseamSelect}
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
          {productType == "" ? null : (
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <TextField
                label="Product Description"
                aria-describedby="product-description-field"
                id="product-description"
                onChange={handleDescriptionChange}
                multiline
                minRows={2}
                variant="filled"
              />
            </FormControl>
          )}

          {/* Product Upload Image Field */}
          {productType == "" ? null : (
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
                  alt="logo"
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
                  value={productImage}
                />
              </Button>
            </Stack>
          )}

          {/* Submit Button */}
          {productType == "" ? null : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
              sx={{ mt: 1 }}
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
