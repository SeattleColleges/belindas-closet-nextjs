"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import ProductCard from "@/components/ProductCard";
import logo from "../../logo.png";
import { Container, Grid, Typography } from "@mui/material";
const placeholderImg = logo;
interface Product {
  _id: string;
  productImage: typeof placeholderImg;
  productType: string[];
  productGender: string;
  productSizeShoe: string;
  productSize: string;
  productSizePantsWaist: string;
  productSizePantsInseam: string;
  productDescription: string;
}

async function fetchData(
  categoryId: string,
  setProducts: Dispatch<SetStateAction<Product[]>>
) {
  const apiUrl = "http://localhost:3000/api/products/findByType/";
  const queryParam = encodeURIComponent(categoryId);
  const fetchUrl = `${apiUrl}${queryParam}`;

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
      setProducts(data);
      console.log(data);
    }
  } catch (error) {
    console.error("Error getting product:", error);
  }
}

const ViewProduct = ({ categoryId }: { categoryId: string }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData(categoryId, setProducts); // Pass categoryId to fetchData
  }, [categoryId]);

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Typography
        variant="h4"
        gutterBottom
        justifyContent={"center"}
        align={"center"}
      >
        Found {products.length} products in {categoryId}
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <ProductCard
              image={logo}
              categories={product.productType}
              gender={product.productGender}
              sizeShoe={product.productSizeShoe}
              size={product.productSize}
              sizePantsWaist={product.productSizePantsWaist}
              sizePantsInseam={product.productSizePantsInseam}
              description={product.productDescription}
              href={`/category-page/${categoryId}/products/${product._id}`} // Construct the URL
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default function ProductList({
  params,
}: {
  params: { categoryId: string };
}) {
  const decodedCategoryId = decodeURIComponent(params.categoryId);

  return (
    <Container>
      <ViewProduct categoryId={decodedCategoryId} />
    </Container>
  );
}
