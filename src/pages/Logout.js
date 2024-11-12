import { useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { useToast } from 'hooks';
import { useAuth, useContent } from 'context';

const Logout = () => {
  const { logout } = useAuth();
  const { showSuccess } = useToast();

  const performLogout = useCallback(async () => {
    await logout(1); // 1 second delay
    showSuccess('Logout successful');
  }, [logout, showSuccess]);

  useEffect(() => {
    performLogout();
  }, [performLogout]);

  useContent({ title: 'Logging out...' });

  return <CircularProgress />;
};

export default Logout;
