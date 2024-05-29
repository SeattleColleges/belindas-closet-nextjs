import React, { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditUserRoleDialog from "./EditUserRoleDialog";

export interface UserCardProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

function UserCard({ user }: { user: UserCardProps }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(user.role);

  const handleEditClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setOpenDialog(false);
      if (currentRole !== user.role) {
        window.location.reload();
      }
    } else {
      setOpenDialog(true);
      setMenuOpen(true);
    }
  };

  const handleRoleChange = (newRole: string) => {
    setCurrentRole(newRole);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMenuOpen(false);
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
        <Typography variant="body1" gutterBottom>
          User ID: {user.id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Full Name: {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Current Role: {user.role}
        </Typography>
        {openDialog && (
          <Box display="flex" justifyContent="center">
            <EditUserRoleDialog
              user={user}
              onClose={handleCloseDialog}
              onRoleChange={handleRoleChange}
            />
          </Box>
        )}
        <Box p={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
          >
            {menuOpen ? "Done" : "Edit"}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
export default UserCard;
