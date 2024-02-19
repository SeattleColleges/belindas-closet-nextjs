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

const options = ["admin", "creator", "user"];

/**
 * Props for the ConfirmationDialogRaw component.
 */
interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}
/**
 * Renders a confirmation dialog for editing user roles.
 * 
 * @param props - The component props.
 * @returns The rendered ConfirmationDialogRaw component.
 */
export function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
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

  /**
   * Handles the click event when the user confirms the role update.
   * @returns {void}
   */
  const handleOk = () => {
    onClose(value);
    // TODO: Update user role in the database
  };

  /**
   * Handles the change event of the input element.
   * @param event - The change event object.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "50%", maxHeight: 435 } }}
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
        <Button onClick={handleOk}>Ok</Button>
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
  user
}: {
  user: UserCardProps;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.role);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper", color : "#000"}}>
      <List component="div" role="group">
        <ListItemButton
          divider
          aria-haspopup="true"
          aria-controls="role-menu"
          aria-label="User role"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Select User Role" secondary={value} />
        </ListItemButton>
        <ConfirmationDialogRaw
          id="role-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </Box>
  );
}
