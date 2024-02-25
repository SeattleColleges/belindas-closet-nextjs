'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#3f50b5',
      main: '#1565c0',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#fff', 
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "darkgrey",
          backgroundColor: "grey",
          // "& h1": {
          //   color: "black"
          // }
        }
      }
    }
  }
});

export default theme;