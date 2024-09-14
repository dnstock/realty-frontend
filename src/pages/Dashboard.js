import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { FlexBox } from '../theme/styledComponents';
import useToast from '../components/ToastNotification';
import ApiService from '../services/ApiService';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        setError('Failed to fetch dashboard data');
        showError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showError]);

  if (loading) {
    return (
      <FlexBox>
        <CircularProgress />
      </FlexBox>
    );
  }

  if (error) {
    return (
      <FlexBox>
        <Typography variant='h6' color='error'>
          {error}
        </Typography>
      </FlexBox>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>
      <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
    </Box>
  );
};

export default Dashboard;
