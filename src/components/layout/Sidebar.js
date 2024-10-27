import { Link as RouterLink, useLocation } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { SidebarDrawer, Icons } from 'theme';
import { useAuth, useSidebar } from 'context';
import { useDeviceType } from 'hooks';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { isMobile } = useDeviceType();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const menuItems = isAuthenticated
    ? [
        { text: 'Properties', path: '/properties', icon: Icons.Properties },
        { text: 'Buildings', path: '/buildings', icon: Icons.Buildings },
        { text: 'Units', path: '/units', icon: Icons.Units },
        { text: 'Tenants', path: '/tenants', icon: Icons.Tenants },
        { text: 'Leases', path: '/leases', icon: Icons.Leases },
        { text: 'Insurance', path: '/admin', icon: Icons.Insurance },
      ]
    : [
        { text: 'Home', path: '/', icon: Icons.Home },
        { text: 'Login', path: '/login', icon: Icons.Login },
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
          <ListItemButton
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={isMobile ? toggleSidebar : undefined}
          >
            <ListItemIcon>
              {item.icon && <item.icon />}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </SidebarDrawer>
  );
};

export default Sidebar;
