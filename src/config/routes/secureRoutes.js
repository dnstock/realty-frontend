import { Route } from 'react-router-dom';
import { SecureRoute } from 'components';
import Pages from 'pages';
import { AppResources } from 'config';

const propertyRoutes = AppResources.Property.routes;

const routes = [
  { path: "/dashboard", element: Pages.Dashboard, index: true },
  { path: "/profile", element: Pages.Profile },

  { path: propertyRoutes.list, element: Pages.PropertyList },
  { path: propertyRoutes.view, element: Pages.PropertyDetails },
  { path: propertyRoutes.create, element: Pages.CreateProperty },
  { path: propertyRoutes.edit, element: Pages.EditProperty },
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
