"use client";
import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard";
import { Box, Container, Typography } from "@mui/material";

/**
 * Represents a user.
 */
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
/**
 * fetch user info from the server
 * @param setUserInfo
 */
async function fetchUser(setUserInfo: (userInfo: User[]) => void) {
  const apiUrl = "http://localhost:3000/api/user";
  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      setUserInfo(data);
      console.log(data);
    }
  } catch (error) {
    console.error("Error getting user info:", error);
  }
}

/**
 * Edit user role page
 * @returns
 */
const EditUserRolePage = () => {
  const [userInfo, setUserInfo] = useState<User[]>([]);

  useEffect(() => {
    fetchUser(setUserInfo);
  }, []);

  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#12202d",
      }}
    >
      <Box
        width={800}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={2}
        bgcolor="#293745"
        p={3}
      >
        <Typography component="h1" variant="h4">
          User Management
        </Typography>
        {userInfo.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </Box>
    </Container>
  );
};

export default EditUserRolePage;
