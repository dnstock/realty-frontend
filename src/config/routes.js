import { Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { FlexBox } from '../theme/styledComponents';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { PublicRoutes } from './routes/publicRoutes';
import { UnsecureRoutes } from './routes/unsecureRoutes';
import { SecureRoutes } from './routes/secureRoutes';

const AppRoutes = () => {
  const { loading: authLoading } = useAuth();

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
      <Route path="/" element={<Layout />}>
        {PublicRoutes}
        {UnsecureRoutes}
        {SecureRoutes}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
