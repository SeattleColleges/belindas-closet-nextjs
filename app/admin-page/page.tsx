// import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

'use client'
import { createContext } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup'

const Admin = () => {
  const handleAddProduct = () => {
    // Add code here to handle the "Add Product" button click event
  };

  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        Welcome to the ADMIN PAGE
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
      >
        FIX: allow only users with admin role to be routed to this page
      </Typography>


      <ButtonGroup
        color="primary"
        variant="contained"
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
};

export default Admin;
