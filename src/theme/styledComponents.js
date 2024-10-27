import { alpha, styled } from '@mui/system';
import { Box, Button, Drawer, ListItem, ListItemText, TableCell, TableContainer, TableHead, TableRow, Container, IconButton, Chip } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

export const PageFrameBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100vh', // Full screen height
  padding: 0,
  backgroundColor: '#f5f5f5', // Light grey
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const SidebarDrawer = styled(Drawer)(({ theme, open }) => ({
  width: theme.sidebarWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: theme.sidebarWidth,
    backgroundColor: '#f5f5f5', // Light grey
    boxSizing: 'border-box',
    top: '64px',
    transition: theme.transitions.create('transform', {
      easing: open
        ? theme.transitions.easing.easeOut  // Smooth entry when opening
        : theme.transitions.easing.sharp,  // Snappy exit when closing
      duration: open
        ? theme.transitions.duration.standard  // Standard duration when opening
        : theme.transitions.duration.leavingScreen,  // Shorter duration when closing
    }),
  },
}));

export const MainContentBox = styled(({ isSidebarOpen, ...rest }) => <Box component='main' {...rest} />)(({ 
  theme, isSidebarOpen,
  padding = theme.spacing(2, 2, 0, 2),
}) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: padding,
  backgroundColor: '#ffffff',
  marginLeft: isSidebarOpen ? theme.sidebarWidth : 0,
  transition: theme.transitions.create(['margin'], {
    easing: isSidebarOpen
      ? theme.transitions.easing.easeOut  // Smooth entry when opening
      : theme.transitions.easing.sharp,  // Snappy exit when closing
    duration: isSidebarOpen
      ? theme.transitions.duration.standard  // Standard duration when opening
      : theme.transitions.duration.leavingScreen,  // Shorter duration when closing
  }),
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,  // Reset margin on mobile screens
  },
  // minWidth: theme.breakpoints.values.sm,
  // maxWidth: theme.breakpoints.values.lg,
  // maxWidth: isSidebarOpen ? `calc(100% - ${theme.sidebarWidth}px)` : '100%',
}));

export const ContentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  direction: 'row',
  paddingBottom: theme.spacing(1),
  // alignItems: 'center',
}));

export const FlexBox = styled(Box)(({ theme,
  justifyContent = 'center',
  alignItems = 'center',
  backgroundColor = theme.palette.background.default,
}) => ({
  display: 'flex',
  justifyContent: justifyContent,
  alignItems: alignItems,
  backgroundColor: backgroundColor,
}));

// Reusable Card Box that accepts dynamic maxWidth and padding
// export const CardBox = styled(Box)(({ theme, maxWidth = '550px', padding = '2rem' }) => ({
//   backgroundColor: 'white',
//   padding: padding,
//   borderRadius: '8px',
//   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//   maxWidth: maxWidth,
// }));

export const CardBox = styled(Box)(({ theme, minWidth = '400px', maxWidth = '1200px' }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[6],
  margin: '2em auto',  // Center it
  // width: '100%',
  minWidth: minWidth,  // sm = 600px
  maxWidth: maxWidth,  // lg = 960px
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

// Grid container for organizing content
export const StyledGridContainer = styled(Container)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  maxWidth: '100%',
}));

export const StyledHeaderButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1.5),
  marginRight: theme.spacing(.5),
  marginLeft: theme.spacing(-3),
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Generalized Button with customizable padding
export const PaddedButton = styled(Button)(({ theme, padding = theme.spacing(1.5, 6) }) => ({
  padding: padding,
}));

// Modern primary button with enterprise look
export const PrimaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Reusable Secondary Button with additional margins for spacing
// export const SecondaryButton = styled(({ marginTop, marginLeft, ...rest }) => (
//   <Button {...rest} />
// ))(({ theme, padding = theme.spacing(1.4, 6), marginTop = theme.spacing(2), marginLeft = 0 }) => ({
//   padding: padding,
//   marginTop: marginTop,
//   marginLeft: marginLeft,
// }));

// Subdued secondary button for additional actions
export const SecondaryButton = styled(({ marginTop, marginLeft, ...rest }) => (
  <Button variant='outlined' {...rest} />
))(({ theme,
  padding = theme.spacing(1, 3),
  marginTop = 0,
  marginLeft = theme.spacing(2),
}) => ({
  padding: padding,
  marginTop: marginTop,
  marginLeft: marginLeft,
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.primary,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

// Styled Table Container with a neutral, subtle shadow and borders
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  marginTop: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
}));

// Neutral Table Head - no hover effect, with a subtle background color
export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  '& th': {
    fontWeight: 600,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),
    // Explicitly no hover effect for header cells
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
}));

// Styled Table Row - hover effect for body rows only, not for the header
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'inherit',
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
}));

// Styled Table Cell with neutral colors and spacing
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.9rem',
  padding: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Body cell with consistent padding and neutral colors
export const StyledBodyCell = styled(TableCell)(({ theme }) => ({
  fontSize: '0.9rem',
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// A custom wrapper component for form fields for additional spacing
export const FieldWrapper = styled(Box)(({ theme, flex = 1 }) => ({
  marginBottom: theme.spacing(2),
  flex: flex,
}));

export const FieldRowWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  direction: 'row',
  gap: theme.spacing(2),
}));

export const TitleBreadcrumbLink = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  fontWeight: '500',
  fontSize: 'inherit',
  padding: 0,
  ':after': {
    content: '"/"',
    margin: '0 0.5rem',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.action.hover,
  },
}));

export const StyledChip = styled(({ color, ...rest }) => <Chip {...rest} />)(({ theme, color }) => ({
  backgroundColor: theme.palette[color]?.main || theme.palette.grey[600],
  color: theme.palette.common.white,
}));

export const StyledContainer = styled(Box)({
  padding: '20px',
  backgroundColor: '#f5f5f5',
});

export const ActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  direction: 'row',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2),
}));

export const ActionButton = styled(({ color, ...rest }) => <Button variant='contained' {...rest} />)(({ theme, color }) => ({
  // export const ActionButton = styled(Button)(({ theme, color }) => ({
  color: color,
  fontWeight: 500,
  padding: theme.spacing(1, 4),
  marginLeft: theme.spacing(2),
}));

const ODD_OPACITY = 0.2;

export const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 600,
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `3px solid ${theme.palette.divider}`,
  },
  '& .MuiTablePagination-toolbar p, .MuiSelect-select': {
    // fontWeight: 600,
    color: theme.palette.grey[800],
  },
  '& .MuiDataGrid-virtualScroller': {
    overflowX: 'hidden',
    width: '100%',
  },
}));
