"use client";

import { useState } from 'react';
import { Typography, Box, TextField, Button } from "@mui/material";
import emailjs from 'emailjs-com';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
    emailFormat: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Regex for most valid email addresses.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //check if form fields are empty
    const newErrors = {
      name: formData.name.trim() === '',
      email: formData.email.trim() === '',
      message: formData.message.trim() === '',
      emailFormat: !emailRegex.test(formData.email),
    };

    setErrors(newErrors);

        // If there are any errors, show an alert and stop the form submission
        if (newErrors.name || newErrors.email || newErrors.message) {
          alert('Please fill out all required fields.');
          return;
      }

        if (newErrors.emailFormat){
          alert('Please enter a valid email address.');
          return;
        }

    //send the email if validation is successful
    emailjs.sendForm('service_tcqmiub', 'template_umbo1q7', e.target as HTMLFormElement, 'iHLRPRzpKKnhc1Mlr')
      .then((result) => {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          business: '',
          message: '',
        }); // Clear the form
      }, (error) => {
        alert('Error sending message. Please try again.');
        console.error(error.text);
      });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, mt: 3 }}>
        <Typography component="h1" variant="h3" gutterBottom>
          Contact Us
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: '500px', maxWidth: '40%' }}>
          <Typography component="h2" variant="h5" gutterBottom sx={{ textAlign: 'left' }}>
            Get in Touch With Us
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              variant="outlined"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Business (optional)"
              variant="outlined"
              name="business"
              value={formData.business}
              onChange={handleChange}
            />
            <TextField
              label="Message"
              variant="outlined"
              required
              multiline
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
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
        <Box sx={{ flex: 2, minWidth: '550px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
          <Box sx={{ width: '100%', maxWidth: '800px', height: '100%', maxHeight: '600px' }}>
            <iframe
              title="contact-page-map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10741.007374849207!2d-122.3326717!3d47.6989479!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490140175955555%3A0x59c4d51ad68ba97!2sNorth%20Seattle%20College!5e0!3m2!1sen!2sus&hl=en"
              width="100%"
              height="400"
              allowFullScreen
              loading="lazy"
              style={{ border: "none" }}
              referrerPolicy="no-referrer-when-downgrade"
              id={"contact-page-map"}
            ></iframe>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
