import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from "@mui/material/Snackbar";
import { useTheme } from "@mui/material";

/**
 * Props for the ConfirmDeleteUserDialog component.
 */
interface ConfirmDeleteUserDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
}
/**
 * Renders a confirmation dialog for deleting users.
 * @param {boolean} open - Controls if the dialog is open.
 * @param {function} setOpen - Function to update the 'open' state.
 * @param {object} user - The user to delete.
 * @returns The rendered DeleteUser component.
 */
export default function ConfirmDeleteUserDialog({
    open,
    setOpen,
    user
}: ConfirmDeleteUserDialogProps) {
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const theme = useTheme();
    /**
     * Handles the click event when the user confirms "No" to deleting user.
     * @returns {void}
     */
    const handleNo = () => {
        setOpen(false);
    };

    const handleYes = async () => {
        const token = localStorage.getItem("token");
        try {
            const URL = process.env.BELINDAS_CLOSET_PUBLIC_API_URL || `http://localhost:3000/api`;
            const response = await fetch(`${URL}/user/delete/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ deleted: user.firstName })
            });
            if (response.ok) {
                setSnackBarMessage("User account deleted successfully!");
                setTimeout(() => {
                    window.history.back();
                }, 2000);
            } else {
                const errorMessage = await response.json();
                setSnackBarMessage(errorMessage.message);
                console.error("Failed to delete user accounr", response.statusText);
            }
        } catch (error) {
            setSnackBarMessage("Error deleting user account");
            console.error("Error deleting user account:", error);
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this user?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting user will permanently erase all user content.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo} autoFocus>
                        No
                    </Button>
                    <Button onClick={handleYes}>
                        Yes
                    </Button>
                </DialogActions>
                <Snackbar
                    open={Boolean(snackBarMessage)}
                    autoHideDuration={6000}
                    onClose={() => setSnackBarMessage("")}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    message={snackBarMessage}
                />
            </Dialog>
        </React.Fragment>
    );
}
