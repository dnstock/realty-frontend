import { useState } from 'react';
import { useAuth, useSidebar } from 'context';
import { useDeviceType } from 'hooks';
import { stringToColor } from 'utils';
import { useLocation } from 'react-router-dom';
import { Toolbar, Typography, Avatar, Tooltip, IconButton, ListItemIcon, Divider } from '@mui/material';
import {
  HeaderAppBar,
  HeaderTitle,
  HeaderButton,
  HeaderIconButton,
  HeaderMenu,
  HeaderMenuHeader,
  HeaderMenuItem,
  HeaderBox,
  Icons,
} from 'theme';

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { isMobile } = useDeviceType();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isUserMenuOpen = Boolean(anchorElUser);
  const location = useLocation();
  const nav = {
    loggedOut: [['Home', '/'], 'Login'],
    loggedIn: [['Dashboard', '/'], 'Reports', 'Analytics'],
  };
  const userMenu = ['Profile', 'Account', 'Logout']

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const getHeaderItem = (text, to, icon) => {
    to = to || '/' + text.toLowerCase();
    const IconComponent = icon || Icons[text];
    return isMobile ? (
      <HeaderIconButton
        key={text}
        to={to}
        selected={location.pathname === to}
      >
        <IconComponent />
      </HeaderIconButton>
    ) : (
      <HeaderButton
        key={text}
        to={to}
        selected={location.pathname === to}
        startIcon={<IconComponent />}
      >
        {text}
      </HeaderButton>
    );
  };

  const getMenuItem = (text, to, icon) => {
    to = to || '/' + text.toLowerCase();
    const IconComponent = icon || Icons[text];
    return (
      <HeaderMenuItem
        to={to}
        key={text}
        selected={location.pathname === to}
      >
        <ListItemIcon>
          <IconComponent fontSize="small" />
        </ListItemIcon>
        {text}
      </HeaderMenuItem>
    );
  };

  const headerItemsFromArray = (items) =>
    items.map(page => getHeaderItem(
      ...(Array.isArray(page) ? page : [page])
    ))

  return (
    <HeaderAppBar>
      <Toolbar disableGutters={isMobile}>
        {isMobile && (
          <HeaderIconButton aria-label='menu' onClick={toggleSidebar}>
            {isSidebarOpen ? <Icons.SidebarOpened /> : <Icons.SidebarClosed /> }
          </HeaderIconButton>
        )}
        {/* <Icons.LogoV1 sx={{ marginRight: 1 }} color='inherit' /> */}
        <img src='/logo192.png' alt='Logo' id='header-logo' />
        <HeaderTitle>
          Realty.AI
        </HeaderTitle>
        {isAuthenticated && (
          <>
          <HeaderBox>
            {headerItemsFromArray(nav.loggedIn)}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleOpenUserMenu}
                size="small"
                // sx={{ ml: 2 }}
                sx={{ py: 0 }}
                aria-controls={isUserMenuOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen ? 'true' : undefined}
              >
                <Avatar {...stringAvatar(user.name)} />
              </IconButton>
            </Tooltip>
          </HeaderBox>
          <HeaderMenu
            anchorEl={anchorElUser}
            open={isUserMenuOpen}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <HeaderMenuHeader>
              <Avatar {...stringAvatar(user.name)} />
              <Typography noWrap variant="body1">
                {user.name}
              </Typography>
            </HeaderMenuHeader>
            <Divider />
            {userMenu.map((page) => getMenuItem(page))}
          </HeaderMenu>
          </>
        ) || (
          <HeaderBox>
            {headerItemsFromArray(nav.loggedOut)}
          </HeaderBox>
        )}
      </Toolbar>
    </HeaderAppBar>
  );
};

export default Header;
