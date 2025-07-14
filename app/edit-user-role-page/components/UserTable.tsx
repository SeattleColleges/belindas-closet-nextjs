"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditUserRoleDialog from './EditUserRoleDialog';
import { User } from "../models/interface";

/**
 * Props for the UserTable component.
 */
interface UserTableProps {
  userInfo: {
    data: User[];
    page: number;
    total: number;
    pages: number;
  };
  handleEditRoleDialog: (role?: string, success?: boolean, userId?: string) => void;
  onPageChange: (page: number) => void;
}

/**
 * Table component to display a list of users.
 */
const UserTable: React.FC<UserTableProps> = ({ userInfo, handleEditRoleDialog, onPageChange }) => {
  // Responsive pagination size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Function to handle page changes
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <>
      {/* User Table */}
      <TableContainer
        component={Paper}
        sx={{
          border: "2px solid #e0e0e0",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="left">
                E-Mail
              </TableCell>
              <TableCell sx={{ fontWeight: 700, cursor: "pointer" }} align="left">
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userInfo.data.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  height: "30px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    opacity: 0.9,
                  },
                  transition: "background-color 0.3s ease, opacity 0.3s ease",
                }}
              >
                <TableCell sx={{ padding: "8px 16px" }} component="th" scope="row">
                  {user.firstName + " " + user.lastName}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }} align="left">
                  {user.email}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }} align="left">
                  {user.role.toUpperCase()}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px" }}>
                  <EditUserRoleDialog user={user} onClose={handleEditRoleDialog} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Stack spacing={2} justifyContent="center" alignItems="center" marginTop="1rem">
        <Pagination
          count={userInfo.pages}
          page={userInfo.page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </Stack>
    </>
  );
};

export default UserTable;
