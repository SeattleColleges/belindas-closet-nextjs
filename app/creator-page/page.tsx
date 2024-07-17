'use client'
import { createContext } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useMediaQuery, useTheme } from '@mui/material';

const Creator = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ mt: 3, mb: 4 }}
            >
                Welcome to the CREATOR PAGE
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
                sx={{ flexDirection: isMobile ? "column" : "row" }}
            >
                <Button href="/add-product-page" sx={{ mt: isMobile ? 2 : 0 }}>
                    Add Product
                </Button>
                <Button href="/category-page/all-products" sx={{ mt: isMobile ? 2 : 0 }}>
                    All Products
                </Button>
                <Button href="/archived-products-page" sx={{ mt: isMobile ? 2 : 0 }}>
                    Archived Products
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Creator;
