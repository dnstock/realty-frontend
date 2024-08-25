import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/realty-logo.png';
import { useAuth } from './AuthContext';

function Layout({ children }) {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            sx={{ height: 56, marginRight: 2 }}
            alt="Realty Logo"
            src={logo}
          />
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
              <Typography 
                variant="body1" 
                sx={{ 
                  marginLeft: 'auto', 
                  fontWeight: 'bold', 
                  fontSize: '1.2rem', 
                  color: 'primary.main', 
                  backgroundColor: 'secondary.light', 
                  padding: '0.5rem', 
                  borderRadius: '0.25rem' 
                }}
              >
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
