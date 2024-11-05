import { useEffect, useState, useCallback } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { Content, useToast } from 'components';
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

  return (
    <Content title="Dashboard">
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box component="pre">
          {JSON.stringify(dashboardData, null, 2)}
        </Box>
      )}
    </Content>
  );
};

export default Dashboard;
