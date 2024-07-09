"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
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

const drawerWidth = 240;

const navItems = ["Home", "Donation", "Mission", "Contact"];
const links = ["/", "/donation-info", "/mission-page", "/contact-page"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Link href="/" passHref>
        <Button color="secondary">
          <Image src={header_logo} alt="logo" width={100} height={50} />
        </Button>
      </Link>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <Grid
            item
            key={item}
            sx={{
              color: "primary.main",
            }}
          >
            {index === 1 ? <CategoryDropDownMenu /> : null}
            <Link href={links[index]} passHref>
              <Button key={item} onClick={handleDrawerToggle}>
                {item}
              </Button>
            </Link>
          </Grid>
        ))}
        {(userRole === "admin" || userRole === "creator") && (
          <Grid item>
            <Link href="/dashboard" passHref>
              <Button onClick={handleDrawerToggle}>
                Dashboard
              </Button>
            </Link>
          </Grid>
        )}
      </List>
      <Divider />

      {/* Profile menu for drawer */}
      <Grid
        container
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
        }}
      >
        {token ? <AuthProfileMenu /> : null}
      </Grid>
    </Box>
  );

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
            <Grid container spacing={2}>
              {navItems.map((item, index) => (
                <Grid item key={item} sx={{ display: "flex" }}>
                  {index === 1 ? <CategoryDropDownMenu /> : null}
                    <Link href={links[index]} passHref>
                    <Button key={item} sx={{ color: "#fff" }}>
                        {item}
                      </Button>
                    </Link>
                </Grid>
              ))}
              {(userRole === "admin" || userRole === "creator") && (
                <Grid item>
                  <Link href="/dashboard" passHref>
                    <Button sx={{ color: "primary.contrastText" }}>
                      Dashboard
                    </Button>
                  </Link>
                </Grid>
              )}
              {!token ? (
                <Grid item>
                <Link href="/auth/sign-in" passHref>
                  <Button sx={{ color: "primary.contrastText" }}>
                    Sign In
                  </Button>
                </Link>
              </Grid>
              ) : null }
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
            {token ? <AuthProfileMenu /> : null}
          </Grid>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}
