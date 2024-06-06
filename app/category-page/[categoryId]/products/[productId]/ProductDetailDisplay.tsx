import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/belinda-images/logo.png";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import ConfirmArchiveDialog from "@/components/ConfirmArchiveDialog";
import EditProductDialog from "@/components/EditProductDialog";

export interface Product {
  _id: string;
  productType: string[];
  productGender: string[];
  productSizeShoe: string[];
  productSizes: string[];
  productSizePantsWaist: string[];
  productSizePantsInseam: string[];
  productDescription: string;
  productImage: string;
  isHidden: boolean;
  isSold: boolean;
}

const ProductDetailDisplay = ({ product }: { product: Product | null }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openArchiveDialog, setOpenArchiveDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userRole, setUserRole] = React.useState("");

  // Get user role from token
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(role);
    }
  }, []);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const handleDeleteButtonClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleArchiveButtonClick = () => {
    setOpenArchiveDialog(true);
  };

  const handleCloseArchiveDialog = () => {
    setOpenArchiveDialog(false);
  };

  const handleEditButtonClick = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <Stack>
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
                  Product Shoe Size: {product.productSizeShoe || "N/A"}
                </Typography>
                <Typography variant="h6">
                  Product Size: {product.productSizes || "N/A"}
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

        {userRole === "admin" || userRole === "creator" ? (
        <Stack direction="row" spacing={2} justifyContent="center">
          {/* Edit Button */}
          <Box p={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditButtonClick}
            >
              Edit
            </Button>
          </Box>
          {/* Delete Button */}
          <Box p={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteButtonClick}
            >
              Delete
            </Button>
          </Box>
          {/* Archive Button */}
          <Box p={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="warning"
              startIcon={<ArchiveIcon />}
              onClick={handleArchiveButtonClick}
            >
              Archive
            </Button>
          </Box>
        </Stack>
          ) : null}

          <EditProductDialog
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            product={product}
          />
          <ConfirmDeleteDialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            product={product}
          />
          <ConfirmArchiveDialog
            open={openArchiveDialog}
            onClose={handleCloseArchiveDialog}
            product={product}
          />
      </Paper>
    </Stack>
  );
};

export default ProductDetailDisplay;
