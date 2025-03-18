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
} from '@mui/material';
import {
  ProductTypeList,
  ProductGenderList,
  ProductSizeShoeList,
  ProductSizesList,
  ProductSizePantsWaistList,
  ProductSizePantsInseamList,
} from '@/app/add-product-page/product-prop-list';

interface LookingForItem {
  type: string;
  size: string;
  description: string;
}

interface AddLookingForDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (item: LookingForItem) => void;
}

const AddLookingForDialog = ({ open, onClose, onAdd }: AddLookingForDialogProps) => {
  const [type, setType] = useState('');
  const [productGender, setProductGender] = useState('');
  const [productSizeShoe, setProductSizeShoe] = useState<number | string>('');
  const [productSizes, setProductSizes] = useState('');
  const [productSizePantsWaist, setProductSizePantsWaist] = useState<number | string>('');
  const [productSizePantsInseam, setProductSizePantsInseam] = useState<number | string>('');
  const [description, setDescription] = useState('');

  const notSizeApplicable = ["", "Pants", "Shoes"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalSize = '';
    if (type === 'Shoes' && productSizeShoe) {
      finalSize = `Size ${productSizeShoe}`;
    } else if (type === 'Pants' && productSizePantsWaist && productSizePantsInseam) {
      finalSize = `W${productSizePantsWaist} L${productSizePantsInseam}`;
    } else if (!notSizeApplicable.includes(type) && productSizes) {
      finalSize = productSizes;
    }

    if (type && finalSize && description) {
      onAdd({
        type,
        size: finalSize,
        description
      });
      // Reset form
      setType('');
      setProductGender('');
      setProductSizeShoe('');
      setProductSizes('');
      setProductSizePantsWaist('');
      setProductSizePantsInseam('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Item You're Looking For</DialogTitle>
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
                  {ProductSizeShoeList.map((size) => (
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
                    {ProductSizePantsWaistList.map((size) => (
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
                    {ProductSizePantsInseamList.map((size) => (
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

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Add Item</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddLookingForDialog; 