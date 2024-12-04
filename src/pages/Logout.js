import { useEffect, useCallback } from 'react';
import { useToast } from 'hooks';
import { useAuth, useContent } from 'context';
import { ContentLoadingBox } from 'theme';

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

  return <ContentLoadingBox />;
};

export default Logout;
