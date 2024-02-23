"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../app/logo.png";
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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CategoryDropDownMenu from "./CategoryDropDownMenu";

const drawerWidth = 240;
const navItems = ["Home", "Sign In", "Donation"];
const links = ["/", "/auth/sign-in", "/donation-info"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link href="/" passHref>
        <Button color="secondary">
          <Image src={logo} alt="logo" width={50} height={50} />
        </Button>
      </Link>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <Grid item key={item}>
            {index === 2 ? <CategoryDropDownMenu /> : null}
            <Link href={links[index]} passHref>
              <Button key={item} sx={{ color: "#000" }}>
                {item}
              </Button>
            </Link>
          </Grid>
        ))}
      </List>
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
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              <Button color="secondary">
                <Image src={logo} alt="logo" width={50} height={50} />
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Grid container spacing={2}>
              {navItems.map((item, index) => (
                <Grid item key={item} sx={{ display: "flex" }}>
                  {index === 2 ? <CategoryDropDownMenu /> : null}
                  <Link href={links[index]} passHref>
                    <Button key={item} sx={{ color: "#fff" }}>
                      {item}
                    </Button>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
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
            display: { xs: "block", sm: "none" },
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
