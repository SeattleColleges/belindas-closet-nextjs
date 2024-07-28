"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/belinda-images/logo.png";
import google_play from "@/public/belinda-images/google_play.png";
import CustomCardContent from "@/components/CustomCardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { Container, Typography, Button } from "@mui/material";
import WrapperDiv from "../components/WrapperDiv";
import { categories } from "@/components/CategoryImages";
import useAuth from "@/hooks/useAuth";
// TEMPORARY CATEGORIES LIST
const Home = () => {
  const [token, setToken] = useState("");
  const { isAuth } = useAuth();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);
  
  return (
    <WrapperDiv>
      <Container disableGutters fixed maxWidth="xs" sx={{ justifyContent: "center" }}>
        <Image src={logo} alt="logo" width={100} />
      </Container>
      <Typography component="h1" variant="h3">
        Belinda&apos;s Closet
      </Typography>
      {!isAuth ? (
        <Stack direction="row" spacing={2}>
          <Button href="/auth/sign-in" component="a" variant="contained">
            Sign In
          </Button>
          <Button href="/auth/sign-up" component="a" variant="contained">
            Sign Up
          </Button>
        </Stack>
      ) : null}
      {/* download mobile app link */}
      <Button
        component="a"
        href=""
        variant="outlined"
        startIcon={<Image src={google_play} alt="google_play" />}
        sx={{ mb: 2 }}
      >
        Download App
      </Button>
      <Grid container spacing={2}>
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
      </Grid>
    </WrapperDiv>
  );
};

export default Home;
