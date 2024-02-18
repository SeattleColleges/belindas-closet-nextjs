"use client";
import InputField from "@/components/InputFields";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from './signup-page.module.css';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {IconButton, InputAdornment, TextField} from "@mui/material";
const SignUp = () => {
  // handling user's incoming info
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "creator",
  });
  // Set initial state for errors
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
  const { firstName, lastName, email, password, confirmPassword } = userInfo;

  // State to track whether the password is visible or not
 const [showPassword, setShowPassword] = useState(false);

 // Function to toggle password visibility
 const togglePasswordVisibility = () => {
   setShowPassword(!showPassword);
 };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    // updating user's info 
    setUserInfo({ ...userInfo, [name]: value });
  };

  // handle submit only fires when user clicks sign up
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // prevent the default behavior
    e.preventDefault();

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return;
  }
  
    // send request to backend api then log the response
    // hardwired link for local development, change port if needed
    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json"
      }
    });
    try {
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error parson JSON response:", error);
    }

    // temporary alert for testing
    if (res.ok) alert('sign up was successful')

  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign Up</h1>
        <TextField
            fullWidth
            margin="normal"
          label="First Name"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        <TextField
            fullWidth
            margin="normal"
          label="Last Name"
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
        <TextField
            fullWidth
            margin="normal"
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      {/* Password input with toggle button */}
          <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          {/* Toggle button to control password visibility */}
                          <IconButton
                              onClick={togglePasswordVisibility}
                          >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      </InputAdornment>
                  ),
              }}
          />
          {/* Confirm Password input with toggle button */}
          <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                          {/* Toggle button to control password visibility */}
                          <IconButton
                              onClick={togglePasswordVisibility}
                          >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                      </InputAdornment>
                  ),
              }}
          />
        {/*<button*/}
        {/*  type="button"*/}
        {/*  onClick={togglePasswordVisibility}*/}
        {/*  className={styles.toggleButton}*/}
        {/*>*/}
        {/*  {showPassword ? "Hide Password" : "Show Password"}*/}
        {/*</button>*/}
        <button className={styles.submitButton} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
  
};

export default SignUp;