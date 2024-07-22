'use client'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup'
import { useMediaQuery, useTheme } from '@mui/material';
import UnauthorizedPageMessage from '@/components/UnauthorizedPageMessage';
import { useState, useEffect } from 'react';

const Admin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  if ((userRole === "admin")) {
    return (
      <div>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mt: 4, mb: isMobile ? 4 : 6 }}
        >
          My Account
        </Typography>
        <ButtonGroup
          color="primary"
          variant="contained"
          sx={{ flexDirection: isMobile ? "column" : "row",
            '& .MuiButton-root': {
              borderRadius: '4px',
              mr: isMobile ? 0 : 1,
              ml: isMobile ? 0 : 1,
              mt: isMobile ? 1 : 0,
              mb: isMobile ? 2 : 0,
            },
          }}
        >
          <Button href="/add-product-page">
            Add Product
          </Button>
          <Button href="/category-page/all-products">
            All Products
          </Button>
          <Button href="/edit-user-role-page">
            Edit User Roles
          </Button>
          <Button href="/archived-products-page">
            Archived Products
          </Button>
        </ButtonGroup>
      </div>
    );
  } else {
    return <UnauthorizedPageMessage />
  }
};

export default Admin;
