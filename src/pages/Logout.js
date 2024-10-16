import { useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { ContentWrapper, useToast } from 'components';
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
    <ContentWrapper title="Logging out...">
        <CircularProgress />
    </ContentWrapper>
  );
};

export default Logout;
