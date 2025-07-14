"use client";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import WeeklyActivity from "@/app/dashboard/weeklyActivity/page";
import DashboardNavbar from "@/components/DashboardNavbar";

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

type JWToken = string | null;

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
      throw new Error("JWT token not found in storage");
    }
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
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
  const [selectedItemId, setSelectedItemId] = useState<string>("activity");
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [userRole, setUserRole] = useState("");

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userRole = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(userRole);
    }
  }, []);

  const menuItems = [
    { id: "activity-1", label: "Activity" },
    { id: "history", label: "History" },
    { id: "week-activity", label: "Week Activity" },
    { id: "statistics", label: "Statistics" },
    { id: "activity-2", label: "Activity" },
    { id: "activity-3", label: "Activity" },
  ];

  const handleListItemClick = (id: string) => {
    setSelectedItemId(id);
  };

  if (userRole === "admin" || userRole === "creator") {
    return (
      <div>
        {/* Add your dashboard content here */}
        <Box sx={{ pb: 2 }}>
          <WeeklyActivity />
        </Box>

        {/* Center navigation between content and footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            my: 5,
          }}
        >
          <DashboardNavbar
            user={userInfo}
            menuItems={menuItems}
            selectedItemId={selectedItemId}
            onItemSelect={handleListItemClick}
          />
        </Box>
      </div>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};

export default Dashboard;
