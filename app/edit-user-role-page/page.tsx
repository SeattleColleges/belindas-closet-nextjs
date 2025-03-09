"use client";
import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard";
import {Box, Stack, TextField, Typography} from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import Grid from "@mui/material/Grid";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

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
  const [search, setSearch] = useState<String>("");

  useEffect(() => {
    const userToken: JWToken = localStorage.getItem("token")
    const token = localStorage.getItem("token");
    // remove later
    console.log(token);
    //
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
    fetchUser(setUserInfo, userToken);
  }, []);

  if ((userRole === "admin")) {
    return (
      <Stack spacing={3} sx={{ mt: 3 }}>
        <Typography component="h1" variant="h4" textAlign={"center"}>
          User Management
        </Typography>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              sx={{ background: "white", marginLeft: 2 }}
              onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Box sx={{ display: "flex" }}>
          {userInfo.filter(item => {
            const searchLower = search.toLowerCase();
            return (
                (item.firstName.toLowerCase() + " " +
                item.lastName.toLowerCase()).includes(searchLower) ||
                item.email.toLowerCase().includes(searchLower) ||
                item.role.toLowerCase().includes(searchLower)
            );
          }).map((user, index) => (
            <UserCard user={user} key={index} />
          ))}
        </Box>
      </Stack>
    );
  } else {
    return <UnauthorizedPageMessage />
  }
};

export default EditUserRolePage;
