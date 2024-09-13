import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { HeaderBox } from '../theme/styledComponents';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position='static' color='primary' aria-label='Main navigation'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Realty App
        </Typography>
        <HeaderBox>
          <Button component={RouterLink} to='/' color='inherit'>
            Home
          </Button>
          {isAuthenticated() ? (
            <>
              <Button component={RouterLink} to='/dashboard' color='inherit'>
                Dashboard
              </Button>
              <Button component={RouterLink} to='/profile' color='inherit'>
                Profile
              </Button>
              <Button onClick={logout} color='inherit'>
                Logout
              </Button>
            </>
          ) : (
            <Button component={RouterLink} to='/login' color='inherit'>
              Login
            </Button>
          )}
        </HeaderBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
