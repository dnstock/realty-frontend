import { Link as RouterLink, useLocation } from 'react-router-dom';
import { List } from '@mui/material';
import { SidebarDrawer, StyledListItem, StyledListText } from 'theme';
import { useAuth, useSidebar } from 'context';
import { useDeviceType } from 'hooks';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { isMobile } = useDeviceType();
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
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor='left'
      open={isSidebarOpen}
      onClose={isMobile ? toggleSidebar : undefined}
      ModalProps={{
        keepMounted: true, // Keep the drawer mounted for better performance on mobile
      }}
    >
      <List>
        {menuItems.map((item) => (
          <StyledListItem
            button
            component={RouterLink}
            to={item.path}
            key={item.text}
            isActive={location.pathname === item.path}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <StyledListText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
    </SidebarDrawer>
  );
};

export default Sidebar;
