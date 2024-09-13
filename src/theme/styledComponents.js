import { styled } from '@mui/system';
import { Box, Grid, Button, Drawer, ListItem } from '@mui/material';

// Flexible FlexBox that accepts props to modify layout dynamically
export const FlexBox = styled(Box)(({ theme, 
  minHeight = 'calc(100vh - 128px)', 
  justifyContent = 'center', 
  alignItems = 'center', 
  backgroundColor = '#f5f5f5',
  padding = theme.spacing(2)
}) => ({
  display: 'flex',
  justifyContent: justifyContent,
  alignItems: alignItems,
  minHeight: minHeight, // Can set based on props
  backgroundColor: backgroundColor,
  overflow: 'hidden',
  padding: padding
}));

// HeaderBox for organizing header buttons with consistent spacing
export const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2), // Adds spacing between buttons
}));

// Reusable Card Grid that accepts dynamic maxWidth and padding
export const CardGrid = styled(Grid)(({ theme, 
  maxWidth = '550px', 
  padding = '2rem' 
}) => ({
  backgroundColor: 'white',
  padding: padding,
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: maxWidth,
}));

// Generalized Button with customizable padding
export const PaddedButton = styled(Button)(({ theme,
   padding = theme.spacing(1.5, 6) 
}) => ({
  padding: padding,
}));

// Reusable Secondary Button with additional margins for spacing
export const SecondaryButton = styled(Button)(({ theme, 
  padding = theme.spacing(1.4, 6),
  marginTop = theme.spacing(2),
  marginLeft = 0
}) => ({
  padding: padding,
  marginTop: marginTop,
  marginLeft: marginLeft,
}));

export const SidebarContainer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
  },
}));

export const ActiveListItem = styled(({ isActive, button, ...rest }) => (
  <ListItem {...rest} />
))(({ theme, isActive }) => ({
  backgroundColor: isActive ? theme.palette.action.selected : 'inherit',
}));
