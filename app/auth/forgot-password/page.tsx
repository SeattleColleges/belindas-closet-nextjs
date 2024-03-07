"use client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
// import styles from "./forgot-password-page.module.css";
import { Container, Typography, Link, Button, Box, TextField } from '@mui/material';

const ForgotPassword = () => {
  
  // user email state
  const [userEmail, setUserEmail] = useState({ email: "" });
  
  // destructure email from userEmail state
  const { email } = userEmail;

  // handle change event
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setUserEmail({ ...userEmail, [name]: value });
  };
  
  // handle submit event
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

  // TODO: send email to user with reset password link
  };

  return (
    <Container fixed maxWidth="lg" sx={{display: "flex", justifyContent: "center", alignItems: "center", bgcolor: '#12202d'}}>

      <Box  
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}>

          <Typography variant='h3' sx={{fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1rem', color: '#101c29'}}>
          Forgot Password
          </Typography>

          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Button component='a' type="submit" variant="outlined">
            Submit
          </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;