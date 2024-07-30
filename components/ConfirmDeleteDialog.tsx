import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import { Product } from "@/app/category-page/[categoryId]/products/[productId]/ProductDetailDisplay";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useMediaQuery, useTheme } from "@mui/material";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
/**
 * Props for the ConfirmDeleteDialog component.
 */
interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}
/**
 * Renders a confirmation dialog for deleting products.
 *
 * @param props - The component props.
 * @returns The rendered ConfirmDeleteDialog component.
 */
export default function ConfirmDeleteDialog({
  open,
  onClose,
  product,
}: ConfirmDeleteDialogProps) {
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");
  /**
   * Handles the click event when the user confirms "No" to deleting product.
   * @returns {void}
   */
  const handleNo = () => {
    onClose();
  };
  /**
   * Handles the click event when the user confirms "Yes" to deleting product.
   * @returns {void}
   */
  const handleYes = async () => {
    // TODO: Confirm Yes to delete product
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${URL}/products/remove/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isHidden: Boolean }),
      });
      if (response.ok) {
        onClose();
        setSnackBarMessage("Product deleted successfully!");
        setTimeout(() => {
          window.history.back();
        }, 2000);
      } else {
        const errorMessage = await response.json();
        setSnackBarMessage(errorMessage.message);
        console.error("Failed to delete product", response.statusText);
      }
    } catch (error) {
      setSnackBarMessage("Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        bgcolor: "background.paper",
        color: "#000",
      }}
    >
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: isMobile ? "75%" : "50%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={Boolean(snackBarMessage)}
        autoHideDuration={6000}
        onClose={() => setSnackBarMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={snackBarMessage}
      />
    </Box>
  );
}
