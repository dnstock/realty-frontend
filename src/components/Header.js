import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderBox } from '../theme/styledComponents';

const Header = ({ toggleSidebar }) => {
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
          <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </HeaderBox>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
