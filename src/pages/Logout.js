import { useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import useToast from '../components/ToastNotification';
import { FlexBox } from '../theme/styledComponents';
import { useAuth } from '../context/AuthContext';

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
    <FlexBox>
      <Box textAlign='center'>
        <Typography variant='h6' gutterBottom>
          Logging out...
        </Typography>
        <CircularProgress />
      </Box>
    </FlexBox>
  );
};

export default Logout;
