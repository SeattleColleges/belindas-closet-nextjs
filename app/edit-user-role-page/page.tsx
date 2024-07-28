"use client";
import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard";
import { Stack, Typography } from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
// WARNING: You won't be able to connect to local backend unless you remove the env variable below.
const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";

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
type JWToken = string | null
/**
 * fetch user info from the server
 * @param setUserInfo
 * JWT token for user authentication
 * @param userToken
 */
async function fetchUser(setUserInfo: (userInfo: User[]) => void, userToken: JWToken) {
  const apiUrl = `${URL}/user`;
  try {
    if (!userToken) {
      throw new Error('JWT token not found in storage')
    }
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      setUserInfo(data);
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
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userToken:JWToken = localStorage.getItem("token")
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
    fetchUser(setUserInfo,userToken);
  }, []);

  if ((userRole === "admin")) {
    return (
      <Stack alignItems="center" spacing={3} sx={{ mt: 3 }}>
        <Typography component="h1" variant="h4">
          User Management
        </Typography>
        {userInfo.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </Stack>
    );
  } else {
    return <UnauthorizedPageMessage />
  }
};

export default EditUserRolePage;
