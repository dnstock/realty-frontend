import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // Teal
      light: '#48a999',
      dark: '#004d40',
      contrastText: '#ffffff',
    },
    secondary: {
    main: '#0288d1', // Blue
    light: '#5eb8ff',
    dark: '#005b9f',
    contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ffa000',
    },
    info: {
      main: '#1976d2',
    },
    success: {
      main: '#388e3c',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  spacing: 8, // Default spacing unit
  shape: {
    borderRadius: 8, // Default border radius
  },
});

export default theme;
