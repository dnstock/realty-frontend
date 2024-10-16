import { Navigate } from 'react-router-dom';
import { useAuth } from 'context';

const UnsecureRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default UnsecureRoute;
