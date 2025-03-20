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

  // Fetch request to add product to database
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const processedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
          key,
          value === "" ? null : value, 
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

  const loadImageSize = () => {
    setPreviewHeight(
      (imgElement.current.naturalHeight / imgElement.current.naturalWidth) * 150
    );
  };

  if ((userRole === "admin" || userRole === "creator")) {
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

                            {formData.productType && (
                                <FormControl variant="filled">
                                  <InputLabel>Gender</InputLabel>
                                  <Select
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

                            {formData.productType === "Shoes" && (
                                <FormControl variant="filled">
                                  <InputLabel>Shoe Size</InputLabel>
                                  <Select
                                      value={formData.productSizeShoe}
                                      onChange={handleChange}
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

                            {!notSizeApplicable.includes(formData.productType) && (
                                <FormControl variant="filled">
                                  <InputLabel>Size</InputLabel>
                                  <Select
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

                            {formData.productType === "Pants" && (
                                <>
                                  <FormControl variant="filled">
                                    <InputLabel>Waist Size</InputLabel>
                                    <Select
                                        value={formData.productSizePantsWaist}
                                        onChange={handleChange}
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
                                        value={formData.productSizePantsInseam}
                                        onChange={handleChange}
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
                                value={formData.productDescription}
                                onChange={handleChange}
                            />

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
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



      // <form onSubmit={handleSubmit}>
      //   <FormControl>
      //     <Typography
      //       component="h1"
      //       variant="h3"
      //       sx={{ mb: 3, mt: 3 }}
      //     >
      //       Add a Product
      //     </Typography>

      //     {/* Product Type Field */}
      //     <FormControl variant="filled" sx={{ m: 1, minWidth: 250 }}>
      //       <InputLabel id="type-selectlabel">Product Type</InputLabel>
      //       <Select
      //         labelId="type-selectlabel"
      //         id="type-select"
      //         aria-describedby="product-type-field"
      //         name="productType"
      //         value={formData.productType}
      //         onChange={handleChange}
      //       >
      //         {Object.values(ProductTypeList).map((type) => (
      //           <MenuItem value={type} key={type}>
      //             {type}
      //           </MenuItem>
      //         ))}
      //       </Select>
      //     </FormControl>

      //     {/* Product Gender Field */}
      //     {formData.productType == "" ? null : (
      //       <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      //         <InputLabel id="gender-selectlabel">Product Gender</InputLabel>
      //         <Select
      //           labelId="gender-selectlabel"
      //           id="gender-select"
      //           aria-describedby="product-gender-field"
      //           name="productGender"
      //           value={formData.productGender}
      //           onChange={handleChange}
      //         >
      //           <MenuItem value={""}>{"-"}</MenuItem>
      //           {Object.values(ProductGenderList).map((gender) => (
      //             <MenuItem value={gender} key={gender}>
      //               {gender}
      //             </MenuItem>
      //           ))}
      //         </Select>
      //       </FormControl>
      //     )}

      //     {/* Product Size Shoe Field */}
      //     {formData.productType != "Shoes" ? null : (
      //       <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      //         <InputLabel id="shoesize-selectlabel">Shoe Size</InputLabel>
      //         <Select
      //           labelId="shoesize-selectlabel"
      //           id="shoesize-select"
      //           aria-describedby="product-shoesize-field"
      //           name="productSizeShoe"
      //           value={formData.productSizeShoe}
      //           onChange={handleChange}
      //         >
      //           <MenuItem value={""}>{"-"}</MenuItem>
      //           {Object.values(ProductSizeShoeList).map((size) => (
      //             <MenuItem value={size} key={size}>
      //               {size}
      //             </MenuItem>
      //           ))}
      //         </Select>
      //       </FormControl>
      //     )}

      //     {/* Product Size Field */}
      //     {notSizeApplicable.includes(formData.productType) ? null : (
      //       <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      //         <InputLabel id="size-selectlabel">Product Size</InputLabel>
      //         <Select
      //           labelId="size-selectlabel"
      //           id="size-select"
      //           aria-describedby="product-size-field"
      //           name="productSizes"
      //           value={formData.productSizes}
      //           onChange={handleChange}
      //         >
      //           <MenuItem value={""}>{"-"}</MenuItem>
      //           {Object.values(ProductSizesList).map((size) => (
      //             <MenuItem value={size} key={size}>
      //               {size}
      //             </MenuItem>
      //           ))}
      //         </Select>
      //       </FormControl>
      //     )}

      //     {/* Product Size Pants Waist Field */}
      //     {formData.productType != "Pants" ? null : (
      //       <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      //         <InputLabel id="waistsize-selectlabel">Waist Size</InputLabel>
      //         <Select
      //           labelId="waistsize-selectlabel"
      //           id="waistsize-select"
      //           aria-describedby="product-waist-size-field"
      //           name="productSizePantsWaist"
      //           value={formData.productSizePantsWaist}
      //           onChange={handleChange}
      //         >
      //           <MenuItem value={""}>{"-"}</MenuItem>
      //           {Object.values(ProductSizePantsWaistList).map((size) => (
      //             <MenuItem value={size} key={size}>
      //               {size}
      //             </MenuItem>
      //           ))}
      //         </Select>
      //       </FormControl>
      //     )}

      //     {/* Product Size Pants Inseam Field */}
      //     {formData.productType != "Pants" ? null : (
      //       <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      //         <InputLabel id="inseamsize-selectlabel">Inseam Length</InputLabel>
      //         <Select
      //           labelId="inseamsize-selectlabel"
      //           id="inseamsize-select"
      //           aria-describedby="product-inseam-size-field"
      //           name="productSizePantsInseam"
      //           value={formData.productSizePantsInseam}
      //           onChange={handleChange}
      //         >
      //           <MenuItem value={""}>{"-"}</MenuItem>
      //           {Object.values(ProductSizePantsInseamList).map((size) => (
      //             <MenuItem value={size} key={size}>
      //               {size}
      //             </MenuItem>
      //           ))}
      //         </Select>
      //       </FormControl>
      //     )}

      //     {/* Product Description Field */}
      //     {formData.productType == "" ? null : (
      //       <FormControl variant="filled" sx={{ m: 1, minWidth: 250 }}>
      //         <TextField
      //           label="Product Description"
      //           id="product-description"
      //           aria-describedby="product-description-field"
      //           name="productDescription"
      //           value={formData.productDescription}
      //           onChange={handleChange}
      //           multiline
      //           minRows={2}
      //           variant="filled"
      //         />
      //       </FormControl>
      //     )}

      //     {/* Product Upload Image Field */}
      //     {formData.productType == "" ? null : (
      //       <Stack
      //         direction="row"
      //         alignItems="center"
      //         justifyContent="center"
      //         spacing={2}
      //         sx={{ m: 1 }}
      //       >
      //         {previewUrl && (
      //           <Image
      //             src={previewUrl}
      //             ref={imgElement}
      //             alt="Product Preview"
      //             onLoad={loadImageSize}
      //             height={previewHeight}
      //             width={150}
      //           />
      //         )}
      //         <Button variant="contained" component="label" sx={{ width: 1 }}>
      //           Upload Image
      //           <input
      //             hidden
      //             multiple
      //             type="file"
      //             onChange={handleImageUpload}
      //             value={formData.productImage}
      //           />
      //         </Button>
      //       </Stack>
      //     )}

      //     {/* Submit Button */}
      //     {formData.productType == "" ? null : (
      //       <Button
      //         variant="contained"
      //         color="primary"
      //         type="submit"
      //         sx={{ m: 1, mt: 2 }}
      //       >
      //         Submit
      //       </Button>
      //     )}
      //   </FormControl>
      // </form>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
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
