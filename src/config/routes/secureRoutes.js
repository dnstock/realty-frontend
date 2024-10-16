import { Route } from 'react-router-dom';
import { SecureRoute } from 'components';
import Pages from 'pages';

const routes = [
  { path: "/dashboard", element: Pages.Dashboard },
  { path: "/profile", element: Pages.Profile },
  { path: "/properties", element: Pages.PropertyList },
  { path: "/properties/:id", element: Pages.PropertyDetails },
  { path: "/properties/create", element: Pages.CreateProperty },
  { path: "/properties/edit/:id", element: Pages.EditProperty },

  { path: "/resources", element: Pages.ResourceListPage },
  { path: "/resources/create", element: Pages.ResourceCreatePage },
  { path: "/resources/:id", element: Pages.ResourceDetailPage },
  { path: "/resources/:id/edit", element: Pages.ResourceUpdatePage },

];

const SecureRoutes = routes.map(({ path, element: Component }) => (
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

export default SecureRoutes;
