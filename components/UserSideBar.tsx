"use client";

import { Avatar, Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditUserDetailsDialog from '@/components/EditUserDetailsDialog';
import { User } from '@/types/user';
import { useRouter } from 'next/navigation';

interface UserSideBarProps {
  user: User | null | undefined;
  onUserUpdate?: (updatedUser: User) => void;
}

const UserSideBar: React.FC<UserSideBarProps> = ( { user, onUserUpdate } ) => {
  const [userInfo, setUserInfo] = useState<User | null | undefined>(user);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { palette } = useTheme();
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";
  
  const router = useRouter();

  useEffect(() => {
    setUserInfo(user);
  }, [user]); 

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };
  
  const handleCloseDialog = (updatedUser?: User) => {
    setOpenEditDialog(false);
    if (updatedUser) {
      setUserInfo(prevUserInfo => ({ 
        ...prevUserInfo, 
        ...updatedUser 
      }));
      if (onUserUpdate) {
        onUserUpdate(updatedUser)
      }
    }
  };

  return (
    <Box 
      sx={{
        width: isMobile ? "100%" : { xs: '35%', sm: '45%', md: '35%' }, 
        minHeight: isMobile ? "auto" : "100%",
        backgroundColor: containerColor,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '7px',        
        padding: { xs: "15px", sm: "25px" },
        boxShadow: 3,
        marginBottom: { xs: '15px', sm: '0px' }
      }}
    >
      <Avatar 
        sx={{ 
          height: { xs: 200, sm: 140}, 
          width: { xs: 200, sm: 140}, 
          fontSize: { xs: '30px', sm: '50px'}, 
          marginBottom: '25px' ,
          bgcolor: "#114fa3",
        }}
      >
        {userInfo?.firstName.charAt(0).toUpperCase()}{userInfo?.lastName.charAt(0).toUpperCase()}
      </Avatar>
      
      <Typography sx={{ fontSize: { xs: '1.1rem' } }}>Email:</Typography>
      
      { userInfo && (
        <>
          <Typography sx={{ fontSize: { xs: '1rem' } }}>
            {userInfo?.email}
          </Typography>

          {openEditDialog && userInfo && (
              <EditUserDetailsDialog
                open={openEditDialog}
                user={userInfo}
                onClose={handleCloseDialog}
              />
            )}

          <Box 
            sx={{ 
              flexDirection: {xs: 'row', sm: 'column'},
              marginTop: 'auto', 
              marginX: '0',
              width: 300, 
              textAlign: 'center' 
              }}
            >
            
            <Button 
              variant="contained" 
              onClick={handleEditClick}
              sx={{ 
                mt: 2,
                mr: {xs: '0.5rem', sm: '0rem'},
                fontSize: { xs: '0.65rem', sm: '0.85rem'} 
              }}
            >
              Edit Profile
            </Button>

            <Button 
              onClick={() => router.replace('/auth/change-password-page')} 
              variant="outlined"
              sx={{ 
                mt: 2, 
                fontSize: { xs: '0.65rem', sm: '0.85rem'} 
              }}
            >
              Change Password
            </Button>

          </Box>

        </>
      )}
    </Box>
  )
}

export default UserSideBar;
