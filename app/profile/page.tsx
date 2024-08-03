"use client";

import React, { useState, useEffect } from "react";
import CurrentUserCard from "../../components/CurrentUserCard";
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import EditUserDetailsDialog from "@/components/EditUserDetailsDialog";
import { useRouter } from "next/navigation";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

/**
 * Represents a user.
 */
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    pronoun: string;
  }
  type JWToken = string | null
  /**
   * fetch user info from the server
   * @param setUserInfo
   * JWT token for user authentication
   * @param userToken
   */
  
async function fetchUserById(setUserInfo: (userInfo: User | null) => void, userId: string, userToken: JWToken) {
    const apiUrl = `${URL}/user/${userId}`;
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
 * Profile page
 * @returns
 */
const Profile = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();

  const handleEditClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setOpenDialog(false);
    } else {
      setOpenDialog(true);
      setMenuOpen(true);
    }
  };

  const handleCloseDialog = (updatedUser?: User) => {
    setOpenDialog(false);
    setMenuOpen(false);
    if (updatedUser) {
      setUserInfo(prevUserInfo => ({ ...prevUserInfo, ...updatedUser }));
    }
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      const userToken: JWToken = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (userId) {
        await fetchUserById(setUserInfo, userId, userToken);
      }
    };
    fetchUser();
    }, []);

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  if ((userRole === "admin" || userRole === "creator" || userRole === "user")) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", margin: 'auto', width: isMobile ? '75%' : 'auto' }}>
          <Stack alignItems="center" spacing={3} sx={{ mt: 3, mb: 3 }}>
              <Typography component="h1" variant="h4">
                  Welcome, { userInfo?.firstName }!
              </Typography>
              {userInfo ? (
              <CurrentUserCard user={userInfo} />
              ) : null }
              {openDialog && userInfo && (
              <Box display="flex" justifyContent="center">
                  <EditUserDetailsDialog
                      open={openDialog}
                      user={userInfo}
                      onClose={handleCloseDialog}
                  />
              </Box>
              )}
              <Box p={2} display="flex" flexDirection="column" justifyContent="center">
                  <Button onClick={handleEditClick}>
                      {menuOpen ? "Done" : "Edit Profile"}
                  </Button>
                  <Button onClick={ () => router.replace('/auth/change-password-page') } >
                      Change Password
                  </Button>
              </Box>
          </Stack>
      </Box>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};

export default Profile;