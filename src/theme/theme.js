import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1',
    },
    secondary: {
      main: '#1565C0',
    },
  },
  typography: {
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
  },
  // components: {
  //   MuiToolbar: {
  //     styleOverrides: {
  //       root: {
  //         minHeight: 64,  // Default for all screen sizes
  //         '@media (min-width:600px)': {
  //           minHeight: 64,  // Enforce for larger screens
  //         },
  //         '@media (max-width:600px)': {
  //           minHeight: 48,  // Reduce for smaller screens
  //         },
  //       },
  //     },
  //   },
  // },
});

export default theme;
