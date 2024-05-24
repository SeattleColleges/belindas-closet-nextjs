"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#3f50b5",
      main: "#1565c0",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#f5f5f5",
        },
      },
    },
  },
});
darkTheme = responsiveFontSizes(darkTheme);

let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#3f50b5",
      main: "#1565c0",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#6fbf73",
      main: "#4caf50",
      dark: "#357a38",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});
lightTheme = responsiveFontSizes(lightTheme);

export { darkTheme, lightTheme };
