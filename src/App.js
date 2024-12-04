import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; // Component-specific styles
import { AppRoutes, AppProviders } from 'config';
import { AuthProvider } from 'context';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </AuthProvider>
    </Router>
  );
};

export default App;
