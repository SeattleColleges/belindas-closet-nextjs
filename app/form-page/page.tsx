'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { Typography, Box, TextField, Button, Snackbar } from "@mui/material";
import Alert, { AlertColor } from '@mui/material/Alert';

interface FormData {
  name: string;
  gender: string;
  email: string;
  size: string;
}

export default function FormPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    email: '',
    size: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*
    Check if any field is empty
    ----------------------------
    */
    if (!formData.name || !formData.gender || !formData.email || !formData.size) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarOpen(true);
      return; // Prevent form submission
    }
    /*
    Check if email format is correct
    ---------------------------------
    */
    else if (!emailRegex.test(formData.email)) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please enter a valid email address.');
      setSnackbarOpen(true);
      return; // Prevent form submission
    }
    /*
    FORM SUCCESSFULLY SUBMITTED
    ----------------------------
    */
    else {
      setSnackbarSeverity('success');
      setSnackbarMessage("Form successfully submitted!");
      setSnackbarOpen(true);
      // For use in testing form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3, gap: 2 }}>
      <Typography variant="h1" align="center">Belinda&apos;s Closet Student Form</Typography>
      <Typography variant="subtitle1" color='red'>* Indicates field is required</Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type="text"
            name="name"
            variant='outlined'
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            name="gender"
            variant='outlined'
            label="Gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            name="email"
            variant='outlined'
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <TextField
            type="text"
            name="size"
            variant='outlined'
            label="Size"
            value={formData.size}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Submit Form
          </Button>
          <Typography variant="body1" paragraph sx={{ textAlign: 'left' }}>
            Email: edi.north@seattlecolleges.edu<br></br>
            Phone: (206) 934-3719
          </Typography>
        </Box>
      </Box>
    </Box >
  );
};