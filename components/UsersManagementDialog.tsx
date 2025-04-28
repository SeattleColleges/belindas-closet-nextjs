import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { UserCardProps } from "./UserCard";

// Props definition for the Users Management Dialog
interface UsersManagementDialogProps {
  open: boolean;
  onClose: (updatedRole?: string, updatedPassword?: string) => void;
  user: UserCardProps;
  editType: "role" | "password" | null;
}

// UsersManagementDialog component
const UsersManagementDialog: React.FC<UsersManagementDialogProps> = ({ open, onClose, user, editType }) => {
  const [newRole, setNewRole] = useState(user.role);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle submit when clicking Save button
  const handleSubmit = () => {
    if (editType === "password" && newPassword !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Call onClose passing either new role or new password
    onClose(
      editType === "role" ? newRole : undefined,
      editType === "password" ? newPassword : undefined
    );
  };

  // Handle cancel button
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
      <DialogTitle>Edit {editType === "role" ? "User Role" : "User Password"}</DialogTitle>
      <DialogContent>
        {/* Role editing form */}
        {editType === "role" && (
          <TextField
            select
            label="Select Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        )}

        {/* Password editing form */}
        {editType === "password" && (
          <>
            <TextField
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
            <TextField
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              sx={{ mt: 2 }}
            />
          </>
        )}
      </DialogContent>

      {/* Save / Cancel buttons */}
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersManagementDialog;

