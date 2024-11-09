import { useEffect, useState, useCallback } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { useToast } from 'hooks';
import { FlexBox } from 'theme';
import { apiService } from 'services';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const data = await apiService.fetchDashboardData();
      // const data = { message: 'Future dashboard data...' };
      setDashboardData(data);
    } catch (error) {
      setError('Failed to fetch dashboard data');
      showError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      <Box component="pre">
        {JSON.stringify(dashboardData, null, 2)}
      </Box>
    </Box>
  );
};

export default Dashboard;
