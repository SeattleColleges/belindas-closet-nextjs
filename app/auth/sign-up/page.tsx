"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import Image from "next/image";
import mascot from "@/public/belinda-images/nsc_mascot_green_cropped.png";
import { Link as MuiLink } from "@mui/material";
import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";
import { useRouter } from "next/navigation";
// Check env.local file to update API address
const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
if (URL?.includes('localhost')) {
  console.log('Dev API Address: ',URL)
}

const SignUp = () => {
  // handling user's incoming info
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    pronoun: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  // Set initial state for errors and success
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // destructure user's info
  const { firstName, lastName, pronoun, email, password, confirmPassword } = userInfo;

  // State to track whether the password is visible or not
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // route to sign in page
  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    // updating user's info
    setUserInfo({ ...userInfo, [name]: value });
  };

  // handle submit only fires when user clicks sign up
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // prevent the default behavior
    e.preventDefault();

    // Check if inputs are empty
    if (!firstName || !lastName || !pronoun ||!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Check if password is less than 6 characters
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email");
      return;
    }

    // send request to backend api then log the response
    // hardwired link for local development, change port if needed
    try {
      const res = await fetch(`${URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) {
        const { message } = await res.json();
        setError(message);
        setSuccess("");
        return;
      }
      setError("");
      setSuccess("Sign up successful!");
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Stack spacing={{ xs: "-6px", sm: "-6px" }} alignItems="center">
      <Image
        src={mascot}
        alt="logo"
        style={{ 
          width: isMobile ? 150 : isTablet ? 160 : 200, 
          height: isMobile ? 75 : isTablet ? 80 : 100, 
          zIndex: 0, 
          marginTop: 15, 
          marginBottom: isMobile ? 1.5 : 1 
        }}
      />
      <Paper
        elevation={4}
        sx={{
          padding: "20px",
          width: isMobile ? "280px ": "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            sx={{ mb: isMobile ? 1 : 2 }}
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="fname"
            autoFocus
            value={firstName}
            onChange={handleChange}
          />
          <TextField
            sx={{ mb: isMobile ? 1 : 2 }}
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            value={lastName}
            onChange={handleChange}
            autoFocus={false}
          />
          <TextField
            sx={{ mb: isMobile ? 1 : 2 }}
            margin="normal"
            required
            fullWidth
            id="pronoun"
            label="Pronouns"
            name="pronoun"
            autoComplete="pronoun"
            value={pronoun}
            onChange={handleChange}
            autoFocus={false}
          />
          <TextField
            sx={{ mb: isMobile ? 1 : 2 }}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleChange}
            type="email"
            autoFocus={false}
          />
          <TextField
            sx={{ mb: isMobile ? 1 : 2 }}
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="password"
            value={password}
            onChange={handleChange}
            autoFocus={false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{ mb: isMobile ? 1 : 2 }}
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="confirm-password"
            value={confirmPassword}
            onChange={handleChange}
            autoFocus={false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && <ErrorAlert message={error} />}
          {success && <SuccessAlert message={success} />}
          <Button
            style={{ textTransform: "none" }}
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: isMobile ? 2: 3, mb: isMobile ? 1: 2 }}
          >
            Sign Up
          </Button>
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <MuiLink href="/auth/sign-in" variant="body2">
                {"Sign In"}
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
};

export default SignUp;
