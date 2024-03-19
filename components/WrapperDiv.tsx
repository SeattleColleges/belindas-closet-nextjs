import React from "react";
import { Box, BoxProps } from "@mui/material";

const styles = {
    width: 800,
    bgcolor: '#293745',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 2,
    p: 3
}


const CustomCardContent: React.FC<BoxProps> =({children})=>{
    return (
        <Box sx={styles}>
            {children}
        </Box>
    )
}

export default CustomCardContent;