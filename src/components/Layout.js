import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const user = localStorage.getItem('user'); // Assuming you store the user's name or email

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
                Hello, {user}
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
