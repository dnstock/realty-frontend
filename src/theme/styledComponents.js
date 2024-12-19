import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import {
  alpha,
  styled,
  Box,
  Button,
  Drawer,
  ListItemButton,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  IconButton,
  Chip,
  Typography,
  MenuItem,
  AppBar,
  Menu,
  Divider,
  CircularProgress,
} from '@mui/material';

export const PageFrameBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100vh', // Full screen height
  padding: 0,
  backgroundColor: '#f5f5f5', // Light grey
}));

export const HeaderAppBar = styled(({ ...rest }) =>
  <AppBar position='static' color='primary' aria-label='Main navigation' {...rest} />
)(({ theme }) => ({
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
  height: theme.appbar.height,
  [theme.breakpoints.down('sm')]: {
    height: theme.appbar.heightCondensed,
  },
  '& #header-logo': {
    height: theme.spacing(5),
    marginRight: theme.spacing(2),
    filter: 'brightness(0) invert(1)', // Overlay with white color
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(3.8),
      marginRight: theme.spacing(1),
    },
  },
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const HeaderTitle = styled(({ ...rest }) =>
  <Typography variant='h5' component='div' noWrap {...rest} />
)(({ theme }) => ({
  flexGrow: 1,
  fontFamily: 'monospace',
  // fontWeight: 700,
  letterSpacing: '.2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

export const HeaderMenu = styled(({ ...rest }) =>
  <Menu id='account-menu' {...rest} />
)(({ theme }) => ({
  '& .MuiPaper-root': {
    elevation: 0,
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    marginTop: theme.spacing(1.5),
    minWidth: 180,
    [theme.breakpoints.down('sm')]: {
      minWidth: 140,
    },
    '& hr': {
      marginBottom: theme.spacing(0.5),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      backgroundColor: theme.palette.background.paper,
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}));

export const HeaderMenuHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(-0.5),
    fontSize: '0.875rem',
  },
  '& .MuiTypography-root': {
    marginLeft: theme.spacing(1),
    fontWeight: 600,
    color: 'gray',
    textTransform: 'uppercase',
    fontSize: '0.875rem',
  }
}));

export const SidebarDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? theme.sidebar.fullWidth : theme.sidebar.collapsedWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  transition: 'width 0.3s', // Smooth transition
  '& .MuiDrawer-paper': {
    width: open ? theme.sidebar.fullWidth : theme.sidebar.collapsedWidth,
    backgroundColor: '#f5f5f5', // Light grey
    transition: 'width 0.3s',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
  },
}));

export const SidebarLink = styled(ListItemButton)(({ theme, open }) => ({
  height: theme.spacing(7),
  padding: open ? 'inherit' : 0,
  justifyContent: open ? 'inherit' : 'center',
  '& .MuiListItemIcon-root': {
    padding: open ? theme.spacing(2) : 0,
    minWidth: 'auto',
  },
}));

export const SidebarHeader = styled(({ isSidebarOpen, ...rest }) =>
  <Box {...rest} />
)(({ theme, isSidebarOpen}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  fontSize: '1rem',
  fontFamily: 'monospace',
  letterSpacing: '.2rem',
  fontWeight: 500,
  height: theme.appbar.height - 1, // Subtract 1px for the divider
  [theme.breakpoints.down('sm')]: {
    height: theme.appbar.heightCondensed - 1, // Subtract 1px for the divider
  },
  '& svg': {
    color: 'inherit',
    marginRight: isSidebarOpen ? theme.spacing(1) : 0,
  },
}));

export const SidebarFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1, 0),
}));

export const MainContentBox = styled(({ isAuthenticated, isSidebarOpen, ...rest }) =>
  <Box component='main' {...rest} />
)(({ theme,
  isAuthenticated,
  isSidebarOpen,
  padding = theme.spacing(1, 2, 0, 2),
}) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: padding,
  backgroundColor: '#ffffff',
  marginLeft: isAuthenticated
    ? (isSidebarOpen ? theme.sidebar.fullWidth: theme.sidebar.collapsedWidth)
    : 0,
  transition: 'margin 0.3s',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,  // Reset margin on mobile screens
  },
  // minWidth: theme.breakpoints.values.sm,
  // maxWidth: theme.breakpoints.values.lg,
  // maxWidth: isSidebarOpen ? `calc(100% - ${theme.sidebar.fullWidth}px)` : '100%',
}));

export const ContentHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  direction: 'row',
  paddingBottom: theme.spacing(1),
  // alignItems: 'center',
}));

// Do not export. Use directly in the `ContentLoadingBox` component.
const ContentLoadingBoxWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: theme.spacing(25),
  backgroundColor: theme.palette.background.default,
}));

export const ContentLoadingText = styled(CircularProgress)(({ theme, size = 24 }) => ({
  width: `${size}px !important`,
  height: `${size}px !important`,
}));

export const ContentLoadingBox = ({ children }) => (
  <ContentLoadingBoxWrapper>
    <CircularProgress color="primary" />
    {children}
  </ContentLoadingBoxWrapper>
);

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

export const HeaderButton = styled(({ ...rest }) => (
  <Button component={RouterLink} variant='outlined' color='inherit' {...rest} />
))(({ theme, selected }) => ({
  border: `1px solid ${selected ? 'white' : 'transparent'}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const HeaderIconButton = styled(({ ...rest }) => (
  <IconButton component={RouterLink} color='inherit' {...rest} />
))(({ theme, selected }) => ({
  border: selected ? '1px solid white' : 'none',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const HeaderMenuItem = styled(({ ...rest }) => (
  <MenuItem component={RouterLink} {...rest} />
))(({ theme }) => ({

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

export const StyledChip = styled(({ color, ...rest }) =>
  <Chip {...rest} />
)(({ theme, color }) => ({
  backgroundColor: theme.palette[color]?.main || theme.palette.grey[600],
  color: theme.palette.common.white,
}));

export const StyledContainer = styled(Box)({
  padding: '20px',
  backgroundColor: '#f5f5f5',
});

export const ContentTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  direction: 'row',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  '& svg': {
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.text.secondary,
    marginBottom: '4px',
  },
  '& h4': {
    fontWeight: 300,
  },
}));

export const ContentActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  direction: 'row',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

export const ContentActionButton = styled(({ ...rest }) =>
  <Button variant='outlined' {...rest} />
)(({ theme }) => ({
  height: theme.spacing(4.5),
}));

export const ContentIconButton = styled(({ ...rest }) =>
  <IconButton {...rest} />
)(({ theme }) => ({
  // ":hover": {
  //   backgroundColor: 'inherit',
  // },
}));

export const ContentActionDivider = styled(({ ...rest }) =>
  <Divider orientation='vertical' variant='middle' flexItem {...rest} />
)(({ theme }) => ({
  borderColor: '#636363',
}));

export const RowActionsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignContent: 'center',
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
  '& .MuiDataGrid-row:hover': {
    cursor: 'pointer',
  },
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
  '& .MuiDataGrid-cell.row-action-cell': {
    overflow: 'inherit',
    textOverflow: 'clip',
  },
}));
