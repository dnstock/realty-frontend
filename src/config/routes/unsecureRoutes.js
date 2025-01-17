import { Route } from 'react-router-dom';
import { UnsecureRoute } from 'components';
import Pages from 'pages';

const routes = [
  { path: '/login', element: Pages.Login },
];

const UnsecureRoutes = routes.map(({ path, element: Component }) => (
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

export default UnsecureRoutes;
