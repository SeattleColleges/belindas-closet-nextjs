'use client'
import { createContext } from 'react';

import { Button, Typography } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup'

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

                <Button href="/">
                    All Products
                </Button>

            </ButtonGroup>
        </div>
    );
};

export default Creator;