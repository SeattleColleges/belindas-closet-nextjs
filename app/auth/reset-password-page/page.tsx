"use client";
import Image from "next/image";
import logo from "@/app/logo.png";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  // destructure password from password state
  const { newPassword, confirmPassword } = password;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // handle toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handle toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // handle change event
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  // handle submit event
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // prevent the default behavior
    e.preventDefault();

    // Check if password and confirmPassword match
    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    // send request to backend api then log the response
    // TODO: send request to backend api then log the response
    const res = await fetch("localhost:3000/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(password),
      headers: {
        "Content-type": "application/json",
      },
    });
    try {
      const data = await res.json();
      console.log(data);
      alert("Password reset successful");
    } catch (error) {
      console.error("Error parson JSON response:", error);
    }
  };

  return (
    <Paper elevation={6} sx={{ width: "100%", maxWidth: 400, padding: 3 }}>
      <Container
        disableGutters
        fixed
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={logo}
          alt="logo"
          style={{ width: 50, height: 50, marginBottom: 10 }}
        />
      </Container>
      <Typography
        component="h1"
        variant="h5"
        textAlign="center"
        sx={{ mb: 2 }}
      >
        Reset Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          sx={{ mb: 2 }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="newPassword"
          label="New Password"
          name="newPassword"
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ mb: 2 }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset Password
        </Button>
      </Box>
    </Paper>
  );
};
export default ResetPasswordPage;
