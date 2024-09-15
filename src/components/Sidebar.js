import { Link as RouterLink, useLocation } from 'react-router-dom';
import { List, ListItemText } from '@mui/material';
import { SidebarContainer, ActiveListItem } from '../theme/styledComponents';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const menuItems = isAuthenticated ?
    [
      { text: 'Home', path: '/' },
      { text: 'Dashboard', path: '/dashboard' },
      { text: 'Profile', path: '/profile' },
      { text: 'Logout', path: '/logout' },
    ] : [
      { text: 'Home', path: '/' },
      { text: 'Login', path: '/login' }
    ];

  return (
    <SidebarContainer
      variant="temporary" // Allow toggling
      anchor="right"
      open={isOpen}
      onClose={toggleSidebar} // Close when clicking outside
    >
      <List>
        {menuItems.map((item) => (
          <ActiveListItem
            button
            component={RouterLink}
            to={item.path}
            key={item.text}
            isActive={location.pathname === item.path}
            onClick={toggleSidebar} // Close when clicking a menu item
          >
            <ListItemText primary={item.text} />
          </ActiveListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
