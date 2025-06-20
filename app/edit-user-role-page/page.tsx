"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Snackbar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormHelperText,
  useMediaQuery,
} from "@mui/material";
import UnauthorizedPageMessage from "@/components/UnauthorizedPageMessage";
import Sidebar from "@/components/Sidebar";
import UserTable from "@/app/edit-user-role-page/components/UserTable";
import { UsersData } from "./models/interface";
import useDebounce from "@/hooks/useDebounce";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;

const EditUserRolePage = () => {
  const [userInfo, setUserInfo] = useState<UsersData>({ data: [], page: 1, total: 0, pages: 0 });
  const [searchParams, setSearchParams] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [userRole, setUserRole] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Debounce the query to avoid making too many requests
  const debouncedQueryData = useDebounce(searchParams, 500);

  // Initialize user role from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = JSON.parse(atob(token.split(".")[1])).role;
      setUserRole(role);
    }
  }, []);

  // Fetch users on debounced query, page, or role changes
  useEffect(() => {
    if (userRole === "admin") {
      const resetAndFetchUsers = async () => {
        setUserInfo((prev) => ({ ...prev, page: 1 }));
        await fetchUsers(debouncedQueryData, 1, roleFilter);
      };
      resetAndFetchUsers();
    }
  }, [debouncedQueryData, roleFilter, userRole]);

  // Handle page change for table pagination
  const handlePageChange = (newPage: number) => {
    setUserInfo((prev) => ({ ...prev, page: newPage }));
    fetchUsers(debouncedQueryData, newPage, roleFilter);
  };

  // Handle input change for the search text fields
  const handleInputChange = (field: keyof typeof searchParams) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = { ...searchParams, [field]: event.target.value };
    setSearchParams(newParams);
  };

  // Handle the role change for dropdown box filtering
  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRoleFilter(event.target.value);
  };

  // Fetch users from the API based on the query, page, and role
  async function fetchUsers(
    inputs: { firstName: string; lastName: string; email: string },
    page: number,
    role: string
  ) {
    const token = localStorage.getItem("token");

    if (!URL) {
      console.error("API URL is not defined");
      return;
    }

    if (!token) {
      console.error("JWT token not found in storage");
      return;
    }

    const searchParams = new URLSearchParams();

    // Add only non-empty fields to the searchParams
    if (inputs.firstName.trim()) {
      searchParams.append("firstName", inputs.firstName);
    }
    if (inputs.lastName.trim()) {
      searchParams.append("lastName", inputs.lastName);
    }
    if (inputs.email.trim()) {
      searchParams.append("email", inputs.email);
    }
    if (role) {
      searchParams.append("role", role);
    }

    searchParams.append("page", page.toString());
    const url = `${URL}/users/search?${searchParams.toString()}`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      } else {
        const data: UsersData = await res.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  }

  // Function to accept the new role and update via API
  async function acceptNewRole(userId: string, role: string) {
    const token = localStorage.getItem("token");
    try {
      // Check if the API URL is defined
      if (!URL) {
        console.error("API URL is not defined");
        return;
      }
      const response = await fetch(`${URL}/users/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });
      if (response.ok) {
        setSnackbarMessage("User role updated successfully!");
      } else {
        setSnackbarMessage("Error updating user role!");
      }
    } catch (error) {
      setSnackbarMessage("Error updating user role!");
    }
    setSnackbarOpen(true);
  }

  // Closing the dialog and updating role for the user if a change is made
  const handleEditRoleDialog = (role?: string, success?: boolean, userId?: string) => {
    if (success && role && userId) {
      acceptNewRole(userId, role);

      // Update the role on the frontend
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        data: prevUserInfo.data.map((user) => (user.id === userId ? { ...user, role } : user)),
      }));
    }
  };

  // Make sure user is an admin
  if (userRole === "admin") {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          margin: "-1rem",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Sidebar />
        <Box
          sx={{
            flexGrow: 1,
            mt: { xs: "3rem", sm: 0 },
          }}
        >
          <div>
            <Typography fontSize={isMobile ? "1.75rem" : "2.25rem"} textAlign={"center"} margin={"1.5rem"}>
              User Management
            </Typography>
            <Box
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.paper : "white",
                alignItems: "center",
                maxWidth: "80%",
                margin: "0 auto",
                marginBottom: "4rem",
              }}
            >
              <Box
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  gap: "1rem",
                  width: "100%",
                  maxWidth: "80%",
                  margin: "0 auto",
                }}
              >
                {/* First Name Search Bar */}
                <Box sx={{ width: isMobile ? "100%" : "22%" }}>
                  <TextField
                    id="outlined"
                    label="First Name"
                    helperText="Search by first name"
                    value={searchParams.firstName}
                    onChange={handleInputChange("firstName")}
                    fullWidth
                  />
                </Box>
                {/* Last Name Search Bar */}
                <Box sx={{ width: isMobile ? "100%" : "22%" }}>
                  <TextField
                    id="outlined"
                    label="Last Name"
                    helperText="Search by last name"
                    value={searchParams.lastName}
                    onChange={handleInputChange("lastName")}
                    fullWidth
                  />
                </Box>
                {/* Email Search Bar */}
                <Box sx={{ width: isMobile ? "100%" : "22%" }}>
                  <TextField
                    id="outlined"
                    label="Email"
                    helperText="Search by email"
                    value={searchParams.email}
                    onChange={handleInputChange("email")}
                    fullWidth
                  />
                </Box>
                {/* Role Filter Dropdown */}
                <Box sx={{ width: isMobile ? "100%" : "22%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="role-filter-label" shrink>
                      Role
                    </InputLabel>
                    <Select
                      labelId="role-filter-label"
                      id="role-filter"
                      value={roleFilter}
                      onChange={handleRoleChange}
                      displayEmpty
                      label="Role"
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="creator">Creator</MenuItem>
                    </Select>
                    <FormHelperText>Filter by role</FormHelperText>
                  </FormControl>
                </Box>
              </Box>
              {/* User Table */}
              <UserTable
                userInfo={userInfo}
                handleEditRoleDialog={handleEditRoleDialog}
                onPageChange={handlePageChange}
              />
            </Box>
            {/* Snackbar for feedback */}
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message={snackbarMessage}
            />
          </div>
        </Box>
      </Box>
    );
  } else {
    return <UnauthorizedPageMessage />;
  }
};

export default EditUserRolePage;
