import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Layout({ children }) {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Realty App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/logout">
                Logout
              </Button>
              <Typography variant="body1" sx={{ marginLeft: 'auto' }}>
                Hello, {user.name}
              </Typography>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </>
  );
}

export default Layout;
