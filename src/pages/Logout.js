import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { FlexBox } from '../theme/styledComponents';
import useToast from '../components/ToastNotification';

const Logout = () => {
  const { logout } = useAuth();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      showSuccess('Logout successful');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    };

    performLogout();
  }, [logout, showSuccess, navigate]);

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
