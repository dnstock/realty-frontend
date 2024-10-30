import { Link as RouterLink, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip, Box, Divider } from '@mui/material';
import { useAuth, useSidebar } from 'context';
import { useDeviceType } from 'hooks';
import { Icons, SidebarDrawer, SidebarLink, SidebarFooter } from 'theme';

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
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isSidebarOpen}
      onClose={isMobile ? toggleSidebar : undefined}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {menuItems.map((item) => (
            <Tooltip
              title={isSidebarOpen ? '' : item.text} // Show tooltip only when collapsed
              placement="right"
              arrow
              key={item.text}
            >
              <ListItem disablePadding>
                <SidebarLink
                  open={isSidebarOpen}
                  component={RouterLink}
                  to={item.path}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  {isSidebarOpen && (
                    <ListItemText primary={item.text} />
                  )}
                </SidebarLink>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>

      {!isMobile && (
        <>
        <Divider />
        <SidebarFooter>
          <Tooltip title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'} placement="right" arrow>
            <IconButton size="small" onClick={toggleSidebar}>
              {isSidebarOpen ? <Icons.SidebarExtended /> : <Icons.SidebarCollapsed />}
            </IconButton>
          </Tooltip>
        </SidebarFooter>
        </>
      )}
    </SidebarDrawer>
  );
};

export default Sidebar;
