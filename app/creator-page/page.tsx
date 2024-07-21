'use client'

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';

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
};

export default Creator;
