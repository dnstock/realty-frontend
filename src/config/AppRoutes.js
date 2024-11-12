import { Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { FlexBox } from 'theme';
import { useAuth } from 'context';
import { PageFrame } from 'components';
import PublicRoutes from './routes/publicRoutes';
import UnsecureRoutes from './routes/unsecureRoutes';
import SecureRoutes from './routes/secureRoutes';
import AdminRoutes from './routes/adminRoutes';

const AppRoutes = () => {
  const { loading: authLoading, isAuthenticated } = useAuth();

  // Wait until auth loading is complete
  if (authLoading) {
    return (
      <FlexBox>
        <CircularProgress />
      </FlexBox>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<PageFrame />}>
        {PublicRoutes(!isAuthenticated)}
        {UnsecureRoutes}
        {SecureRoutes(isAuthenticated)}
        {AdminRoutes}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
