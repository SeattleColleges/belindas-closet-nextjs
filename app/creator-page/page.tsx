'use client'

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
                <Button href="/archived-products-page">
                    Archived Products
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Creator;
