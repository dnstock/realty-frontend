import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default Dashboard;
