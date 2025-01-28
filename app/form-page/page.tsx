'use client';
import { useState } from 'react';
import { Typography, Box, TextField, Button } from "@mui/material";
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  gender: string;
  email: string;
  size: string;
}

const FormPage = () => {
  const [errors, setErrors] = useState({} as Record<keyof FormData, boolean>);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    email: '',
    size: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Regex for most valid email addresses.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //check if form fields are empty
    const newErrors = {
      name: formData.name.trim() === '',
      gender: formData.gender.trim() === '',
      email: formData.email.trim() === '',
      size: formData.size.trim() === '',
      emailFormat: !emailRegex.test(formData.email),
    };

    setErrors(newErrors);

    // If there are any errors, show an alert and stop the form submission
    if (newErrors.name || newErrors.gender || newErrors.email || newErrors.size) {
      alert('Please fill out all required fields.');
      return;
    }

    if (newErrors.emailFormat) {
      alert('Please enter a valid email address.');
      return;
    }

    //send the email if validation is successful
    emailjs.sendForm('service_tcqmiub', 'template_umbo1q7', e.target as HTMLFormElement, 'iHLRPRzpKKnhc1Mlr')
      .then((result) => {
        alert('Form submitted successfully!');
        setFormData({
          name: '',
          gender: '',
          email: '',
          size: '',
        }); // Clear the form
      }, (error) => {
        alert('Error submitting form. Please try again.');
        console.error(error.text);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h1" align="center">Belinda&apos;s Closet Student Form</Typography>
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
            Send Message
          </Button>
          <Typography variant="body1" paragraph sx={{ textAlign: 'left' }}>
            Email: edi.north@seattlecolleges.edu<br></br>
            Phone: (206) 934-3719
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FormPage;