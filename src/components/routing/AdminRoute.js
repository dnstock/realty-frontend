import { Navigate } from 'react-router-dom';
import { useAuth } from 'context';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  const isAdmin = isAuthenticated && user?.role?.role === 'admin'

  return isAdmin ? children : <Navigate to='/login' />;
};

export default AdminRoute;
