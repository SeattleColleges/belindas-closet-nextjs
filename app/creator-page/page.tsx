'use client'
import { createContext } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

const Creator = () => {
    return (
        <div>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
            >
                Welcome to the CREATOR PAGE
            </Typography>

            <Typography
                variant="body1"
                gutterBottom
            >
                FIX: Creator Placeholder Text goes here
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

                <Button href="/archived-products-page">
                    Archived Products
                </Button>

            </ButtonGroup>
        </div>
    );
};

export default Creator;
