'use client';
import React from "react";
import Image from "next/image";
import logo from "./logo.png";
import google_play from "./google_play.png";
import CustomCardContent from "@/components/CustomCardContent";
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { Container, Typography, Button } from '@mui/material';
import WrapperDiv from '../components/WrapperDiv'

// TEMPORARY CATEGORIES LIST
const placeholderImg = logo;
const categories = [
  {'type': 'Shirts', 'image': placeholderImg},
  {'type': 'Shoes', 'image': placeholderImg},
  {'type': 'Pants', 'image': placeholderImg},
  {'type': 'Skirts', 'image': placeholderImg},
  {'type': 'Suits', 'image': placeholderImg},
  {'type': 'Dress', 'image': placeholderImg},
  {'type': 'Casual Wear', 'image': placeholderImg},
  {'type': 'Accessories', 'image': placeholderImg},
  {'type': 'Jacket/Blazer', 'image': placeholderImg},
]

const Home = () => {
  return (
    <WrapperDiv>
      <Container disableGutters fixed maxWidth="xs" sx={{width: "15%"}}>
        <Image src={logo} alt="logo" width={100} />
      </Container>
      <Typography component='h1' variant='h3' sx={{color: 'white'}}>
        Belinda&apos;s Closet
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button href="/auth/sign-in" component='a' variant="contained">Sign In</Button>
        <Button href="/auth/sign-up" component='a' variant="contained">Sign Up</Button>
      </Stack>
      {/* download mobile app link */}
      <Button component='a' href="" variant="outlined" startIcon={<Image src={google_play} alt="google_play" />} sx={{color:'white' }}>
        Download App
      </Button>
        <Grid container spacing={2}>
            {categories.map((category, index)=>(
              <Grid xs={12} md={6} lg={4} component="div" key={index}>
                <Card>
                  <CustomCardContent title={category.type} image={placeholderImg} />
                </Card>
              </Grid>
            ))}
        </Grid>
      </WrapperDiv>
  );
};

export default Home;