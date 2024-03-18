import Box from '@mui/material/Box';
import {Typography} from '@mui/material';

const DonationInfo=()=>{
    return (
        <Box width={800} display="flex" alignItems="center" flexDirection="column" gap={2} bgcolor='#293745' p={3}>
            <Typography component='h1' variant='h3' sx={{color: 'white'}}>Donation Info</Typography>
        </Box>
    )
}

export default DonationInfo;
