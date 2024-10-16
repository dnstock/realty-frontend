import { Route } from 'react-router-dom';
import Pages from 'pages';

const routes = [
  { path: "/", element: Pages.Home, index: true },
  { path: "/logout", element: Pages.Logout },
  { path: "*", element: Pages.NotFoundPage }, // Catch-all route for undefined paths
];

const PublicRoutes = routes.map(({ path, element: Component, index }) => (
  <Route
    key={path}
    path={index ? undefined : path}
    index={index || undefined}
    element={<Component />}
  />
));

export default PublicRoutes;
