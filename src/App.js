import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; // Component-specific styles
import { AppRoutes, AppProviders } from 'config';

const App = () => {
  return (
    <Router>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
