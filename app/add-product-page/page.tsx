"use client";

import React, { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import ProductCard from "@/components/ProductCard";
import logo from "@/public/belinda-images/logo.png";
import { Box, Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Button, TextField, Stack } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import {
  ProductGenderList,
  ProductSizePantsInseamList,
  ProductSizePantsWaistList,
  ProductSizeShoeList,
  ProductSizesList, ProductTypeList
} from "@/app/add-product-page/product-prop-list";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
const placeholderImg = logo;
interface Product {
  _id: string;
  productImage: typeof placeholderImg;
  productType: string[];
  productGender: string;
  productSizeShoe: string;
  productSizes: string;
  productSizePantsWaist: string;
  productSizePantsInseam: string;
  productDescription: string;
  isHidden: Boolean;
  isSold: Boolean;
}

async function fetchData(
  categoryId: string,
  setProducts: Dispatch<SetStateAction<Product[]>>
) {
  const apiUrl = `${URL}/products`;
  const fetchUrl = `${apiUrl}`;

  try {
    const res = await fetch(fetchUrl, {
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
      setProducts(data);
      console.log(data);
    }
  } catch (error) {
    console.error("Error getting product:", error);
  }
}

const ViewProduct = ({ categoryId }: { categoryId: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [userRole, setUserRole] = useState<string>("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'active' | 'archived'>('active');

  // Add product form states
  const [productType, setProductType] = useState<string>("");
  const [productGender, setProductGender] = useState<string>("");
  const [productSizeShoe, setProductSizeShoe] = useState<number | string>("");
  const [productSizes, setProductSizes] = useState<string>("");
  const [productSizePantsWaist, setProductSizePantsWaist] = useState<number | string>("");
  const [productSizePantsInseam, setProductSizePantsInseam] = useState<number | string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [productImageBlob, setProductImageBlob] = useState<null | File>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | StaticImport>(null);

  useEffect(() => {
    fetchData(categoryId, setProducts);
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        const data = await res.json();
        console.log(data);
        alert("Product Added!");
        // Reset form
        setProductType("");
        setProductGender("");
        setProductSizeShoe("");
        setProductSizes("");
        setProductSizePantsWaist("");
        setProductSizePantsInseam("");
        setProductDescription("");
        setProductImage("");
        setProductImageBlob(null);
        setPreviewUrl(null);
        setShowAddForm(false);
        // Refresh products list
        fetchData(categoryId, setProducts);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const notSizeApplicable = ["", "Pants", "Shoes"];

  if ((userRole === "admin")) {
    return (
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

                              <FormControl variant="filled">
                                <InputLabel>Product Type</InputLabel>
                                <Select
                                    value={productType}
                                    onChange={(e) => setProductType(e.target.value)}
                                >
                                  {Object.values(ProductTypeList).map((type) => (
                                      <MenuItem value={type} key={type}>
                                        {type}
                                      </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>

                              {productType && (
                                  <FormControl variant="filled">
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={productGender}
                                        onChange={(e) => setProductGender(e.target.value)}
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

                              {productType === "Shoes" && (
                                  <FormControl variant="filled">
                                    <InputLabel>Shoe Size</InputLabel>
                                    <Select
                                        value={productSizeShoe}
                                        onChange={(e) => setProductSizeShoe(e.target.value)}
                                    >
                                      <MenuItem value="">{"-"}</MenuItem>
                                      {ProductSizeShoeList.map((size) => (
                                          <MenuItem value={size} key={size}>
                                            {size}
                                          </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                              )}

                              {!notSizeApplicable.includes(productType) && (
                                  <FormControl variant="filled">
                                    <InputLabel>Size</InputLabel>
                                    <Select
                                        value={productSizes}
                                        onChange={(e) => setProductSizes(e.target.value)}
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

                              {productType === "Pants" && (
                                  <>
                                    <FormControl variant="filled">
                                      <InputLabel>Waist Size</InputLabel>
                                      <Select
                                          value={productSizePantsWaist}
                                          onChange={(e) => setProductSizePantsWaist(e.target.value)}
                                      >
                                        <MenuItem value="">{"-"}</MenuItem>
                                        {ProductSizePantsWaistList.map((size) => (
                                            <MenuItem value={size} key={size}>
                                              {size}
                                            </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>

                                    <FormControl variant="filled">
                                      <InputLabel>Inseam Size</InputLabel>
                                      <Select
                                          value={productSizePantsInseam}
                                          onChange={(e) => setProductSizePantsInseam(e.target.value)}
                                      >
                                        <MenuItem value="">{"-"}</MenuItem>
                                        {ProductSizePantsInseamList.map((size) => (
                                            <MenuItem value={size} key={size}>
                                              {size}
                                            </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </>
                              )}

                              <TextField
                                  variant="filled"
                                  label="Description"
                                  multiline
                                  rows={4}
                                  value={productDescription}
                                  onChange={(e) => setProductDescription(e.target.value)}
                              />

                              <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files) {
                                      setProductImageBlob(e.target.files[0]);
                                      setProductImage(e.target.value);
                                    }
                                  }}
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

                              <Button
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  sx={{mt: 2}}
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
    );
  } else {
    return <UnauthorizedPageMessage />
  }
};

export default function ProductList({
  params,
}: {
  params: { categoryId: string };
}) {
  const decodedCategoryId = decodeURIComponent(params.categoryId);
  return <ViewProduct categoryId={decodedCategoryId} />;
}
