import { Route } from 'react-router-dom';
import Pages from 'pages';

const routes = [
  { path: '/home', element: Pages.Home, index: true },
  { path: '/logout', element: Pages.Logout },
  { path: '*', element: Pages.NotFoundPage }, // Catch-all route for undefined paths
];

const PublicRoutes = (withIndex) =>
  routes.map(({ path, element: Component, index }) => (
    <Route
      key={path}
      path={index && withIndex ? undefined : path}
      index={(index && withIndex) || undefined}
      element={<Component />}
    />
  ));

export default PublicRoutes;
