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
  Drawer,
  Box,
  CssBaseline,
  List,
  useTheme,
  ListItemButton,
  ListItemText,
  ListItem

} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryDropDownMenu from "./CategoryDropDownMenu";
import AuthProfileMenu from "./AuthProfileMenu";
import ThemeToggle from "./ThemeToggle";
import useAuth from "@/hooks/useAuth";



export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuth, user } = useAuth();
  const theme = useTheme();

  //Toggle mobile menu
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Auth Buttons for mobile & desktop
  const renderAuthButtons = () => {
    if (isAuth) return null;
    return (
      <>
        <Link href="/auth/sign-up" passHref legacyBehavior>
          <Button sx={{
            color: "primary.contrastText", fontWeight: 700
          }}>Sign Up</Button>
        </Link>
        <Link href="/auth/sign-in" passHref legacyBehavior>
          <Button sx={{
            color: "primary.contrastText", fontWeight: 700, '&:hover': {
              color: 'primary.contrastText'
            }
          }}>Log In</Button>
        </Link>
      </>
    );
  };

  //Sidebar for mobile
  const drawer = (
    <Box sx={{ width: 240 }} role="presentation" onClick={(e) => e.stopPropagation()}>
      <List>
        <ListItem>
          <Link href="/" passHref legacyBehavior>
            <Image src={header_logo} alt="logo" width={100} height={50} />
          </Link>
        </ListItem>
        <ListItem>
          <CategoryDropDownMenu />
        </ListItem>
        {isAuth && user && (user.role === "admin" || user.role === "creator") && (
          <ListItem>
            <Link href="/dashboard" passHref legacyBehavior>
              <ListItemButton>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </Link>
          </ListItem>
        )}
        {!isAuth && (
          <>
            <ListItem>
              <Link href="/auth/sign-up" passHref legacyBehavior>
                <ListItemButton>
                  <ListItemText primary="Sign Up" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem>
              <Link href="/auth/sign-in" passHref legacyBehavior>
                <ListItemButton>
                  <ListItemText primary="Log In" />
                </ListItemButton>
              </Link>
            </ListItem>
          </>
        )}
        {isAuth && <ListItem onClick={(e) => e.stopPropagation()}><AuthProfileMenu /></ListItem>}
      </List>
    </Box>
  );
  return (
    <>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ flexGrow: 2 }}>
            <Link href="/" passHref legacyBehavior>
              <Button color="primary">
                <Image src={header_logo} alt="logo" width={100} height={50} />
              </Button>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", marginRight: "1rem", width: "100%" }}>
            <CategoryDropDownMenu />
            <Box sx={{ justifyContent: "center", alignItems: "center", display: "flex", flexGrow: 1, marginRight: "8rem" }}>
              <List sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "auto" }}>
                <Link href={"/donation-info"} passHref legacyBehavior>
                  <ListItemButton sx={{ marginInline: 4, padding: 0 }}>
                    <ListItemText primary="DONATIONS" />
                  </ListItemButton>
                </Link>
                <Link href={"/mission-page"} passHref legacyBehavior>
                  <ListItemButton sx={{ marginInline: 4, padding: 0, textWrap: "nowrap" }}>
                    <ListItemText primary="ABOUT US" />
                  </ListItemButton>
                </Link>
                <Link href={"/contact-page"} passHref legacyBehavior>
                  <ListItemButton sx={{ marginInline: 4, padding: 0 }}>
                    <ListItemText primary="CONTACT" />
                  </ListItemButton>
                </Link>
                {isAuth && user && (user.role === "admin" || user.role === "creator") && (
                  <Link href={"/dashboard"} passHref legacyBehavior>
                    <ListItemButton>
                      <ListItemText primary="DASHBOARD" />
                    </ListItemButton>
                  </Link>
                )}
              </List>
            </Box>
            {renderAuthButtons()}
          </Box>
          {/* Theme Toggle for fullsize */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              ml: 2.5,
              mr: 1
            }}
          >
            <ThemeToggle />
          </Box>
          {isAuth && <AuthProfileMenu />}
        </Toolbar>
      </AppBar>
      {/* Toolbar spacing */}
      <Box component="main">
        <Toolbar />
      </Box>
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>

  );
}
