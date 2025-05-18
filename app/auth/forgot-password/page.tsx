"use client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import {
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
} from "@mui/material";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

const ForgotPassword = () => {
  // user email state
  const [userEmail, setUserEmail] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // destructure email from userEmail state
  const { email } = userEmail;

  // handle change event
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setUserEmail({ ...userEmail, [name]: value });
  };

  // handle submit event
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Reset states
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      // Send request to backend API
      const response = await fetch(`${URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send password reset email");
      }

      setMessage(data.message || "Password reset email sent. Please check your inbox.");
    } catch (err) {
      console.error("Error in forgot password:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={4}
      sx={{
        padding: "20px",
        width: isMobile ? "280px" : "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 3,
      }}
    >
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>

      {message && (
        <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
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
          disabled={loading}
        />
        <Button
          style={{ textTransform: "none" }}
          color="primary"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ForgotPassword;
