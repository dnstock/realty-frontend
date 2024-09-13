import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; // Component-specific styles
import { AuthProvider } from './context/AuthProvider';
import AppRoutes from './config/routes';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
