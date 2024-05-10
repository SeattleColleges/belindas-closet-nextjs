import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import { Product } from "@/app/category-page/[categoryId]/products/[productId]/ProductDetailDisplay";
import Snackbar from "@mui/material/Snackbar";
// WARNING: You won't be able to connect to local backend unless you remove the env variable below.
const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";
/**
 * Props for the ConfirmArchiveDialog component.
 */
interface ConfirmArchiveDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}
/**
 * Renders a confirmation dialog for archiving products.
 *
 * @param props - The component props.
 * @returns The rendered ConfirmArchiveDialog component.
 */
export default function ConfirmArchiveDialog({
  open,
  onClose,
  product,
}: ConfirmArchiveDialogProps) {
  const [snackBarMessage, setSnackBarMessage] = useState<string>("");

  /**
   * Handles the click event when the user confirms "No" to archiving product.
   * @returns {void}
   */
  const handleNo = () => {
    onClose();
  };
  /**
   * Handles the click event when the user confirms "Yes" to archiving product.
   * @returns {void}
   */
  const handleYes = async () => {
    // TODO: Confirm Yes to archive product
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${URL}/products/archive/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isSold: Boolean }),
      });
      if (response.ok) {
        onClose();
        setSnackBarMessage("Product archived successfully!");
        setTimeout(() => {
          window.history.back();
        }, 2000);
      } else {
        const errorMessage = await response.json();
        setSnackBarMessage(errorMessage.message);
        console.error("Failed to archive product", response.statusText);
      }
    } catch (error) {
      setSnackBarMessage("Error archiving product");
      console.error("Error archiving product:", error);
    }
  };

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
        sx={{ "& .MuiDialog-paper": { width: "50%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>
          Are you sure you want to archive this product?
        </DialogTitle>
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
