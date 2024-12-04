import { Navigate } from 'react-router-dom';
import { useAuth } from 'context';

const SecureRoute = ({ children }) => {
  const auth = useAuth();

  if (auth.loading) {
    return null;
  }

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default SecureRoute;
