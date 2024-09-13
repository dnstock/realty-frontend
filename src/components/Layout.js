import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './Header';
import { FlexBox } from '../theme/styledComponents';

const Layout = () => {
  return (
    <FlexBox flexDirection='column' justifyContent='flex-start' padding='0'>
      <Header />
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
