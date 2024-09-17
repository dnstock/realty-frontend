import { Link as RouterLink, useLocation } from 'react-router-dom';
import { List, ListItemText } from '@mui/material';
import { SidebarContainer, StyledListItem, StyledListText } from '../theme/styledComponents';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const menuItems = isAuthenticated
    ? [
        { text: 'Properties', path: '/properties' },
        { text: 'Tenants', path: '/tenants' },
      ]
    : [
        { text: 'Home', path: '/' },
        { text: 'Login', path: '/login' },
      ];

  return (
    <SidebarContainer
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={toggleSidebar}
    >
      <List>
        {menuItems.map((item) => (
          <StyledListItem
            button
            component={RouterLink}
            to={item.path}
            key={item.text}
            isActive={location.pathname === item.path}
            onClick={toggleSidebar}
          >
            <StyledListText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
