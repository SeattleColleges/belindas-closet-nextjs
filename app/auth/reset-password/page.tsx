"use client";
import Image from "next/image";
import logo from "@/public/belinda-images/logo.png";
import { ChangeEventHandler, FormEventHandler, useState, useEffect } from "react";
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
import { useSearchParams, useRouter } from "next/navigation";

const URL = process.env.NEXT_PUBLIC_API_URL;

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // destructure password from password state
  const { newPassword, confirmPassword } = password;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Get token from URL query parameters
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      // No token found in URL, show error
      setError("Invalid or missing reset token. Please request a new password reset link.");
    }
  }, [searchParams]);

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

    // Reset states
    setError(null);
    setMessage(null);
    setLoading(true);

    // Check if password and confirmPassword match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Check if password is at least 8 characters
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      // Send request to backend API
      const response = await fetch(`${URL}/auth/reset-password?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setMessage(data.message || "Password reset successful");

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 3000);
    } catch (err) {
      console.error("Error resetting password:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
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
        <Image src={logo} alt="logo" style={{ width: 50, height: 50, marginBottom: 10 }} />
      </Container>
      <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: 2 }}>
        Reset Password
      </Typography>

      {message && (
        <Alert severity="success" sx={{ width: "100%", mt: 2, mb: 2 }}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ width: "100%", mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {!message && !error && (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            disabled={loading || !token}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility}>
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
            disabled={loading || !token}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle confirm password visibility" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" disabled={loading || !token} sx={{ mt: 3, mb: 2 }}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
          </Button>
        </Box>
      )}

      {error === "Invalid or missing reset token. Please request a new password reset link." && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button color="primary" onClick={() => router.push("/forgot-password")}>
            Request New Reset Link
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ResetPasswordPage;
