import { createTheme } from '@mui/material/styles';

export const DarkTheme = createTheme({
  palette: {
    type: 'dark', // Set type to 'dark' for a dark theme
    primary: {
      main: "#90caf9",
      light: '#e3f2fd',
    },
    secondary: {
      main: "#ce93d8",
      light: '#f3e5f5',
    },
    background: {
      default: "#121212",
    },
    common: {
      black: "#000",
      white: "#fff",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});