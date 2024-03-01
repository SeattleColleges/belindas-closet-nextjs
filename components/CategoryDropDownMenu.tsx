import React from "react";
import { Container, Button, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useRouter } from "next/navigation";
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

export default function CategoryDropDownMenu() {
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
    const encodedCategoryId = encodeURIComponent(item); //sanitize item name for route
    router.push(`/category-page/${encodedCategoryId}`);
    handleClose();
  };

  return (
    <Container>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<ArrowDropDown />}
        color={open ? "inherit" : "inherit"}
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
      >
        {navItems.map((item) => (
          <MenuItem key={item} onClick={() => navigate(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}
