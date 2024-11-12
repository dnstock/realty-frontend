export default {
  palette: {
    primary: {
      main: '#123456',  // Dark blue for primary color
      contrastText: '#ffffff',  // Ensure white text on primary backgrounds
    },
    primaryAlt: {
      main: '#0D47A1',  // Dark blue for primary color
      contrastText: '#ffffff',  // Ensure white text on primary backgrounds
    },
    secondary: {
      main: '#1565C0',  // Lighter blue for secondary color
      contrastText: '#ffffff',
    },
    error: {
      main: '#D32F2F',  // Red for error states
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFA000',  // Orange for warning
      contrastText: '#ffffff',
    },
    info: {
      main: '#00897B',  // Medium blue for informational messages
      contrastText: '#ffffff',
    },
    success: {
      main: '#388E3C',  // Green for success messages
      contrastText: '#ffffff',
    },
    alt2: {
      main: '#1976d2',  // Lighter blue for alternate color 1
      contrastText: '#ffffff',
    },
    alt3: {
      main: '#dc004e',  // Pink for alternate color 2
      contrastText: '#ffffff',
    },
    action: {
      // hover: '#1E88E5',  // A lighter shade of blue for hover effect
      // selected: '#1565C0',  // Active/selected state color (aligns with secondary color)
    },
    background: {
      // default: '#f5f5f5',  // Light background for general use
      // paper: '#ffffff',  // White background for paper elements like cards
    },
  },
  typography: {
    h1: { fontSize: '3.9rem', fontWeight: 500 },
    h2: { fontSize: '3.3rem', fontWeight: 500 },
    h3: { fontSize: '2.7rem', fontWeight: 500 },
    h4: { fontSize: '2.1rem', fontWeight: 500 },
    h5: { fontSize: '1.5rem', fontWeight: 500 },
    h6: { fontSize: '0.8rem', fontWeight: 600 },
    body1: { fontSize: '1rem' },
    subtitle1: { fontSize: '1.2rem', fontWeight: 500, color: '#ffffff' },  // For sidebar items
    button: { textTransform: 'none' },  // Avoid automatic uppercase for buttons
    pre: { whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'monospace' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600, // Mobile
      md: 960, // Small Tablets
      lg: 1280, // Desktop
      xl: 1920,
    },
  },
  shape: {
    borderRadius: 8,  // Global border radius for rounded elements
  },
  spacing: 8,  // Default spacing unit, used for paddings, margins, etc.
  appbar: {
    height: 64,
    heightCondensed: 56,  // Height on mobile devices
  },
  sidebar: {
    fullWidth: 180,  // Width when sidebar is fully open
    collapsedWidth: 48,  // Width when sidebar is collapsed
  },
  // shadows: ['none', '0px 1px 3px rgba(0, 0, 0, 0.1)', '0px 4px 10px rgba(0, 0, 0, 0.1)', '0px 4px 10px rgba(0, 0, 0, 0.1)', '0px 4px 10px rgba(0, 0, 0, 0.1)'],  // Custom shadows
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,  // Match the global border radius
          textTransform: 'none',  // Avoid automatic uppercase for buttons
          boxShadow: 'none',  // Remove default button shadow
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
  mixins: {
    MuiDataGrid: {
      // Pinned columns sections
      // pinnedBackground: '#340606',
      // Headers, and top & bottom fixed rows
      // containerBackground: '#f8f8f8',
      containerBackground: '#ccc',
    },
  },
};
