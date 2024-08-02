"use client";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import logo from "@/public/belinda-images/logo.png";
import google_play from "@/public/belinda-images/google_play.png";
import CustomCardContent from "@/components/CustomCardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { Container, Typography, Button, Popover, Link } from "@mui/material";
import WrapperDiv from "../components/WrapperDiv";
import { categories } from "@/components/CategoryImages";
import {Carousel} from "@/components/Carousel";
import Product from '../models/productModel';
import CategoryBlock from "@/components/CategoryBlock";
import ImageBanner from "@/components/ImageBanner";
import CategoryDropDownMenu from "@/components/CategoryDropDownMenu";
import { useRouter } from 'next/navigation'

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";
const placeholderImg = logo;

const navItems = [
  "Shirts",
  "Shoes",
  "Pants",
  "Skirts",
  "Suits",
  "Dress",
  "Casual Wear",
  "Accessories",
  "Jacket/Blazer",
];

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
      const sortedData = filteredData.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
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
      {/* <Container disableGutters fixed maxWidth="xs" sx={{ justifyContent: "center" }}>
        <Image src={logo} alt="logo" width={100} />
      </Container>
      <Typography component="h1" variant="h3">
        Belinda&apos;s Closet
      </Typography>
      {!token ? (
        <Stack direction="row" spacing={2}>
          <Button href="/auth/sign-in" component="a" variant="contained">
            Sign In
          </Button>
          <Button href="/auth/sign-up" component="a" variant="contained">
            Sign Up
          </Button>
        </Stack>
      ) : null} */}
      {/* download mobile app link */}
      {/* <Button
        component="a"
        href=""
        variant="outlined"
        startIcon={<Image src={google_play} alt="google_play" />}
        sx={{ mb: 2 }}
      >
        Download App
      </Button> */}

      <ImageBanner />
      
      <Carousel carouselID="latest" 
      title="Latest Arrivals"
      products={products.slice(0,15)}/>

      <Stack 
        width={'100%'}
        maxWidth={1200}
        direction={'row'}  
        justifyContent={'space-between'}
        alignItems={'flex-end'}
        mt={2}
      >
        <Typography color="#114FA3" variant="h4" sx={{fontWeight: 900}}>
          Popular Categories
        </Typography>
        <Typography 
          color="#114FA3"
          variant="h5"
          sx={{fontWeight: 600, textDecoration: 'underline', cursor: 'pointer'}}
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
            {navItems.map((item) => (
              <Link key={item} variant="h6" p={1} onClick={() => navigate(item)} sx={{cursor: 'pointer'}}>
                {item}
              </Link>
            ))}
          </Stack>
        </Popover>
      </Stack>
      <Grid container spacing={2} sx={{maxWidth: 1200, width: '100%'}}>
        <Grid xs={6} md={4} lg={3}>
            <CategoryBlock category="shirts"/>
          </Grid>
          <Grid xs={6} md={4} lg={3}>
            <CategoryBlock category="dresses" variant="light"/>
          </Grid>
          <Grid xs={6} md={4} lg={3}>
            <CategoryBlock category="pants"/>
          </Grid>
          <Grid xs={6} md={4} lg={3}>
            <CategoryBlock category="shoes" variant="light"/>
          </Grid>
          <Grid xs={6} md={4} lg={3}>
            <CategoryBlock category="skirts"  variant="light"/>
          </Grid>
          <Grid xs={6} md={4} lg={3}>
            <CategoryBlock category="casual wear"/>
          </Grid>
          <Grid xs={6} md={4} lg={3}>
            <CategoryBlock category="accessories" variant="light"/>
          </Grid>
          <Grid xs={6} md={4} lg={3}>
            <CategoryBlock category="suits"/>
          </Grid>
        </Grid>

      <Carousel carouselID="womenswear" 
      title="Recent Womenswear"
      products={products.filter((product: Product) => (product.productGender.includes('FEMALE') || product.productGender.includes('NON-BINARY')))}/>

      <Carousel carouselID="menswear" 
      title="Recent Menswear"
      products={products.filter((product: Product) => (product.productGender.includes('MALE') || product.productGender.includes('NON-BINARY')))}/>

      {/* <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid xs={12} md={6} lg={4} component="div" key={index}>
            <Card>
              <CustomCardContent
                id={category.id}
                title={category.title}
                alt={category.alt}
              />
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </WrapperDiv>
  );
};

export default Home;
