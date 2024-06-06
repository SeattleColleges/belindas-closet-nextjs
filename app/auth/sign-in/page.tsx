"use client";

import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import mascot from "@/public/belinda-images/nsc_mascot_green_cropped.png";
import {
  Stack,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
} from "@mui/material";
// WARNING: You won't be able to connect to local backend unless you remove the env variable below.
const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";

const Signin = () => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const { email, password } = userInfo;

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // Fetch sign in
    const res = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!res.ok) {
      setError("Invalid email or password");
    } else {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      const userRole = JSON.parse(atob(token.split(".")[1])).role; // decode token to get user role
      // Redirect to user page
      if (userRole === "admin") {
        router.push("/admin-page"); // redirect to admin-page which is not created yet
      } else if (userRole === "creator") {
        router.push("/creator-page"); // redirect to creator-page
      } else {
        router.push("/profile"); // TODO: change profile to user-page
      }
    }
    window.location.reload();
  };

  return (
    <Stack spacing={{ xs: "-6px", sm: "-6px" }} alignItems="center">
      <Image
        src={mascot}
        alt="logo"
        style={{ width: 200, height: 100, zIndex: 0 }}
      />
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
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userInfo.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userInfo.password}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}
          <Button
            style={{ textTransform: "none" }}
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box textAlign="center">
            <MuiLink href="/auth/forgot-password" variant="body2">
              Forgot password?
            </MuiLink>
          </Box>
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Don&apos;t have an account?&nbsp;
              <MuiLink href="/auth/sign-up" variant="body2">
                {"Sign Up"}
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Signin;
