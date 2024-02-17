import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "app/logo.png";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";

interface Product {
  _id: string;
  productType: string[];
  productGender: string[];
  productShoeSize: string[];
  productSize: string[];
  productSizePantsWaist: string[];
  productSizePantsInseam: string[];
  productDescription: string;
  productImage: string;
}

const ProductDetailDisplay = ({ product }: { product: Product }) => {
  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#12202d",
      }}
    >
      <Box
        width={800}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={2}
        bgcolor="#293745"
        p={3}
      >
        <Typography component="h1" variant="h4">
          {product && product.productType}
        </Typography>
        <Paper elevation={3}>
          <Box p={2} m={2}>
            {product && (
              <Stack direction="column" spacing={2} justifyContent="center">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  alignItems="flex-start"
                >
                  <Typography variant="h6">
                    Product ID: {product._id}
                  </Typography>
                  <Typography variant="h6">
                    Product Type: {product.productType}
                  </Typography>
                  <Typography variant="h6">
                    Product Gender: {product.productGender}
                  </Typography>
                  <Typography variant="h6">
                    Product Shoe Size: {product.productShoeSize || "N/A"}
                  </Typography>
                  <Typography variant="h6">
                    Product Size: {product.productSize || "N/A"}
                  </Typography>
                  <Typography variant="h6">
                    Product Size Pants Waist:{" "}
                    {product.productSizePantsWaist || "N/A"}
                  </Typography>
                  <Typography variant="h6">
                    Product Size Pants Inseam:{" "}
                    {product.productSizePantsInseam || "N/A"}
                  </Typography>
                  <Typography variant="h6">
                    Product Description: {product.productDescription || "N/A"}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center">
                  <Image
                    src={logo} // temporary image
                    alt="Product Image"
                    width={250}
                    height={250}
                    style={{ borderRadius: "5px", marginTop: "10px" }}
                  />
                </Box>
              </Stack>
            )}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center">
            {/* Edit Button */}
            <Box p={2} display="flex" justifyContent="center">
              <Button variant="contained" color="primary">
                <EditIcon sx={{ mr: 1 }} />
                Edit
              </Button>
            </Box>
            {/* Delete Button */}
            <Box p={2} display="flex" justifyContent="center">
              <Button variant="contained" color="error">
                <DeleteIcon sx={{ mr: 1 }} />
                Delete
              </Button>
            </Box>
            {/* Archive Button */}
            <Box p={2} display="flex" justifyContent="center">
              <Button variant="contained" color="warning">
                <ArchiveIcon sx={{ mr: 1 }} />
                Archive
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetailDisplay;
