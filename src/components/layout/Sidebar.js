import { Link as RouterLink, useLocation } from 'react-router-dom';
import { List } from '@mui/material';
import { SidebarDrawer, StyledListItem, StyledListText } from 'theme';
import { useAuth } from 'context';

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
    <SidebarDrawer
      variant="persistent"
      anchor="left"
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
          >
            <StyledListText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </SidebarDrawer>
  );
};

export default Sidebar;
