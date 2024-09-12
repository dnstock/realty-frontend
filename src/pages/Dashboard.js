import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { api } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.fetchDashboardData();
      setDashboardData(data);
    };
    fetchData();
  }, [api]);

  return (
    <div>
      <h1>Dashboard</h1>
      {dashboardData ? (
        <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
