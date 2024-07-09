"use client";
import Image from "next/image";
import logo from "@/public/belinda-images/logo.png";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";
import { useRouter } from "next/navigation";
// WARNING: You won't be able to connect to local backend unless you remove the env variable below.
const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";

const ChangePasswordPage = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // destructure password from password state
  const { currentPassword, newPassword, confirmPassword } = password;

  // state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // state for error and loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // handle toggle password visibility
  const toggleCurrentPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handle toggle confirm password visibility
  const toggleNewPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // router
  const router = useRouter();

  // handle change event
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  // handle submit event
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoading(true);
    setError("");
    setSuccess("");

    // prevent the default behavior
    e.preventDefault();

    // Check if currentPassword, newPassword and confirmPassword are empty
    if (!password.currentPassword || !newPassword || !confirmPassword) {
      setError("Please enter all fields");
      return;
    }

    // Check if currentPassword the same as newPassword
    if (currentPassword === newPassword) {
      setError("New password cannot be the same as the current password");
      return;
    }

    // Check if password and confirmPassword match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if password is less than 8 characters
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
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
      const res = await fetch(`${URL}/auth/change-password`, {
        method: "POST",
        body: JSON.stringify(password),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = await res.json();
      if (!res.ok) {
        setError(message);
        setSuccess("");
        return;
      }
      setError("");
      //set delay to show success message
      setSuccess(message);
      setTimeout(() => {
        router.push("/auth/sign-in");
      }, 3000);
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <CircularProgress />;
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Paper elevation={6} sx={{ width: isMobile ? "280px" : "400px", maxWidth: 400, padding: 3, mt: 3 }}>
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
          style={{ width: 65, height: 50, marginBottom: 15 }}
        />
      </Container>
      <Typography component="h1" variant="h5" textAlign="center" sx={{ mb: 2 }}>
        Change Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          sx={{ mb: isMobile ? 1: 2 }}
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth
          id="currentPassword"
          label="Current Password"
          name="currentPassword"
          type={showPassword ? "text" : "password"}
          value={password.currentPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleCurrentPasswordVisibility}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ mb: isMobile ? 1: 2 }}
          variant="outlined"
          margin="normal"
          required={true}
          fullWidth
          id="newPassword"
          label="New Password"
          name="newPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={password.newPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleNewPasswordVisibility}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ mb: isMobile ? 1: 2 }}
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
                  onClick={toggleNewPasswordVisibility}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <ErrorAlert message={error} />}
        {success && <SuccessAlert message={success} />}
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
  );
};
export default ChangePasswordPage;
