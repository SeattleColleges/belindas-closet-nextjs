// import { Link } from 'react-router-dom'; // Import the Link component from react-router-dom

'use client'
import { createContext } from 'react';

import { Button, Typography } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup'

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

        <Button href="/">
          All Products
        </Button>

        <Button href="/edit-user-role-page">
          Edit User Roles
        </Button>

      </ButtonGroup>
    </div>
  );
};

export default Admin;
