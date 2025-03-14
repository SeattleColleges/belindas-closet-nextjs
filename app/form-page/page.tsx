'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { Typography, Box, TextField, Button, Snackbar, Container, MenuItem } from "@mui/material";
import Alert, { AlertColor } from '@mui/material/Alert';

interface FormData {
  name: string;
  gender: string;
  email: string;
  phoneNumber: string;
  referral: string;
  comments: string;
  emailVerified: boolean;
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
    phoneNumber: '',
    referral: '',
    comments: '',
    emailVerified: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const verifyEmail = () => {
    if (emailRegex.test(formData.email)) {
      setFormData((prevData) => ({ ...prevData, emailVerified: true }));
      setSnackbarSeverity('success');
      setSnackbarMessage('Email is in a valid format!');
    } else {
      setFormData((prevData) => ({ ...prevData, emailVerified: false }));
      setSnackbarSeverity('error');
      setSnackbarMessage('Invalid email format. Please enter a valid email.');
    }
    setSnackbarOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      /*
      Check if any field is empty
      ----------------------------
      */
      if (!formData.name || !formData.gender || !formData.email) {
        throw new Error('Please fill in all required fields.');
      }
      /*
      Check if email format is correct
      ---------------------------------
      */
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address.');
      }
      /*
      POST form data
      ---------------
      */
      const response = await fetch('http://localhost:3000/api/submission-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form.');
      }
      /*
      ALERT SUCCESS
      ----------------------------
      */
      setSnackbarSeverity('success');
      setSnackbarMessage('Form successfully submitted!');
      setSnackbarOpen(true);
      // For use in testing form submission
      console.log('Form submitted:', formData);
    } catch (error) {
      /*
      ALERT ERROR
      ----------------------------
      */
      if (error instanceof Error) {
        setSnackbarSeverity('error');
        setSnackbarMessage(error.message);
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" align="center">Belinda&apos;s Closet Student Form</Typography>
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
            select
            type="text"
            name="gender"
            variant='outlined'
            label="Gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Non-Binary/Non-conforming">Non-Binary/Non-conforming</MenuItem>
            <MenuItem value="Prefer not to respond">Prefer not to respond</MenuItem>
          </TextField>
          <TextField
            type="text"
            name="email"
            variant='outlined'
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Button variant="contained" onClick={verifyEmail}>
            Verify Email
          </Button>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <TextField 
            type="text" 
            name="phoneNumber" 
            variant='outlined' 
            label="Phone Number (Optional)" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
          />
          <TextField 
            type="text" 
            name="referral" 
            variant='outlined' 
            label="How did you hear about us? (Optional)" 
            value={formData.referral} 
            onChange={handleChange} 
          />
          <TextField 
            type="text" 
            name="comments" 
            variant='outlined' 
            label="Comments and Suggestions (Optional)" 
            multiline rows={3} 
            value={formData.comments} 
            onChange={handleChange} 
          />
          <Button variant="contained" color="primary" type="submit">
            Submit Form
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Email: edi.north@seattlecolleges.edu<br></br>
            Phone: (206) 934-3719
          </Typography>
        </Box>
      </Box>
    </Container >
  );
};