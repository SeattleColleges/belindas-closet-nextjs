import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface EditUserDetailsDialogProps {
  open: boolean;
  onClose: (updatedUser?: User) => void;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pronoun: string;
}

const EditUserDetailsDialog: React.FC<EditUserDetailsDialogProps> = ({ open, onClose, user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [pronoun, setPronoun] = useState(user.pronoun);
  const [isUpdated, setIsUpdated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    if (open) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPronoun(user.pronoun);
        setIsUpdated(false);
    }
  }, [open, user]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string, initialValue: string) => {
    setter(value);
    if (value !== initialValue) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  };

  const handleSave = async () => {
    if (!user || !user.id) {
        setSnackbarSeverity('error');
        setSnackbarMessage('User ID is not defined');
        setSnackbarOpen(true);
        return;
      }
    const token = localStorage.getItem('token');
    try {
      const apiUrl = process.env.NSC_EVENTS_PUBLIC_API_URL || `http://localhost:3000/api`;
      const response = await fetch(`${apiUrl}/user/update/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ firstName, lastName, pronoun })
      });
      console.log(response.body)
      if (response.ok) {
        const updatedUser = await response.json();
        setTimeout(() => onClose(updatedUser), 1000);
        setSnackbarSeverity('success');
        setSnackbarMessage('Profile updated successfully!');
        setSnackbarOpen(true);
      } else {
        console.error('Failed to update profile:', response.statusText);
        setSnackbarSeverity('error');
        setSnackbarMessage('Failed to update profile');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error updating profile');
    }
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog open={open} onClose={() => onClose()}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => handleInputChange(setFirstName, e.target.value, user.firstName)}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => handleInputChange(setLastName, e.target.value, user.lastName)}
            />
            <TextField
              label="Pronouns"
              value={pronoun}
              onChange={(e) => handleInputChange(setPronoun, e.target.value, user.pronoun)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={handleSave} disabled={!isUpdated}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditUserDetailsDialog;