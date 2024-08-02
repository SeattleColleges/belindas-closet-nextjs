import React from "react";
import { Button, Menu, MenuItem, Box, useTheme, useMediaQuery } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useRouter } from "next/navigation";
const navItems = [
  "All Products",
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

export default function CategoryDropDownMenu() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const navigate = (item: string) => {
    if (item === "All Products") {
      router.push(`/category-page/all-products`);
    } else {
      const encodedCategoryId = encodeURIComponent(item); //sanitize item name for route
      router.push(`/category-page/${encodedCategoryId}`);
    }
    handleClose();
  };

  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDown />}
        color={open ? "inherit" : "inherit"}
        sx={{ mr: isMobile ? 0 : 2 }}
      >
        Products
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ transform: 'translateX(-6px)' }}
      >
        {navItems.map((item) => (
          <MenuItem key={item} onClick={() => navigate(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
