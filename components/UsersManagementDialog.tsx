import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography
} from "@mui/material";
import { UserCardProps } from "./UserCard";

interface UsersManagementDialogProps {
  user: UserCardProps;
  onClose: (updatedRole?: string, success?: boolean) => void;
}

const UsersManagementDialog = ({ user, onClose }: UsersManagementDialogProps) => {
  const [newRole, setNewRole] = useState(user.role);
  const [newPassword, setNewPassword] = useState("");

  const handleSave = () => {
    // Validate role and password if needed
    const success = true;
    onClose(newRole, success);
  };

  const handleCancel = () => {
    onClose(); // no success = false, just closing
  };

  return (
    <Dialog open onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>ID: {user.id}</Typography>
        <Typography gutterBottom>Email: {user.email}</Typography>

        <TextField
          label="Role"
          fullWidth
          margin="normal"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />

        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Optionally: pass password back via onClose if you want */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersManagementDialog;
