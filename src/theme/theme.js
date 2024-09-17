import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1',  // Dark blue for primary color
      contrastText: '#ffffff',  // Ensure white text on primary backgrounds
    },
    secondary: {
      main: '#1565C0',  // Lighter blue for secondary color
      contrastText: '#ffffff',
    },
    action: {
      hover: '#1E88E5',  // A lighter shade of blue for hover effect
      selected: '#1565C0',  // Active/selected state color (aligns with secondary color)
    },
    background: {
      default: '#f5f5f5',  // Light background for general use
      paper: '#ffffff',  // White background for paper elements like cards
    },
  },
  typography: {
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    subtitle1: { fontSize: '1.2rem', fontWeight: 500, color: '#ffffff' },  // For sidebar items
    button: { textTransform: 'none' },  // Avoid automatic uppercase for buttons
  },
  shape: {
    borderRadius: 8,  // Global border radius for rounded elements
  },
  spacing: 8,  // Default spacing unit, used for paddings, margins, etc.
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0D47A1',  // Set sidebar drawer background color
          color: '#fff',  // Ensure text is white on the dark background
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,  // Match the global border radius
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#1565C0',  // Selected state color (matches secondary)
            '&:hover': {
              backgroundColor: '#1E88E5',  // Hover effect even when selected
            },
          },
          '&:hover': {
            backgroundColor: '#1E88E5',  // Default hover effect for list items
          },
        },
      },
    },
  },
});

export default theme;
