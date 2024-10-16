import { Route } from 'react-router-dom';
import { AdminRoute } from 'components';
import Pages from 'pages';

const routes = [
  { path: "/admin", element: Pages.AdminDashboard },
];

const AdminRoutes = routes.map(({ path, element: Component }) => (
  <Route
    key={path}
    path={path}
    element={
      <AdminRoute>
        <Component />
      </AdminRoute>
    }
  />
));

export default AdminRoutes;
