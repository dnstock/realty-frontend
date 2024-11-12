import { Route } from 'react-router-dom';
import { SecureRoute } from 'components';
import Pages from 'pages';

const routes = [
  { path: "/dashboard", element: Pages.Dashboard, index: true },
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

const SecureRoutes = (withIndex) =>
  routes.map(({ path, element: Component, index }) => (
    <Route
      key={path}
      path={index && withIndex ? undefined : path}
      index={index && withIndex || undefined}
      element={
        <SecureRoute>
          <Component />
        </SecureRoute>
      }
    />
  ));

export default SecureRoutes;
