"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import ProductCard from "@/components/ProductCard";
import logo from "@/public/belinda-images/logo.png";
import { Container, Grid, Typography } from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
const placeholderImg = logo;
interface Product {
  _id: string;
  productImage: typeof placeholderImg;
  productType: string;
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
      const filteredData = data.filter((product: Product) => product.isSold);
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

  useEffect(() => {
    fetchData(categoryId, setProducts); // Pass categoryId to fetchData
  }, [categoryId]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => !product.isHidden && product.isSold)
    );
  }, [products]);

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  if (userRole === "admin" || userRole === "creator") {
    return (
      <Container sx={{ py: 4 }} maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          justifyContent={"center"}
          align={"center"}
          mb={3}
        >
          Found {filteredProducts.length} products in Archived Products
        </Typography>
        <Grid container spacing={2}>
          {filteredProducts.map((product, index) => (
            <Grid item key={index} xs={12} sm={4} md={3}>
              <ProductCard
                image={logo}
                categories={product.productType}
                gender={product.productGender}
                sizeShoe=''
                size=''
                sizePantsWaist=''
                sizePantsInseam=''
                description={product.productDescription}
                href={`/category-page/${categoryId}/products/${product._id}`} // Construct the URL
                _id={product._id}
                isHidden={false}
                isSold={false}
                showArchiveButton={false} // Pass the prop to hide the archive button
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  } else {
    return <UnauthorizedPageMessage />;
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
