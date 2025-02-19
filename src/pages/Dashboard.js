import { useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useContent } from 'context';
import { useToast } from 'hooks';
import { ContentLoadingBox } from 'theme';
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
      // showError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useContent({ title: 'Dashboard' });

  return (
    <>
      {loading ? (
        <ContentLoadingBox />
      ) : error ? (
        <Typography color='error'>{error}</Typography>
      ) : (
        <Box component='pre'>
          {JSON.stringify(dashboardData, null, 2)}
        </Box>
      )}
    </>
  );
};

export default Dashboard;
