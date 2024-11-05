import { useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { Content, useToast } from 'components';
import { useAuth } from 'context';

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

  return (
    <Content title="Logging out...">
        <CircularProgress />
    </Content>
  );
};

export default Logout;
