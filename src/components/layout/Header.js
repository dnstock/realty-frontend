import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { StyledIconButton, StyledHeaderButton, HeaderBox, Icons } from 'theme';
import { useAuth, useSidebar } from 'context';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { toggleSidebar } = useSidebar();

  return (
    <AppBar position='static' color='primary' aria-label='Main navigation'>
      <Toolbar>
        <StyledIconButton edge="start" color="inherit" onClick={toggleSidebar}>
          <Icons.Menu />
        </StyledIconButton>
        <Icons.LogoV1 sx={{ marginRight: 1 }} color='inherit' />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Realty App
        </Typography>
        <HeaderBox>
          <StyledHeaderButton component={RouterLink} to='/' color='inherit' startIcon={<Icons.Home />}>
            Home
          </StyledHeaderButton>
          {isAuthenticated ? (
            <>
              <StyledHeaderButton component={RouterLink} to='/dashboard' color='inherit' startIcon={<Icons.Dashboard />}>
                Dashboard
              </StyledHeaderButton>
              <StyledHeaderButton component={RouterLink} to='/profile' color='inherit' startIcon={<Icons.Profile />}>
                Profile
              </StyledHeaderButton>
              <StyledHeaderButton component={RouterLink} to='/logout' color='inherit' startIcon={<Icons.Logout />}>
                Logout
              </StyledHeaderButton>
            </>
          ) : (
            <StyledHeaderButton component={RouterLink} to='/login' color='inherit' startIcon={<Icons.Login />}>
              Login
            </StyledHeaderButton>
          )}
        </HeaderBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
