import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    // Add a one second delay before redirecting
    return logout(1); // return the cleanup function
  }, [logout]);

  return <div>Logging out...</div>;
};

export default Logout;
