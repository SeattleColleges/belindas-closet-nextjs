"use client";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Typography, Popover, Link, Box } from "@mui/material";
import WrapperDiv from "../components/WrapperDiv";
import { Carousel } from "@/components/Carousel";
import Product from '../models/productModel';
import CategoryBlock from "@/components/CategoryBlock";
import ImageBanner from "@/components/ImageBanner";
import { useRouter } from 'next/navigation'
import useAuth from "@/hooks/useAuth";
import { productList } from "@/components/productList";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

async function fetchData(
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
      const filteredData = data.filter((product: Product) => !product.isHidden && !product.isSold);
      const sortedData = filteredData.sort((a: Product, b: Product) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
      setProducts(sortedData);
    }
  } catch (error) {
    console.error("Error getting product:", error);
  }
}


const Home = () => {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLHeadingElement | null>(null);
  const { isAuth } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    fetchData(setProducts);
  }, []);

  const handlePopOverClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const router = useRouter();
  const navigate = (item: string) => {
    const encodedCategoryId = encodeURIComponent(item); //sanitize item name for route
    router.push(`/category-page/${encodedCategoryId}`);
    handleClose();
  };

  return (
    <WrapperDiv>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        <ImageBanner />

        <Box width="100%" maxWidth={1200} px={2} mt={4}>
          <Carousel carouselID="latest"
            title="Latest Arrivals"
            products={products.slice(0, 15)} />
        </Box>

        <Stack
          width={'100%'}
          maxWidth={1200}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mt={2}
          px={2}
        >
          <Typography color="#114FA3" variant="h4" sx={{ fontWeight: 900 }}>
            Popular Categories
          </Typography>
          <Typography
            color="#114FA3"
            variant="h5"
            sx={{ fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
            aria-describedby={'view-all-categories'}
            onClick={handlePopOverClick}>
            View all categories
          </Typography>
          <Popover
            id={'view-all-categories'}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Stack>
              {productList.map((item) => (
                <Link key={item} variant="h6" p={1} onClick={() => navigate(item)} sx={{ cursor: 'pointer' }}>
                  {item}
                </Link>
              ))}
            </Stack>
          </Popover>
        </Stack>
        <Grid container spacing={0} sx={{
          maxWidth: 1200,
          width: '100%',
          justifyContent: 'center',
          px: 2
        }}>
          <Grid item xs={6} md={4} lg={3}>
            <CategoryBlock category="Shirts" />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <CategoryBlock category="Dress" variant="light" />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <CategoryBlock category="Pants" />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <CategoryBlock category="Shoes" variant="light" />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <CategoryBlock category="Skirts" variant="light" />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <CategoryBlock category="Casual Wear" />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <CategoryBlock category="Accessories" variant="light" />
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <CategoryBlock category="Suits" />
          </Grid>
        </Grid>

        <Box width="100%" maxWidth={1200} px={2} mt={4}>
          <Carousel carouselID="womenswear"
            title="Recent Womenswear"
            products={products.filter((product: Product) => (product.productGender === 'FEMALE' || product.productGender === 'NON-BINARY'))} />
        </Box>

        <Box width="100%" maxWidth={1200} px={2} mt={4}>
          <Carousel carouselID="menswear"
            title="Recent Menswear"
            products={products.filter((product: Product) => (product.productGender === 'MALE' || product.productGender === 'NON-BINARY'))} />
        </Box>
      </Box>
    </WrapperDiv>
  );

};

export default Home;
