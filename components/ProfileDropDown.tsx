import React from 'react';
import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

const ProfileDropDown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <Link href="/profile" passHref>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link href="/account" passHref>
          <MenuItem onClick={handleClose}>Account</MenuItem>
        </Link>
        <Link href="/auth/sign-in" passHref>
          <MenuItem onClick={handleClose}>Sign In</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default ProfileDropDown;

