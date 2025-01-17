import { List, IconButton, Tooltip, Box, Divider } from '@mui/material';
import { useAuth, useSidebar } from 'context';
import { useDeviceType } from 'hooks';
import { Icons, SidebarDrawer, SidebarHeader, SidebarFooter } from 'theme';
import SidebarItem from './SideBarItem';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { isMobile } = useDeviceType();
  const { isAuthenticated } = useAuth();

  const menuItems = isAuthenticated
    ? [
        { text: 'Properties', path: '/properties', icon: Icons.Properties },
        { text: 'Buildings', path: '/buildings', icon: Icons.Buildings },
        { text: 'Units', path: '/units', icon: Icons.Units },
        { text: 'Tenants', path: '/tenants', icon: Icons.Tenants },
        { text: 'Leases', path: '/leases', icon: Icons.Leases },
        { text: 'Insurance', path: '/insurances', icon: Icons.Insurance },
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
        <SidebarHeader isSidebarOpen={isSidebarOpen}>
          <Icons.LogoV1/>
          {isSidebarOpen && 'Realty.AI'}
        </SidebarHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.text}
              item={item}
              isSidebarOpen={isSidebarOpen}
              isMobile={isMobile}
              toggleSidebar={toggleSidebar}
            />
          ))}
        </List>
      </Box>

      {!isMobile && (
        <>
        <Divider />
        <SidebarFooter>
          <Tooltip title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'} placement='right' arrow>
            <IconButton size='small' onClick={toggleSidebar}>
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
