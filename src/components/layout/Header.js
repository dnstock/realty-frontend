import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderBox, StyledHeaderButton, StyledIconButton } from 'theme';
import { useAuth } from 'context';

const Header = ({ toggleSidebar }) => {
  const { isAuthenticated } = useAuth();

  return (
    <AppBar position='static' color='primary' aria-label='Main navigation'>
      <Toolbar>
        <StyledIconButton edge="start" color="inherit" onClick={toggleSidebar}>
          <MenuIcon />
        </StyledIconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Realty App
        </Typography>
        <HeaderBox>
          <StyledHeaderButton component={RouterLink} to='/' color='inherit'>
            Home
          </StyledHeaderButton>
          {isAuthenticated ? (
            <>
              <StyledHeaderButton component={RouterLink} to='/dashboard' color='inherit'>
                Dashboard
              </StyledHeaderButton>
              <StyledHeaderButton component={RouterLink} to='/profile' color='inherit'>
                Profile
              </StyledHeaderButton>
              <StyledHeaderButton component={RouterLink} to='/logout' color='inherit'>
                Logout
              </StyledHeaderButton>
            </>
          ) : (
            <StyledHeaderButton component={RouterLink} to='/login' color='inherit'>
              Login
            </StyledHeaderButton>
          )}
        </HeaderBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
