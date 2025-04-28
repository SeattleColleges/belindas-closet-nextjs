import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Paper,
  Stack,
  useTheme,
  useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UsersManagementDialog from "./UsersManagementDialog";

export interface UserCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

function UserCard({ user }: { user: UserCardProps }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openDialog, setOpenDialog] = useState(false);
  const [editType, setEditType] = useState<"role" | "password" | null>(null);

  const handleEditClick = (type: "role" | "password") => {
    setEditType(type);
    setOpenDialog(true);
  };

  const handleDialogClose = async (updatedRole?: string, updatedPassword?: string) => {
    setOpenDialog(false);

    if (!updatedRole && !updatedPassword) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...(updatedRole && { role: updatedRole }),
          ...(updatedPassword && { password: updatedPassword }),
        }),
      });
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong while updating user.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
      <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
        <Typography>{user.email}</Typography>
        <Typography>{user.role}</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleEditClick("role")}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleEditClick("password")}>
            <EditIcon />
          </IconButton>
        </Stack>
      </Stack>

      {openDialog && editType && (
        <UsersManagementDialog
          open={openDialog}
          onClose={handleDialogClose}
          user={user}
          editType={editType}
        />
      )}
    </Paper>
  );
}

export default UserCard;
