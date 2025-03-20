import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from "@mui/material";
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
  degreeType?: string;
  major?: string;
  graduationMonth?: string;
  graduationYear?: number;
}

const degreeTypes = [
  "Associate's",
  "Bachelor's",
  "Certificate",
  "Other"
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const EditUserDetailsDialog: React.FC<EditUserDetailsDialogProps> = ({ open, onClose, user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [pronoun, setPronoun] = useState(user.pronoun);
  const [degreeType, setDegreeType] = useState(user.degreeType || '');
  const [major, setMajor] = useState(user.major || '');
  const [graduationMonth, setGraduationMonth] = useState(user.graduationMonth || '');
  const [graduationYear, setGraduationYear] = useState(user.graduationYear || '');
  const [isUpdated, setIsUpdated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    if (open) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPronoun(user.pronoun);
      setDegreeType(user.degreeType || '');
      setMajor(user.major || '');
      setGraduationMonth(user.graduationMonth || '');
      setGraduationYear(user.graduationYear || '');
      setIsUpdated(false);
    }
  }, [open, user]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string, initialValue: string) => {
    setter(value);
    setIsUpdated(true);
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
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          pronoun,
          degreeType,
          major,
          graduationMonth,
          graduationYear
        })
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

  // Generate year options (current year to 10 years in the future)
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 11}, (_, i) => currentYear + i);

  return (
    <>
      <Dialog open={open} onClose={() => onClose()} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => handleInputChange(setFirstName, e.target.value, user.firstName)}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => handleInputChange(setLastName, e.target.value, user.lastName)}
            />
            <TextField
              fullWidth
              label="Pronouns"
              value={pronoun}
              onChange={(e) => handleInputChange(setPronoun, e.target.value, user.pronoun)}
            />

            <FormControl fullWidth>
              <InputLabel>Degree Type</InputLabel>
              <Select
                value={degreeType}
                label="Degree Type"
                onChange={(e) => handleInputChange(setDegreeType, e.target.value, user.degreeType || '')}
              >
                <MenuItem value="">{"-"}</MenuItem>
                {degreeTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Major"
              value={major}
              onChange={(e) => handleInputChange(setMajor, e.target.value, user.major || '')}
              placeholder="e.g. Computer Science"
            />

            <FormControl fullWidth>
              <InputLabel>Graduation Month</InputLabel>
              <Select
                value={graduationMonth}
                label="Graduation Month"
                onChange={(e) => handleInputChange(setGraduationMonth, e.target.value, user.graduationMonth || '')}
              >
                <MenuItem value="">{"-"}</MenuItem>
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Graduation Year</InputLabel>
              <Select
                value={graduationYear}
                label="Graduation Year"
                onChange={(e) => handleInputChange(setGraduationYear, e.target.value, user.graduationYear || '')}
              >
                <MenuItem value="">{"-"}</MenuItem>
                {years.map((year) => (
                  <MenuItem key={year} value={year.toString()}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={handleSave} disabled={!isUpdated}>Save</Button>
        </DialogActions>
      </Dialog>
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
    </>
  );
};

export default EditUserDetailsDialog;