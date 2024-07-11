import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/belinda-images/logo.png";
import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  // Check if the product is a shoe, pants, etc. 
  const isShoeProduct = product.productType.includes("Shoes");
  const isPantsProduct = product.productType.includes("Pants");

  return (
    <Stack>
      <Typography component="h1" variant="h4" marginTop="10px">
        {product && product.productType}
      </Typography>
      <Box display="flex" justifyContent="center">
        <Paper elevation={3} sx={{  mt: 3, width: isMobile ? "95%" : "100%" }}>
          <Box p={2} m={2}>
          <Box display="flex" justifyContent="center">
            <Image
              src={logo} // temporary image
              alt="Product Image"
              width={isMobile ? 200 : 250}
              height={isMobile ? 160 : 200}
              style={{ borderRadius: "5px", marginBottom: "15px" }}
            />
            </Box>
            {product && (
              <Stack direction="column" spacing={2} justifyContent="center">
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={isMobile ? 1.5 : 2}
                  alignItems="flex-start"
                  textAlign="left"
                >
                  <Typography variant="h6">
                    Product Type: {product.productType}
                  </Typography>
                  <Typography variant="h6">
                    Gender: {product.productGender}
                  </Typography>
                  {isShoeProduct && (
                    <Typography variant="h6">
                      Shoe Size: {product.productSizeShoe || "N/A"}
                    </Typography>
                  )}
                  {!isShoeProduct &&  (
                  <Typography variant="h6">
                    Size: {product.productSizes || "N/A"}
                  </Typography>
                  )}
                  {!isShoeProduct && isPantsProduct && (
                    <>
                      <Typography variant="h6">
                        Waist Size: {product.productSizePantsWaist || "N/A"}
                      </Typography>
                      <Typography variant="h6">
                        Inseam: {product.productSizePantsInseam || "N/A"}
                      </Typography>
                    </>
                  )}
                  <Typography variant="h6" sx={{ fontSize: isMobile ? "1.1rem" : "1.1rem" }}>
                    Description: {product.productDescription || "N/A"}
                  </Typography>
                </Box>
              </Stack>
            )}
          </Box>

          {userRole === "admin" || userRole === "creator" ? (
            <Stack 
              direction={ isMobile ? "column" : "row" } 
              spacing={isMobile ? 1 : 2}
              justifyContent="center"
            >
              {/* Edit Button */}
              <Box p={isMobile ? 1 : 2} display="flex" justifyContent="center">
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
              <Box p={isMobile ? 1 : 2} display="flex" justifyContent="center">
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
              <Box p={isMobile ? 1 : 2} display="flex" justifyContent="center" sx={{ pb: isMobile ? 3 : 2 }}>
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
      </Box>
    </Stack>
  );
};

export default ProductDetailDisplay;

