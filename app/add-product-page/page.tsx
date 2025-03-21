"use client";

import React, { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import ProductCard from "@/components/ProductCard";
import logo from "@/public/belinda-images/logo.png";
import { Box, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Stack } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { SelectChangeEvent } from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import {
  ProductTypeList,
  ProductGenderList,
  ProductSizeShoeList,
  ProductSizesList,
  ProductSizePantsWaistList,
  ProductSizePantsInseamList,
} from "./product-prop-list";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

const placeholderImg = logo;
interface Product {
  _id:string;
  productType: string;
  productGender: string;
  productSizeShoe: string;
  productSizes: string;
  productSizePantsWaist: string;
  productSizePantsInseam: string;
  productDescription: string;
  productImage: typeof placeholderImg | string;
  isHidden: boolean;
  isSold: boolean;
}

async function fetchData(
  categoryId: string,
  setProducts: Dispatch<SetStateAction<Product[]>>
) {
  const apiUrl = `${URL}/products`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      const filteredData = data.filter((product: Product) => !product.isHidden);
      setProducts(filteredData);
      console.log(filteredData);
    }

  } catch (error) {
    console.error("Error getting product:", error);
  }
}

const AddProduct = ({ categoryId }: { categoryId: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');

  const [formData, setFormData] = useState<Product>({
    _id: "",
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
  const notSizeApplicable = ["", "Pants", "Shoes"];

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  useEffect(() => {
    fetchData(categoryId, setProducts);
  }, [categoryId]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        if (viewMode === 'active') {
          return !product.isHidden && !product.isSold;
        } else {
          return !product.isHidden && product.isSold;
        }
      })
    );
  }, [products, viewMode]);

  useEffect(() => {
    if (!productImageBlob) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(productImageBlob);
  }, [productImageBlob]);

  // Fetch request to add product to database
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const processedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
          key,
          value === "" ? undefined : value, 
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
        body: JSON.stringify(processedFormData),
      });
      
      if (!res.ok) {
        const errorText = await res.text(); 
        console.error("Server Response:", errorText);
        throw new Error(res.statusText);
      } else {
        const data = await res.json();
        console.log(data);
        alert("Product Added!");

        fetchData(categoryId, setProducts); //Fetch updated data
      }

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loadImageSize = () => {
    setPreviewHeight(
      (imgElement.current.naturalHeight / imgElement.current.naturalWidth) * 150
    );
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProductImageBlob(event.target.files[0]);
      setFormData((prevData) => ({
        ...prevData,
        productImage: event.target.value, // Only storing filename
        // productImage: URL.createObjectURL(file), // Stores preview URL
      }));
    }
  };

  return (userRole === "admin" || userRole === "creator") ? (
    <Box sx={{
      display: "flex",
      minHeight: "100vh",
      margin: "-1rem",
      flexDirection: {xs: 'column', sm: 'row'},
    }}>
      <Sidebar/>
      <Box sx={{
        flexGrow: 1,
        mt: {xs: '3rem', sm: 0},
      }}>
        <Container sx={{py: 4}} maxWidth="lg">
          <Stack spacing={3}>
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                mb={3}
            >
              Found {filteredProducts.length} products in All Products
            </Typography>

            <Box sx={{mb: 4}}>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowAddForm(!showAddForm)}
                  sx={{mb: 5, marginLeft: 2}}
              >
                {showAddForm ? "Hide Add Product Form" : "Add New Product"}
              </Button>

              {showAddForm && (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2} sx={{bgcolor: "white", p: 3, borderRadius: 1, marginBottom: 5}}>
                    <Typography variant="h5">Add a Product</Typography>

                    {/* Product Type Field */}
                    <FormControl variant="filled">
                      <InputLabel>Product Type</InputLabel>
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
                    {formData.productType && (
                        <FormControl variant="filled">
                          <InputLabel>Gender</InputLabel>
                          <Select
                            labelId="gender-selectlabel"
                            id="gender-select"
                            aria-describedby="product-gender-field"
                            name="productGender"
                            value={formData.productGender}
                            onChange={handleChange}
                          >
                            <MenuItem value="">{"-"}</MenuItem>
                            {Object.values(ProductGenderList).map((gender) => (
                              <MenuItem value={gender} key={gender}>
                                {gender}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                    )}

                    {/* Product Size Shoe Field */}
                    {formData.productType === "Shoes" && (
                        <FormControl variant="filled">
                          <InputLabel>Shoe Size</InputLabel>
                          <Select
                            labelId="shoesize-selectlabel"
                            id="shoesize-select"
                            aria-describedby="product-shoesize-field"
                            name="productSizeShoe"
                            value={formData.productSizeShoe}
                            onChange={handleChange}
                          >
                            <MenuItem value="">{"-"}</MenuItem>
                            {Object.values(ProductSizeShoeList)
                              .filter((size => typeof size === "number"))
                              .map((size) => (
                                <MenuItem value={size} key={size}>
                                  {size}
                                </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                    )}

                    {/* Product Size Field */}
                    {!notSizeApplicable.includes(formData.productType) && (
                        <FormControl variant="filled">
                          <InputLabel>Size</InputLabel>
                          <Select
                            labelId="size-selectlabel"
                            id="size-select"
                            aria-describedby="product-size-field"
                            name="productSizes"
                            value={formData.productSizes}
                            onChange={handleChange}
                          >
                            <MenuItem value="">{"-"}</MenuItem>
                            {Object.values(ProductSizesList).map((size) => (
                                <MenuItem value={size} key={size}>
                                  {size}
                                </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                    )}

                    {/* Product Size Pants Waist & Inseam Field */}
                    {formData.productType === "Pants" && (
                        <>
                          <FormControl variant="filled">
                            <InputLabel>Waist Size</InputLabel>
                            <Select
                              labelId="waistsize-selectlabel"
                              id="waistsize-select"
                              aria-describedby="product-waist-size-field"
                              name="productSizePantsWaist"
                              value={formData.productSizePantsWaist}
                              onChange={handleChange}
                            >
                              <MenuItem value="">{"-"}</MenuItem>
                              {Object.values(ProductSizePantsWaistList)
                                .filter((size => typeof size === "number"))
                                .map((size) => (
                                  <MenuItem value={size} key={size}>
                                    {size}
                                  </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <FormControl variant="filled">
                            <InputLabel>Inseam Size</InputLabel>
                            <Select
                              labelId="inseamsize-selectlabel"
                              id="inseamsize-select"
                              aria-describedby="product-inseam-size-field"
                              name="productSizePantsInseam"
                              value={formData.productSizePantsInseam}
                              onChange={handleChange}
                            >
                              <MenuItem value="">{"-"}</MenuItem>
                            {Object.values(ProductSizePantsInseamList)
                              .filter((size => typeof size === "number"))
                              .map((size) => (
                                  <MenuItem value={size} key={size}>
                                    {size}
                                  </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </>
                    )}

                    {/* Product Description Field */}
                    <TextField
                        label="Description"
                        id="product-description"
                        aria-describedby="product-description-field"
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        multiline
                        minRows={4}
                        variant="filled"
                    />

                    {/* Product Upload Image Field */}
                    <input
                        multiple
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        // value={formData.productImage}
                        // Will need to change this later on to handle a file and then upload to a bucket and reference the image url from the bucket upload
                    />

                    {previewUrl && (
                        <Box sx={{mt: 2}}>
                          <Image
                              src={previewUrl}
                              alt="Preview"
                              width={150}
                              height={150}
                              style={{objectFit: "contain"}}
                          />
                        </Box>
                    )}

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{m:1, mt: 2}}
                    >
                      Add Product
                    </Button>
                  </Stack>
                </form>
              )}

              <Box sx={{mb: 2, marginLeft: 2}}>
                <Button
                    variant={viewMode === 'active' ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => setViewMode('active')}
                    sx={{marginRight: 2}}
                >
                  View Active Products
                </Button>
                <Button
                    variant={viewMode === 'archived' ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => setViewMode('archived')}
                >
                  View Archived Products
                </Button>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {filteredProducts.map((product, index) => (
                <Grid item key={index} xs={12} sm={4} md={3} sx={{ marginRight: { xs: 4} }}>
                  <ProductCard
                    image={logo}
                    categories={product.productType}
                    gender={product.productGender}
                    sizeShoe=''
                    size=''
                    sizePantsWaist=''
                    sizePantsInseam=''
                    description={product.productDescription}
                    href={`/category-page/${categoryId}/products/${product._id}`}
                    _id={product._id}
                    isHidden={false}
                    isSold={false}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Box>
  ) : <UnauthorizedPageMessage />;
};

// export default AddProduct;
export default function ProductList({
  params,
}: {
  params: { categoryId: string };
}) {
  // const decodedCategoryId = decodeURIComponent(params.categoryId);
  // return <AddProduct categoryId={decodedCategoryId} />;
  return <AddProduct categoryId={params.categoryId} />;
}
