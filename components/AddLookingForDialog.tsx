import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ProductTypeList,
  ProductGenderList,
  ProductSizeShoeList,
  ProductSizesList,
  ProductSizePantsWaistList,
  ProductSizePantsInseamList,
} from '@/app/add-product-page/product-prop-list';
import {AlertColor} from "@mui/material/Alert";
import { User, LookingForItem } from '@/types/user';

interface AddLookingForDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onAdd: (item: LookingForItem) => void;
}

const AddLookingForDialog = ({ open, user, onClose, onAdd }: AddLookingForDialogProps) => {
  const [type, setType] = useState<string>('');
  const [productGender, setProductGender] = useState<string>('');
  const [productSizeShoe, setProductSizeShoe] = useState<string>('');
  const [productSizes, setProductSizes] = useState<string>('');
  const [productSizePantsWaist, setProductSizePantsWaist] = useState<string>('');
  const [productSizePantsInseam, setProductSizePantsInseam] = useState<string>('');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const notSizeApplicable = ["", "Pants", "Shoes"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      setSnackbarSeverity('error');
      setSnackbarMessage('User ID is not defined');
      setSnackbarOpen(true);
      return;
    }
    
    let finalSize = '';
    if (type === 'Shoes' && productSizeShoe) {
      finalSize = `Size ${productSizeShoe}`;
    } else if (type === 'Pants' && productSizePantsWaist && productSizePantsInseam) {
      finalSize = `W${productSizePantsWaist} L${productSizePantsInseam}`;
    } else if (!notSizeApplicable.includes(type) && productSizes) {
      finalSize = productSizes;
    }

    const token = localStorage.getItem('token');
    try {
      const apiUrl = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
      // Updated to use the new API endpoint pattern
      const response = await fetch(`${apiUrl}/users/update/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lookingFor: [
              ...(user.lookingFor || []),
              { type, size: finalSize, gender: productGender }
          ]
        })
      });

      if (response.ok) {
        onAdd({ type, size: finalSize, gender: productGender });
        // Reset form
        setType('');
        setProductGender('');
        setProductSizeShoe('');
        setProductSizes('');
        setProductSizePantsWaist('');
        setProductSizePantsInseam('');
        setSnackbarSeverity('success');
        setSnackbarMessage('Item added successfully!');
        setSnackbarOpen(true);
        setTimeout(() => onClose(), 1000);
      } else {
        console.error('Failed to add item:', response.statusText);
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to add item');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error adding item');
      setSnackbarOpen(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add the item you&apos;re looking for</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth variant="filled">
              <InputLabel>Product Type</InputLabel>
              <Select
                value={type}
                label="Product Type"
                onChange={(e) => setType(e.target.value)}
                required
              >
                {Object.values(ProductTypeList).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {type && (
              <FormControl fullWidth variant="filled">
                <InputLabel>Gender</InputLabel>
                <Select
                  value={productGender}
                  label="Gender"
                  onChange={(e) => setProductGender(e.target.value)}
                  required
                >
                  <MenuItem value="">{"-"}</MenuItem>
                  {Object.values(ProductGenderList).map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {type === "Shoes" && (
              <FormControl fullWidth variant="filled">
                <InputLabel>Shoe Size</InputLabel>
                <Select
                  value={productSizeShoe}
                  label="Shoe Size"
                  onChange={(e) => setProductSizeShoe(e.target.value)}
                  required
                >
                  <MenuItem value="">{"-"}</MenuItem>
                  {Object.values(ProductSizeShoeList).map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {type === "Pants" && (
              <>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Waist Size</InputLabel>
                  <Select
                    value={productSizePantsWaist}
                    label="Waist Size"
                    onChange={(e) => setProductSizePantsWaist(e.target.value)}
                    required
                  >
                    <MenuItem value="">{"-"}</MenuItem>
                  {Object.values(ProductSizePantsWaistList).map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth variant="filled">
                  <InputLabel>Inseam Size</InputLabel>
                  <Select
                    value={productSizePantsInseam}
                    label="Inseam Size"
                    onChange={(e) => setProductSizePantsInseam(e.target.value)}
                    required
                  >
                    <MenuItem value="">{"-"}</MenuItem>
                    {Object.values(ProductSizePantsInseamList).map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </>
            )}

            {!notSizeApplicable.includes(type) && (
              <FormControl fullWidth variant="filled">
                <InputLabel>Size</InputLabel>
                <Select
                  value={productSizes}
                  label="Size"
                  onChange={(e) => setProductSizes(e.target.value)}
                  required
                >
                  <MenuItem value="">{"-"}</MenuItem>
                  {Object.values(ProductSizesList).map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Add Item
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </form>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default AddLookingForDialog;