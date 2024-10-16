import { Navigate } from 'react-router-dom';
import { useAuth } from 'context';

const SecureRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default SecureRoute;
