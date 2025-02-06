import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserCardProps } from './UserCard';

function DeleteUser({ user }: { user: UserCardProps }) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token');
        try {
            const apiUrl = process.env.BELINDAS_CLOSET_PUBLIC_API_URL || `http://localhost:3000/api`;
            const response = await fetch(`${apiUrl}/user/delete/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ deleted: user.firstName })
            });
            if (response.ok) {
                window.location.reload();
                console.log("User successfully deleted!" + response);
            } else {
                console.error('Failed to delete user account:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user account:', error);
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Would you like to delete this user?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting user will permanently erase all user information.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                    <Button onClick={handleDeleteUser}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteUser;