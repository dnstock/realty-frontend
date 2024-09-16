import { Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Logout from '../../pages/Logout';

const routes = [
  { path: "/", element: Home, index: true },
  { path: "/logout", element: Logout },
];

export const PublicRoutes = routes.map(({ path, element: Component, index }) => (
  <Route
    key={path}
    path={index ? undefined : path}
    index={index || undefined}
    element={<Component />}
  />
));
