"use client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
// import styles from "./forgot-password-page.module.css";
import { Container, Typography, Link, Button, Box, TextField, Paper } from '@mui/material';

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
    <Container 
      fixed 
      maxWidth="lg" 
      sx={{
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        bgcolor: '#12202d', 
        height: "100vh",
        flexDirection: "column"
      }}>

      <Paper
        elevation={4}
        sx={{
          padding: "20px",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>

      <Box  
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%"}}>

          

          <TextField
            margin="normal"
            required
            fullWidth
            variant="outlined"
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Button 
            style={{ textTransform: "none" }}
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
      </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;