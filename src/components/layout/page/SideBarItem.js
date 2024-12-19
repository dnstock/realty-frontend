import { Link as RouterLink, useMatch } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { SidebarLink } from 'theme';

const SidebarItem = ({ item, isSidebarOpen, isMobile, toggleSidebar }) => {
  const isSelected = !!useMatch(item.path);

  return (
    <Tooltip
      title={isSidebarOpen ? '' : item.text} // Show tooltip only when collapsed
      placement="right"
      arrow
    >
      <ListItem disablePadding>
        <SidebarLink
          open={isSidebarOpen}
          component={RouterLink}
          to={item.path}
          selected={isSelected}
          onClick={isMobile ? toggleSidebar : undefined}
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
  );
};

export default SidebarItem;
