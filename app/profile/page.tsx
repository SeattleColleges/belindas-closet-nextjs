"use client";

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import UserHeader from "@/components/UserHeader";
import UserSideBar from "@/components/UserSideBar";
import UserContent from "@/components/UserContent";
import Sidebar from "@/components/Sidebar";

import { User } from '@/types/user';

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

type JWToken = string | null;

async function fetchUserById(setUserInfo: (userInfo: User) => void, userId: string, userToken: JWToken) {
  // Updated API URL to match the new backend route structure
  const apiUrl = `${URL}/users/find/${userId}`;
  
  try {
    if (!userToken) {
      throw new Error('JWT token not found in storage')
    }
    
    console.log("Fetching user from:", apiUrl);
    
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`,
      },
    });
    
    if (!res.ok) {
      console.error("API error:", res.status, res.statusText);
      throw new Error(res.statusText);
    } else {
      const data = await res.json();
      console.log("User data received:", data);
      setUserInfo(data);
    }
  } catch (error) {
    console.error("Error getting user info:", error);
  }
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<User>();

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
        minHeight: "100vh",
        margin: "-1rem",
        flexDirection: {xs: 'column', sm: 'row'},
      }}>
        <Sidebar/>

        {/* This Box holds the profile components */}
        <Box
          sx={{
            marginTop: {xs: 12, sm: 5},
            width: "100%"
          }}>

          {/* This Box holds the UserContent and UserSideBar components */}
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: 'column', 
              justifyContent: "center", 
              margin:'auto', 
              width: {xs: '85%', sm: '92%'}
            }}>

            <UserHeader 
              firstName={userInfo?.firstName} 
              lastName={userInfo?.lastName} 
              pronouns={userInfo?.pronoun} 
              role = {userInfo?.role}
              />

            <Box 
              sx={{ 
                display: "flex", 
                justifyContent: "flex-start", 
                width: "auto", 
                marginY: '10px', 
                flexDirection: {xs: 'column', sm: 'row'}, 
                }}>
              
              <UserSideBar 
                user = {userInfo}
                onUserUpdate={(updatedUser) => setUserInfo(updatedUser)}
              /> 
              <UserContent 
                user = {userInfo}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};

export default Profile;