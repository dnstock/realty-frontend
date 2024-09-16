import { Route } from 'react-router-dom';
import UnsecureRoute from '../../components/UnsecureRoute';
import Login from '../../pages/Login';

const routes = [
  { path: "/login", element: Login },
];

export const UnsecureRoutes = routes.map(({ path, element: Component }) => (
  <Route
    key={path}
    path={path}
    element={
      <UnsecureRoute>
        <Component />
      </UnsecureRoute>
    }
  />
));
