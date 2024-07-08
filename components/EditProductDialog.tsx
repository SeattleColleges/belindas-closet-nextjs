import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import InputSelect from "@/components/InputSelect";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Product } from "@/app/category-page/[categoryId]/products/[productId]/ProductDetailDisplay";
import {
  ProductGenderList,
  ProductSizeShoeList,
  ProductSizesList,
  ProductSizePantsWaistList,
  ProductSizePantsInseamList,
} from "@/app/add-product-page/product-prop-list";
// WARNING: You won't be able to connect to local backend unless you remove the env variable below.
const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Props for the EditProductDialog component.
 */
interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}
/**
 * Renders a confirmation dialog for editing products.
 *
 * @param props - The component props.
 * @returns The rendered EditProductDialog component.
 */
export default function EditProductDialog({
  open,
  onClose,
  product,
}: EditProductDialogProps) {
  const [snackBarMessage, setSnackBarMessage] = useState<string | null>(null);
  const [productGender, setProductGender] = useState<string[]>(
    product.productGender || []
  );
  const [productSizeShoe, setProductSizeShoe] = useState<string[]>(
    product.productSizeShoe || []
  );
  const [productSizes, setProductSizes] = useState<string[]>(
    product.productSizes || []
  );
  const [productSizePantsWaist, setProductSizePantsWaist] = useState<string[]>(
    product.productSizePantsWaist || []
  );
  const [productSizePantsInseam, setProductSizePantsInseam] = useState<
    string[]
  >(product.productSizePantsInseam || []);
  const [productDescription, setProductDescription] = useState(
    product.productDescription || ""
  );
  const [productImage, setProductImage] = useState<string>(
    product.productImage || ""
  );

  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    setIsUpdated(false);
  }, [open]);

  const handleProductGenderSelect = (
    e: React.ChangeEvent<{ value: string }>
  ) => {
    setProductGender([e.target.value]);
    setIsUpdated(true);
  };

  const handleProductSizeShoeSelect = (
    e: React.ChangeEvent<{ value: string }>
  ) => {
    setProductSizeShoe([e.target.value]);
    setIsUpdated(true);
  };
  const handleProductSizeSelect = (e: React.ChangeEvent<{ value: string }>) => {
    setProductSizes([e.target.value]);
    setIsUpdated(true);
  };
  const handleProductSizePantsWaistSelect = (
    e: React.ChangeEvent<{ value: string }>
  ) => {
    setProductSizePantsWaist([e.target.value]);
    setIsUpdated(true);
  };
  const handleProductSizePantsInseamSelect = (
    e: React.ChangeEvent<{ value: string }>
  ) => {
    setProductSizePantsInseam([e.target.value]);
    setIsUpdated(true);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<{ value: string }>) => {
    setProductDescription(e.target.value);
    setIsUpdated(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<{ value: any }>) => {
    setProductImage(e.target.value);
    setIsUpdated(true);
  };
  /**
   * Handles the click event when the user confirms "Cancel" to deleting product.
   * @returns {void}
   */
  const handleCancel = () => {
    onClose();
  };
  /**
   * Handles the click event when the user confirms "Save Changes" to editing product.
   * @returns {void}
   */
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${URL}/products/update/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productGender,
          productSizeShoe,
          productSizes,
          productSizePantsWaist,
          productSizePantsInseam,
          productDescription,
          productImage
        }),
      });
      if (response.ok) {
        onClose();
        setSnackBarMessage("Changes saved successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const errorMessage = await response.json();
        setSnackBarMessage(errorMessage.message);
        console.error("Failed to edit product", response.statusText);
      }
    } catch (error) {
      setSnackBarMessage("Error editing product");
      console.error("Error editing product:", error);
    }
  };

  const isShoeProduct = product.productType.includes("Shoes");
  const isPantsProduct = product.productType.includes("Pants");

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
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent dividers>
          <InputSelect
            label="Product Gender"
            value={productGender.join(",")}
            options={Object.entries(ProductGenderList).map(([key, value]) => ({
              label: value,
              value: key,
            }))}
            onChange={handleProductGenderSelect}
            style={{ color: "black" }}
            labelTextColor="black"
          />
          {isShoeProduct && (
          <InputSelect
            label="Product Size Shoe"
            value={productSizeShoe.join(",")}
            options={Object.values(ProductSizeShoeList).map((size) => ({
              label: size,
              value: size,
            }))}
            onChange={handleProductSizeShoeSelect}
            style={{ color: "black" }}
            labelTextColor="black"
          />
          )}
          {!isShoeProduct &&  (
          <InputSelect
            label="Product Size"
            value={productSizes.join(",")}
            options={Object.entries(ProductSizesList).map(([key, value]) => ({
              label: value,
              value: key,
            }))}
            onChange={handleProductSizeSelect}
            style={{ color: "black" }}
            labelTextColor="black"
          />
          )}
          {!isShoeProduct && isPantsProduct && (
          <InputSelect
            label="Product Size Pants Waist"
            value={productSizePantsWaist.join(",")}
            options={Object.values(ProductSizePantsWaistList).map((size) => ({
              label: size,
              value: size,
            }))}
            onChange={handleProductSizePantsWaistSelect}
            style={{ color: "black" }}
            labelTextColor="black"
          />
          )}
          {!isShoeProduct && isPantsProduct && (
          <InputSelect
            label="Product Size Pants Inseam"
            value={productSizePantsInseam.join(",")}
            options={Object.values(ProductSizePantsInseamList).map((size) => ({
              label: size,
              value: size,
            }))}
            onChange={handleProductSizePantsInseamSelect}
            style={{ color: "black" }}
            labelTextColor="black"
          />
          )}
          <Input
            label="Product Description"
            value={productDescription}
            type="text"
            onChange={handleDescriptionChange}
            style={{ color: "black" }}
            labelTextColor="black"
          />
          <Input
            label="Product Image"
            type="file"
            onChange={handleImageUpload}
            style={{ color: "black" }}
            labelTextColor="black"
            value={""}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} disabled={!isUpdated}>Save Changes</Button>
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
