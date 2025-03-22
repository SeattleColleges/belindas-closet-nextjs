"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Typography, Paper, IconButton, Avatar } from "@mui/material";
import EditUserDetailsDialog from "@/components/EditUserDetailsDialog";
import { useRouter } from "next/navigation";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import AddIcon from '@mui/icons-material/Add';
import AddLookingForDialog from '@/components/AddLookingForDialog';

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

interface LookingForItem {
  type: string;
  size: string;
  gender: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pronoun: string;
  degreeType?: string;
  major?: string;
  graduationMonth?: string;
  graduationYear?: string;
  lookingFor?: LookingForItem[];
}

type JWToken = string | null;

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

const Profile = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const router = useRouter();

  const handleEditClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (updatedUser?: User) => {
    setOpenDialog(false);
    if (updatedUser) {
      setUserInfo(prevUserInfo => ({ ...prevUserInfo, ...updatedUser }));
    }
  };

  const handleAddItem = (newItem: LookingForItem) => {
    if (userInfo) {
      const updatedLookingFor = [...(userInfo.lookingFor || []), newItem];
      setUserInfo({
        ...userInfo,
        lookingFor: updatedLookingFor
      });
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
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "2rem",
          width: "100%",
          marginBottom: "2rem"
        }}>
          <Avatar 
            sx={{ 
              width: 200, 
              height: 200,
              bgcolor: "#114fa3"
            }}
          >
            {userInfo?.firstName?.[0]}{userInfo?.lastName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
              {userInfo?.firstName} {userInfo?.lastName}
              {userInfo?.pronoun && (<Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                ({userInfo?.pronoun})
              </Typography>) }
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {userInfo?.degreeType} {userInfo?.major ? <> - {userInfo?.major} </> : <> program </>}
            </Typography>
            {userInfo?.graduationYear && (<Typography variant="body1" color="text.secondary">
              Graduating {userInfo?.graduationMonth}, {userInfo?.graduationYear}
            </Typography>)}
          </Box>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            marginBottom: "1rem"
          }}>
            <Typography variant="h6">Currently looking for:</Typography>
            <IconButton onClick={() => setOpenAddDialog(true)}>
              <AddIcon />
            </IconButton>
          </Box>

          <Stack spacing={2}>
            {userInfo?.lookingFor?.length ? userInfo?.lookingFor?.map((item, index) => (
              <Paper
                key={index}
                sx={{ 
                  p: 3,
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {item?.type}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item?.gender} - {item?.size}
                </Typography>
              </Paper>
            )) : <Typography variant="body1" color="text.secondary" sx={{ mt: 15 }}> No current requests </Typography>}
          </Stack>
        </Box>

        {openDialog && userInfo && (
          <EditUserDetailsDialog
            open={openDialog}
            user={userInfo}
            onClose={handleCloseDialog}
          />
        )}

        <AddLookingForDialog
          open={openAddDialog}
          user={userInfo}
          onClose={() => setOpenAddDialog(false)}
          onAdd={handleAddItem}
        />

        <Box sx={{ mt: 3, alignSelf: "center" }}>
          <Button 
            variant="contained" 
            onClick={handleEditClick}
            sx={{ mr: 2 }}
          >
            Edit Profile
          </Button>
          <Button 
            variant="outlined"
            onClick={() => router.replace('/auth/change-password-page')}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};

export default Profile;