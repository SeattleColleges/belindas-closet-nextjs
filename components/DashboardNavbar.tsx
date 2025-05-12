"use client";
import { Typography, Box, Button, IconButton, Collapse, Divider, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import header_logo from "@/public/belinda-images/nsc_mascot.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface MenuItem {
  id: string;
  label: string;
}

interface User {
  firstName: string;
  lastName: string;
}

interface DashboardNavbarProps {
  user: User | null;
  menuItems: MenuItem[];
  selectedItemId: string;
  onItemSelect: (id: string) => void;
}

const DashboardNavbar = ({ user, menuItems, selectedItemId, onItemSelect }: DashboardNavbarProps) => {
  const [navOpen, setNavOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleListItemClick = (id: string) => {
    onItemSelect(id);
    if (isMobile) {
      setNavOpen(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        zIndex: 1000,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      {/* Central Logo Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          padding: "8px 16px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
          position: "relative",
        }}
      >
        <Image
          src={header_logo}
          alt="Tree Frogs logo"
          style={{
            width: 80,
            height: 60,
            objectFit: "contain",
          }}
        />
        <IconButton
          onClick={toggleNav}
          size="small"
          sx={{
            mt: 0.5,
            backgroundColor: "#8BC751",
            color: "white",
            width: 24,
            height: 24,
            "&:hover": {
              backgroundColor: "#7ab643",
            },
          }}
        >
          {navOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
        </IconButton>
      </Box>

      <Typography component="h1" sx={{ mb: 2 }}>
        Hello, {user?.firstName}
      </Typography>

      {/* Collapsible navigation menu */}
      <Collapse in={navOpen} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            p: 1,
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.default",
          }}
        >
          {menuItems.map((item, idx) => (
            <Box key={item.id} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => handleListItemClick(item.id)}
                sx={{
                  color: "text.primary",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: selectedItemId === item.id ? "#8BC751" : "transparent",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                  py: 1,
                  px: 2,
                  borderRadius: "4px",
                  flex: isMobile ? 1 : "unset",
                  width: isMobile ? "100%" : "auto",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: selectedItemId === item.id ? "#8BC751" : "background.default",
                  },
                }}
              >
                {item.label}
              </Button>
              {!isMobile && idx < menuItems.length - 1 && <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />}
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default DashboardNavbar;
