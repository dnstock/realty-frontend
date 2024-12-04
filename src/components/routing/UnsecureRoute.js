import { Navigate } from 'react-router-dom';
import { useAuth } from 'context';

const UnsecureRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default UnsecureRoute;
