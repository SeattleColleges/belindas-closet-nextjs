"use client";
import Image from "next/image";
import logo from "@/app/logo.png";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const ChangePasswordPage = () => {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  // destructure password from password state
  const { newPassword, confirmPassword } = password;

  // state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // state for error and loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

    // Check if newPassword and confirmPassword are empty
    if (!newPassword || !confirmPassword) {
      setError("Please enter a new password and confirm password");
      return;
    }

    // Check if password and confirmPassword match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // token after login
    const token = localStorage.getItem("token") || null;

    // Check if token is not available
    if (!token) {
      setError("Please login to change password");
      return;
    }

    // Fetch reset password
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:3000/api/auth/change-password",
        {
          method: "POST",
          body: JSON.stringify({
            newPassword,
            confirmPassword,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        setError(error || "Failed to change password");
        setSuccess("");
      } else {
        // reset the form
        setPassword({ newPassword: "", confirmPassword: "" });
        setSuccess("Password changed successfully");
        setError("");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Failed to change password");
      setLoading(false);
      setSuccess("");
    } finally {
      setLoading(false);
    }    
  };

  if (loading) {
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#12202d",
        height: "100vh",
        flexDirection: "column",
      }}
    >
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
          Change Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 2 }}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            value={password.newPassword}
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
            required={true}
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={password.confirmPassword}
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
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default ChangePasswordPage;
