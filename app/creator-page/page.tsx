'use client'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import UnauthorizedPageMessage from '@/components/UnauthorizedPageMessage';
import { useState, useEffect } from 'react';

const Creator = () => {
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

    if ((userRole === "creator")) {
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
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ mt: 6 }}
            >
                <Grid container spacing={ isMobile ? 3 : 2 } justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm="auto">
                        <Button 
                            href="/add-product-page"
                            color="primary" 
                            variant="contained"
                            sx={{ width: "200px" }}
                        >
                            Add Product
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                        <Button 
                            href="/category-page/all-products"
                            color="primary" 
                            variant="contained"
                            sx={{ width: "200px" }}
                        >
                            All Products
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm="auto">
                        <Button 
                            href="/archived-products-page"
                            color="primary" 
                            variant="contained"
                            sx={{ width: "200px" }}
                        >
                            Archived Products
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
        );
    } else {
        return <UnauthorizedPageMessage />;
    }
};

export default Creator;
