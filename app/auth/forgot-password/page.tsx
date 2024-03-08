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
    <Container fixed maxWidth="lg" sx={{display: "flex", justifyContent: "center", alignItems: "center", bgcolor: '#12202d'}}>

      <Paper
        elevation={4}
        sx={{
          padding: "20px",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2em",
          marginBottom: "2em"
        }}
      >

      <Box  
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%"}}>

          <Typography variant='h3' sx={{ fontFamily: 'Roboto, Helvetic, Arialsans-serif',fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '1rem', color: 'black'}}>
          Forgot Password
          </Typography>

          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Button component='a' type="submit" variant="outlined" sx={{marginLeft: "1em",borderColor: "black"}}>
            Submit
          </Button>
      </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;