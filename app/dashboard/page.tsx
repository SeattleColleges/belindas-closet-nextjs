"use client";
import { Box, Button, IconButton, Collapse, Divider, useMediaQuery, useTheme } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import WeeklyActivity from "@/app/dashboard/weeklyActivity/page";
import Image from "next/image";
import header_logo from "@/public/belinda-images/nsc_mascot.png";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  const [selectedItem, setSelectedItem] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    if (isMobile) {
      setNavOpen(false);
    }
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // Menu items array to avoid repetition
  const menuItems = [
    { label: "Activity", index: 0 },
    { label: "History", index: 1 },
    { label: "Week Activity", index: 2 },
    { label: "Statistics", index: 3 },
    { label: "Activity", index: 4 },
    { label: "Activity", index: 5 },
  ];

  const navigationBar = (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.default",
        zIndex: 1000,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
      }}
    >
      {/* Central Logo Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          padding: "8px 16px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
          position: "relative",
        }}
      >
        <Image
          src={header_logo}
          alt="Tree Frogs logo"
          style={{
            width: 80,
            height: 60,
            objectFit: "contain",
          }}
        />
        <IconButton
          onClick={toggleNav}
          size="small"
          sx={{
            mt: 0.5,
            backgroundColor: "#8BC751",
            color: "white",
            width: 24,
            height: 24,
            "&:hover": {
              backgroundColor: "#7ab643",
            },
          }}
        >
          {navOpen ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
        </IconButton>
      </Box>

      {/* Collapsible navigation menu */}
      <Collapse in={navOpen} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            p: 1,
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.default",
          }}
        >
          {menuItems.map((item, idx) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => handleListItemClick(item.index)}
                sx={{
                  color: "text.primary",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: selectedItem === item.index ? "#8BC751" : "transparent",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                  py: 1,
                  px: 2,
                  borderRadius: "4px",
                  flex: isMobile ? 1 : "unset",
                  width: isMobile ? "100%" : "auto",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: selectedItem === item.index ? "#8BC751" : "background.default",
                  },
                }}
              >
                {item.label}
              </Button>
              {!isMobile && idx < menuItems.length - 1 && <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />}
            </Box>
          ))}
        </Box>
      </Collapse>
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
          {navigationBar}
        </Box>
      </div>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};

export default Dashboard;
