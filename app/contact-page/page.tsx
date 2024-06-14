// import { Typography } from "@mui/material";

// const Contact = () => {
//   return (
//     <Typography component="h1" variant="h3">
//       Contact Us
//     </Typography>
//     // Save for mission content
//   );
// };

// export default Contact;

import { Typography, Box, TextField, Button } from "@mui/material";

const Contact = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography component="h1" variant="h3" gutterBottom>
        Contact Us
      </Typography>
      
      <Typography component="h2" variant="h5" gutterBottom>
        Address
      </Typography>
      <Typography variant="body1" paragraph>
        9600 College Way N,<br />
        Seattle, WA, 98103
      </Typography>
      
      <Typography component="h2" variant="h5" gutterBottom>
        Email
      </Typography>
      <Typography variant="body1" paragraph>
       Add belinda closet email info here
      </Typography>
      
      <Typography component="h2" variant="h5" gutterBottom>
        Phone
      </Typography>
      <Typography variant="body1" paragraph>
        (206) 934-3600
      </Typography>
      
      <Typography component="h2" variant="h5" gutterBottom>
        Get in Touch With Us
      </Typography>
      <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
        <TextField
          label="Name"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
        />
        <TextField
          label="Message"
          variant="outlined"
          required
          fullWidth
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" type="submit">
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;