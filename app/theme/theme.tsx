'use client';
import { ThemeContext } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          backgroundColor: "#12202d",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        },
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          '&:hover': {
            backgroundColor: "white"
          },
          '&.Mui-focused': {
            backgroundColor: "white"
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }
      }
     }
  },
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
          color: "#fff",
          backgroundColor: "lightgray", // replace with a design image
          // "& h1": {
          //   color: "black"
          // }
        }
      }
    }
  }
});

export default theme;