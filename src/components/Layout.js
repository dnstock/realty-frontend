import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { FlexBox } from '../theme/styledComponents';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <FlexBox flexDirection='column' justifyContent='flex-start' padding='0'>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Container
        component='main'
        maxWidth='lg'
        sx={{
          flexGrow: 1,
          mt: 2,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Container>
    </FlexBox>
  );
};

export default Layout;
