import { Route } from 'react-router-dom';
import SecureRoute from '../../components/SecureRoute';
import Dashboard from '../../pages/Dashboard';
import Profile from '../../pages/Profile';

const routes = [
  { path: "/dashboard", element: Dashboard },
  { path: "/profile", element: Profile },
];

export const SecureRoutes = routes.map(({ path, element: Component }) => (
  <Route
    key={path}
    path={path}
    element={
      <SecureRoute>
        <Component />
      </SecureRoute>
    }
  />
));
