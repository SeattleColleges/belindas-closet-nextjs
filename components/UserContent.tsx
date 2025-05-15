import React, { useEffect, useState } from 'react';
import { Box, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { User, LookingForItem } from '@/types/user';
import AddLookingForDialog from '@/components/AddLookingForDialog';

interface UserContentProps {
  user: User | null | undefined;
}

const UserContent: React.FC<UserContentProps> = ( { user } ) => {
  const [userInfo, setUserInfo] = useState<User | null | undefined>(user);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { palette } = useTheme();
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";

  useEffect(() => {
      setUserInfo(user);
    }, [user]); 

  const handleAddItem = (newItem: LookingForItem) => {
    if (userInfo) {
      const updatedLookingFor = [...(userInfo?.lookingFor || []), newItem];
      setUserInfo({
        ...userInfo,
        lookingFor: updatedLookingFor
      });
    }
  };

  return (
    <Box 
      sx={{
        width: isMobile ? "100%" : '85%', 
        minHeight: "600px",
        marginLeft: isMobile ? "0px" : "10px", 
        backgroundColor: containerColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '7px',
        padding: { xs: "10px", sm: "15px"}, 
        marginBottom: { xs: '15px', sm: '0px' }, 
        boxShadow: 3
      }}
    >

    <Box sx={{ width: "100%" }}>
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        marginBottom: "1rem"
      }}>
        <Typography variant="h6">Currently looking for:</Typography>
        <IconButton onClick={() => setOpenAddDialog(true)}>
          <AddIcon />
        </IconButton>
      </Box>

      <Stack spacing={2}>
        {userInfo?.lookingFor?.length ? userInfo?.lookingFor?.map((item, index) => (
          <Paper
            key={index}
            sx={{ 
              p: 3,
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <Typography variant="h6" gutterBottom>
              {item?.type}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {item?.gender} - {item?.size}
            </Typography>
          </Paper>
        )) : <Typography variant="body1" color="text.secondary" sx={{ mt: 15 }}> No current requests </Typography>}
      </Stack>
    </Box>

    {userInfo && (
      <AddLookingForDialog
        open={openAddDialog}
        user={userInfo}
        onClose={() => setOpenAddDialog(false)}
        onAdd={handleAddItem}
      />
    )}


      {/* <Typography sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
        Currently Looking For:
      </Typography> */}
      
      {/* <Box sx={{ display: 'flex', flexDirection: isMobile ? "column" : { sm: "column", md: "row" }, gap: '20px', justifyContent: 'space-between', marginTop: '15px', width: '100%' }}>
        <Box sx={{ width: isMobile ? "auto" : { sm: '100%', md: '35%' }, boxShadow: 3, backgroundColor: containerColor, borderRadius: '7px' }}>
          <Typography sx={headerStyle}>
            Bio/Affiliations
          </Typography>
        </Box>
        <Box sx={{ width:{ xs: '100%', sm: '100%', md: '65%' }, boxShadow: 3, backgroundColor: containerColor, borderRadius: '7px' }}>
          <Typography sx={headerStyle}>
            Events Attended
          </Typography>
        </Box>
        
      </Box> */}
      
    </Box>
  )
}

export default UserContent;
