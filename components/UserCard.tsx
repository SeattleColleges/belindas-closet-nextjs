import React, { useState } from "react";
import { Box, Button, Container, Snackbar, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditUserRoleDialog from "./EditUserRoleDialog";
import Alert, { AlertColor } from '@mui/material/Alert';
import ConfirmDeleteUserDialog from "./ConfirmDeleteUserDialog";

export interface UserCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

function UserCard({ user }: { user: UserCardProps }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editCompleted, setEditCompleted] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [newRole, setNewRole] = useState(user.role);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDeleteClick = async () => {
    if (openDeleteDialog) {
      setOpenDeleteDialog(false);
    } else {
      setOpenDeleteDialog(true);
    }
  };

  const handleEditClick = async () => {
    if (editCompleted) {
      window.location.reload();
    } else if (openDialog) {
      setOpenDialog(false);
    } else {
      setOpenDialog(true);
    }

    if (editCompleted) {
      const token = localStorage.getItem('token');
      try {
        const apiUrl = process.env.BELINDAS_CLOSET_PUBLIC_API_URL || `http://localhost:3000/api`;
        const response = await fetch(`${apiUrl}/user/update/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ role: newRole })
        });
        if (response.ok) {
          setSnackbarSeverity('success');
          setSnackbarMessage('User role updated successfully!');
          setSnackbarOpen(true);
        } else {
          console.error('Failed to update user role:', response.statusText);
          setSnackbarSeverity('error');
          setSnackbarMessage('Failed to update user role');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('Error updating user role:', error);
        setSnackbarSeverity('error');
        setSnackbarMessage('Error updating user role');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseDialog = (newRole?: string, success?: boolean) => {
    setOpenDialog(false);
    if (success && newRole) {
      setNewRole(newRole);
      setEditCompleted(true);
    }
  };

  const handleCancel = () => {
    if (editCompleted) {
      setOpenDialog(false);
      setEditCompleted(false);
    } else {
      setOpenDialog(false);
    }
  };

  return (
    <Container
      fixed
      maxWidth="lg"
      sx={{
        border: 1,
        borderRadius: 1,
        borderColor: "primary.main",
        padding: 2,
        margin: 2,
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" gutterBottom sx={{ mt: 1, mb: isMobile ? 1 : 2 }}>
            User ID: {user.id}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: isMobile ? 1 : 2 }}>
            Full Name: {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: isMobile ? 1 : 2 }}>
            Email: {user.email}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: isMobile ? 1 : 2 }}>
            Current Role: {user.role}
          </Typography>
          {editCompleted && (
            <Typography variant="body1" gutterBottom>
              Selected Role: {newRole}
            </Typography>
          )}
        </Box>
        {openDialog && (
          <Box display="flex" justifyContent="center">
            <EditUserRoleDialog user={user} onClose={handleCloseDialog} />
          </Box>
        )}
        <Box p={1} display="flex" justifyContent="center">
          {!openDialog && (
            <Button
              variant="contained"
              color="primary"
              endIcon={editCompleted ? "" : <EditIcon />}
              onClick={editCompleted ? handleCancel : handleEditClick}
            >
              {editCompleted ? "Cancel" : "Edit"}
            </Button>
          )}
          {openDialog && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          )}
          {editCompleted && (
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              endIcon={<CheckIcon />}
              onClick={handleEditClick}
            >
              Done
            </Button>
          )}
        </Box>
        {openDeleteDialog && (
          <ConfirmDeleteUserDialog
            user={user}
            open={openDeleteDialog}
            setOpen={setOpenDeleteDialog} />
        )}
        <Box p={1} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            endIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </Stack>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default UserCard;
