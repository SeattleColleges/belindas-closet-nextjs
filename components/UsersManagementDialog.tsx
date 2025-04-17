import React, { useEffect, useRef, useState } from "react";
import {
  Box, Button, List, ListItemButton, ListItemText,
  DialogTitle, DialogContent, DialogActions, Dialog,
  RadioGroup, Radio, FormControlLabel, TextField,
  useMediaQuery, useTheme
} from "@mui/material";
import { UserCardProps } from "./UserCard";

const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL;
const roleOptions = ["admin", "creator", "user"];

interface ConfirmationDialogProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  user: UserCardProps;
  onClose: (role?: string, passwordSuccess?: boolean) => void;
}

export function ConfirmationDialogRaw({
  onClose, value: valueProp, open, user, ...other
}: ConfirmationDialogProps) {
  const [value, setValue] = useState(valueProp);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roleUpdated, setRoleUpdated] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const radioGroupRef = useRef<HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
      setRoleUpdated(false);
      setNewPassword('');
      setConfirmPassword('');
      setPasswordUpdated(false);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    radioGroupRef.current?.focus();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    const updates: { role?: string; password?: string } = {};

    if (value !== valueProp) {
      updates.role = value;
    }

    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      updates.password = newPassword;
    }

    try {
      if (Object.keys(updates).length > 0) {
        const response = await fetch(`${URL}/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!response.ok) throw new Error("Update failed");
      }

      onClose(updates.role, !!updates.password);
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating.");
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setValue(newRole);
    setRoleUpdated(newRole !== valueProp);
  };

  const passwordsMatch = newPassword === confirmPassword;
  const canSubmit = roleUpdated || (newPassword && confirmPassword && passwordsMatch);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: isMobile ? "85%" : "50%", maxHeight: 600 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Users Management</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="role"
          name="role"
          value={value}
          onChange={handleRoleChange}
        >
          {roleOptions.map((option) => (
            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>

        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!newPassword && !passwordsMatch}
          helperText={!passwordsMatch ? "Passwords do not match" : ""}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk} disabled={!canSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function UsersManagementDialog({
  user,
  onClose,
}: {
  user: UserCardProps;
  onClose: (role?: string, passwordSuccess?: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.role);
  const theme = useTheme();

  const handleClickListItem = () => setOpen(true);

  const handleClose = (newRole?: string, success?: boolean) => {
    setOpen(false);
    onClose(newRole, success);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        bgcolor: "transparent",
        color: "#000",
      }}
    >
      <List component="div" role="group">
        <ListItemButton
          divider
          aria-haspopup="true"
          aria-controls="user-management-menu"
          aria-label="User management"
          onClick={handleClickListItem}
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            '&:hover': {
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <ListItemText
            primary="Manage User"
            secondary={value}
            sx={{ color: theme.palette.mode === "dark" ? "primary.contrastText" : "primary.dark" }}
          />
        </ListItemButton>
        <ConfirmationDialogRaw
          id="user-management-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
          user={user}
        />
      </List>
    </Box>
  );
}