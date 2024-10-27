"use client";

import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import ProductDetailDisplay from "../[productId]/ProductDetailDisplay";

const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
interface Product {
  _id: string;
  productType: string[];
  productGender: string[];
  productSizeShoe: string[];
  productSizes: string[];
  productSizePantsWaist: string[];
  productSizePantsInseam: string[];
  productDescription: string;
  productImage: string;
  isHidden: boolean;
  isSold: boolean;
}

const ProductDetail = ({
  params,
}: {
  params: { categoryId: string; productId: string };
}) => {
  const [product, setProduct] = useState<Product | null>(null); // State to hold the fetched product details
  const [isLoading, setIsLoading] = useState(true); // State to hold loading status
  const [error] = useState(null); // State to hold any error that occurs during fetching

  const { categoryId, productId } = params;
  const decodedCategoryId = decodeURIComponent(categoryId);

  useEffect(() => {
    const fetchUrl = `${URL}/products/find/${productId}`;

    const fetchProductDetails = async () => {
      setIsLoading(false);
      try {
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            `Error fetching product details: ${response.statusText}`
          );
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error getting product detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [decodedCategoryId, productId]); // Dependency array to trigger effect when categoryId or productId changes

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return <ProductDetailDisplay product={product as Product} />;
};

export default ProductDetail;
