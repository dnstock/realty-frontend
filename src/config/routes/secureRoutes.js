import { Route } from 'react-router-dom';
import { SecureRoute } from 'components';
import Pages from 'pages';
import { AppResources } from 'config';

const resources = ['Property'];

const staticRoutes = [
  { path: "/dashboard", element: Pages.Dashboard, index: true },
  { path: "/profile", element: Pages.Profile },
];

const generateResourceRoutes = (resource) => {
  const routes = AppResources[resource].routes;

  return [
    { path: routes.index, element: Pages.ResourceIndex, resource: AppResources[resource] },
    { path: routes.view, element: Pages.ResourceView, resource: AppResources[resource] },
    // { path: routes.create, element: Pages.ResourceCreate, resource: AppResources[resource] },
    // { path: routes.edit, element: Pages.ResourceEdit, resource: AppResources[resource] },
  ];
};

const allRoutes = [
  ...staticRoutes,
  ...resources.flatMap(generateResourceRoutes),
];

const SecureRoutes = (withIndex) =>
  allRoutes.map(({ path, element: Component, resource, index }) => (
    <Route
      key={path}
      path={index && withIndex ? undefined : path}
      index={(index && withIndex) || undefined}
      element={
        <SecureRoute>
          {resource ? <Component resource={resource} /> : <Component />}
        </SecureRoute>
      }
    />
  ));

export default SecureRoutes;
