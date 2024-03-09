import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import React, { useState } from "react";
import { Product } from "@/app/category-page/[categoryId]/products/[productId]/ProductDetailDisplay";

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
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        try {
            const response = await fetch(`http://localhost:3000/api/products/remove/${product._id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({isHidden: Boolean}),
              });
              if (response.ok) {
                onClose();
              } else {
                console.error('Failed to delete product', response.statusText);
              }
        } catch (error) {
            console.error('Error deleting product:', error);
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
            <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
            <DialogActions>
                <Button autoFocus onClick={handleNo}>No</Button>
                <Button onClick={handleYes}>Yes</Button>
            </DialogActions>
            </Dialog>
        </Box>
    );
}
