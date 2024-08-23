import React from 'react';
import { Typography, Container } from '@mui/material';

function Dashboard() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      {/* Add your dashboard content here */}
      <Typography variant="body1">
        Welcome to your dashboard! This is a protected page.
      </Typography>
    </Container>
  );
}

export default Dashboard;
