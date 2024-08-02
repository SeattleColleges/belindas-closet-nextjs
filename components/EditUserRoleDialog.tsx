import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useEffect, useRef, useState } from "react";
import { UserCardProps } from "./UserCard";
import { useMediaQuery, useTheme } from "@mui/material";
// WARNING: You won't be able to connect to local backend unless you remove the env variable below.
const URL =
  process.env.BELINDAS_CLOSET_PUBLIC_API_URL || "http://localhost:3000/api";

const options = ["admin", "creator", "user"];

/**
 * Props for the ConfirmationDialogRaw component.
 */
interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string, success?: boolean) => void;
}

/**
 * Renders a confirmation dialog for editing user roles.
 *
 * @param props - The component props.
 * @returns The rendered ConfirmationDialogRaw component.
 */
export function ConfirmationDialogRaw(
  props: ConfirmationDialogRawProps & { user: UserCardProps }
) {
  const { onClose, value: valueProp, open, user, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const [roleUpdated, setRoleUpdated] = useState(false);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
      setRoleUpdated(false);
    }
  }, [valueProp, open]);

  /**
   * Handles the entering event of the dialog.
   */
  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  /**
   * Handles the cancel action.
   */
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if (value !== valueProp) {
      onClose(value, true);
    } else {
      onClose();
    }
  };

  /**
   * Handles the change event of the input element.
   * @param event - The change event object.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setValue(newValue);
    if (newValue !== valueProp) {
      setRoleUpdated(true);
    } else {
      setRoleUpdated(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: isMobile ? "85%" : "50%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>User Role</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="role"
          name="role"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk} disabled={!roleUpdated}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * Renders a dialog for editing the user role.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {UserCardProps} props.user - The user object containing user information.
 * @param {Function} props.onClose - The function to be called when the dialog is closed.
 * @returns {JSX.Element} The rendered EditUserRoleDialog component.
 */
export default function EditUserRoleDialog({
  user,
  onClose,
}: {
  user: UserCardProps;
  onClose: (newRole?: string, success?: boolean) => void;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.role);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose =(newValue?: string, success?: boolean) => {
    setOpen(false);
    onClose(newValue, success);
  };

  const theme = useTheme();

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
          aria-controls="role-menu"
          aria-label="User role"
          onClick={handleClickListItem}
          sx={{ backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            '&:hover': {
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
            }
            }}
        >
          <ListItemText 
            primary="Select User Role" 
            secondary={value} 
            sx={{
              color: theme.palette.mode === "dark" ? "primary.contrastText" : "primary.dark"
            }} 
            />
        </ListItemButton>
        <ConfirmationDialogRaw
          id="role-menu"
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
