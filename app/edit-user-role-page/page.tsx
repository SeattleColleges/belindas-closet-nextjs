"use client";
import React, { useState, useEffect } from "react";
import UserCard from "../../components/UserCard";
import {Box, Stack, Grid, TextField, Typography, Container, useTheme} from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import Sidebar from "@/components/Sidebar";

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
  const theme = useTheme();

  useEffect(() => {
    const userToken: JWToken = localStorage.getItem("token")
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
    fetchUser(setUserInfo, userToken);
  }, []);

  if ((userRole === "admin")) {
    return (
      <Box sx={{ 
        display: "flex", 
        minHeight: "100vh",
        margin: "-1rem",
        flexDirection: { xs: 'column', sm: 'row' },
      }}>
        <Sidebar />
        <Box sx={{ 
          flexGrow: 1,
          mt: { xs: '3rem', sm: 0 },
        }}>
          <Container sx={{ py: 4 }} maxWidth="lg">
            <Stack spacing={3}>
              <Typography component="h1" variant="h4" textAlign={"center"}>
                User Management
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={6} md={3} style={{ marginLeft: "2rem", marginRight: "2rem" }}>
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    fullWidth
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.divider,
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                        '&.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      },
                      '& .MuiInputBase-input': {
                        color: theme.palette.text.primary,
                      },
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={12} md={12}>
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    flexWrap: "wrap",
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                  }}>
                    {userInfo.filter(item => {
                      const searchLower = search.toLowerCase();
                      return (
                        (item.firstName.toLowerCase() + " " + item.lastName.toLowerCase()).includes(searchLower) ||
                        item.email.toLowerCase().includes(searchLower) ||
                        item.role.toLowerCase().includes(searchLower)
                      );
                    }).map((user, index) => (
                      <UserCard user={user} key={index} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </Box>
      </Box>
    );
  } else {
    return <UnauthorizedPageMessage />
  }
};

export default EditUserRolePage;
