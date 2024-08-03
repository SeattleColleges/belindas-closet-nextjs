"use client";
import { Typography, Box, Stack, Button } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import Image from "next/image";
import header_logo from "@/public/belinda-images/nsc_mascot.png";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";

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

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);

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


  const handleListItemClick = (index: SetStateAction<number>) => {
    setSelectedItem(index);
  };

  const sideContent = (
      <Box 
        sx={{ 
          width: "20%",
          position: "fixed", 
          left: 0, 
          backgroundColor: "white", 
          border: "1px solid black" , 
          borderRadius: "8px", 
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          ml: 2,
          mr: 2
        }}>
      <Stack alignItems="center">
          <Image
            src={header_logo}
            alt="logo"
            style={{ 
              width: 280, 
              height: 140, 
              zIndex: 0, 
              marginTop: 15, 
              marginBottom: 8
            }}
          />
          <Box sx={{  }}>
            <Typography component="h1" sx={{ mb: 10, fontSize: "1.1rem", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
              Hello, { userInfo?.firstName }
            </Typography>
            <Button
            fullWidth
            onClick={() => handleListItemClick(0)}
            sx={{
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: selectedItem === 0 ? "#8BC751" : "white",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              mb: 5 
            }}
            >
              Activity
            </Button>
            <Button
              fullWidth
              onClick={() => handleListItemClick(1)}
              sx={{
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: selectedItem === 1 ? "#8BC751" : "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                mb: 5 
              }}
            >
              History
            </Button>
            <Button
              fullWidth
              onClick={() => handleListItemClick(2)}
              sx={{
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: selectedItem === 2 ? "#8BC751" : "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                mb: 5 
              }}
            >
              Week Activity
            </Button>
            <Button
              fullWidth
              onClick={() => handleListItemClick(3)}
              sx={{
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: selectedItem === 3 ? "#8BC751" : "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                mb: 5 
              }}
            >
              Statistics
            </Button>
            <Button
              fullWidth
              onClick={() => handleListItemClick(4)}
              sx={{
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: selectedItem === 4 ? "#8BC751" : "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                mb: 5 
              }}
            >
              Activity
            </Button>
            <Button
              fullWidth
              onClick={() => handleListItemClick(5)}
              sx={{
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: selectedItem === 5 ? "#8BC751" : "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                mb: 6
              }}
            >
              Activity
            </Button>
          </Box>
        </Stack>
      </Box>
  );

  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  if ((userRole === "admin" || userRole === "creator")) {
    return (
      <div>
        <Box sx={{ display: "flex" }}>
          {sideContent}
        </Box>
        {/* Add your dashboard content here */}
      </div>
    );
  } else {
    return <UnauthorizedPageMessage />;
  };
};

export default Dashboard;