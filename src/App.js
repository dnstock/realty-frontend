import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'; // Component-specific styles
import { AuthProvider, SidebarProvider, DialogProvider } from 'context';
import { AppRoutes } from 'config';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <AuthProvider>
          <DialogProvider>
            <SidebarProvider>
              <AppRoutes />
            </SidebarProvider>
          </DialogProvider>
        </AuthProvider>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
