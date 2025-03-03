import React from "react";
import { Box, BoxProps } from "@mui/material";

const CustomCardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%",
        padding: "1rem",
      }}
    >
      {children}
    </Box>
  );
};

export default CustomCardContent;
