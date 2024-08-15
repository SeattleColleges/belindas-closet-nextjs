"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import header_logo from "@/public/belinda-images/header_logo.png";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Grid,
  Drawer,
  Box,
  CssBaseline,
  Divider,
  List,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryDropDownMenu from "./CategoryDropDownMenu";
import AuthProfileMenu from "./AuthProfileMenu";
import ThemeToggle from "./ThemeToggle";
import useAuth from "@/hooks/useAuth";

const drawerWidth = 240;


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuth, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Button color="secondary">
                <Image src={header_logo} alt="logo" width={100} height={50}/>
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Grid container spacing={1}>
              <Grid item sx={{ display: "flex" }}>
                <CategoryDropDownMenu />
              </Grid>
              {isAuth && user && (user.role === "admin" || user.role === "creator") && (
                <Grid item>
                  <Link href="/dashboard" passHref>
                    <Button sx={{ color: "primary.contrastText" }}>
                      Dashboard
                    </Button>
                  </Link>
                </Grid>
              )}
              {!isAuth ? (
                <Grid item>
                <Link href="/auth/sign-up" passHref>
                  <Button
                    sx={
                      { color: "primary.main", 
                      backgroundColor: 'white', 
                      filter: 'none',
                      borderRadius: 0,
                      fontWeight: 700,
                      '&:hover': {
                        color: 'primary.contrastText'
                      }
                    }} 
                    >
                    Sign Up
                  </Button>
                </Link>
              </Grid>
              ) : null}
              {!isAuth ? (
                <Grid item>
                <Link href="/auth/sign-in" passHref>
                  <Button sx={{ color: "primary.contrastText" }}>
                    Log In
                  </Button>
                </Link>
              </Grid>
              ) : null}
            </Grid>
          </Box>
          
          {/* Theme Toggle for fullsize */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ml: 2.5,
              mr: 1
            }}
          >
            <ThemeToggle />
          </Box>
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            {isAuth ? <AuthProfileMenu /> : null}
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}
