import React, { useState } from "react";
import {Box, Button, Container, Paper, Snackbar, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
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
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editCompleted, setEditCompleted] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  const [newRole, setNewRole] = useState<string>(user.role);
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
        const apiUrl = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
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
    <Paper
      sx={{
        margin: { 
          xs: "0 0 1.25rem 0", 
          sm: "0 2rem 1.25rem 2rem" 
        },
        padding: "2rem",
        paddingBottom: "1rem",
        position: "relative",
        height: "100%",
        width: { 
          xs: "100%",
          sm: "auto" 
        }
      }}
    >
      <Stack
        direction="column"
        spacing={2}
      >
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 1 }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: .25, color: "grey" }}>
            {user.email}
          </Typography>
          {openDialog && (
              <Box display="flex" justifyContent="center">
                <EditUserRoleDialog user={user} onClose={handleCloseDialog} />
              </Box>
          )}
          {!openDialog && (
              <Box style={{ display: "inline-block", width: "100%" }}>
                <Typography variant="body1" gutterBottom sx={{ mb: .25, color: "grey", display: "inline-block" }}>
                  { editCompleted ? newRole : user.role }
                </Typography>
                {editCompleted && (<br />) }
                <Box style={{ display: editCompleted ? "flex" : "inline-block", justifyContent: "space-between" }}>
                  <Button
                      variant="text"
                      endIcon={editCompleted ? "" : <EditIcon />}
                      onClick={editCompleted ? handleCancel : handleEditClick}
                      sx={{padding: 0, display: "inline-block" }}
                  >{editCompleted ? "Cancel" : ""}</Button>
                  {editCompleted && (
                      <Button
                          variant="contained"
                          color="primary"
                          endIcon={<CheckIcon/>}
                          onClick={handleEditClick}
                      >
                        Done
                      </Button>
                  )}
                </Box>
            </Box>
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
          <Typography variant="body2" gutterBottom sx={{ mt: 2.25, color: "#B1B1B1", mb: .75}}>
            ID: {user.id}
          </Typography>
        </Box>
        {openDeleteDialog && (
          <ConfirmDeleteUserDialog
            user={user}
            open={openDeleteDialog}
            setOpen={setOpenDeleteDialog} />
        )}
        <Box style={{
          position: "absolute",
          top: 0,
          right: 0
        }}>
          <Button
            variant="text"
            endIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
          >
          </Button>
        </Box>
      </Stack>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
export default UserCard;
