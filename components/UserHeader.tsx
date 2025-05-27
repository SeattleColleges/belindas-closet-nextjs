import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'

interface UserHeaderProps {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  pronouns: string | null | undefined;
  role: string | null | undefined;
}

const UserHeader: React.FC<UserHeaderProps> = ({ firstName, lastName, pronouns, role }) => {

  const { palette } = useTheme();
  const containerColor = palette.mode === "dark" ? "#333" : "#fff";

  return (
    <Box
        sx={{
          width: "100%", // Full width of the parent container
          height: "auto", 
          backgroundColor: containerColor,
          display: "flex",
          alignItems: "center", // Center items vertically within the parent Box
          justifyContent: "flex-start", // Align content to the left
          borderRadius: '7px',
          boxShadow: 3
        }}
      >
      {/* Inner Box for Typography elements */}
      <Box
        sx={{
          width: { xs: "100%", sm: "40%" }, 
          display: "flex",
          flexDirection: "column", // Stack items vertically
          alignItems: "left", 
          justifyContent: "center", 
          marginY:'15px',
          marginLeft: '15px',
          padding: { xs: "5px", sm: "10px"}, 
        }}
      >
        <Typography sx={{ fontSize: { xs: '1.25rem', sm:"1.5rem" } }}>
          {firstName} {lastName}
          </Typography>

        <Typography sx={{ fontSize: { xs: '0.9rem', sm:"1rem" } }}>
          ({pronouns})
          </Typography>

        <Typography sx={{ fontSize: { xs: '0.9rem', sm:"1rem"} }}>
          {role}
          </Typography>
      </Box>
    </Box>
  )
}

export default UserHeader