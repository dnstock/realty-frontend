import { useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import {
  AuthProvider,
  SidebarProvider,
  DialogProvider,
  ContentProvider,
} from 'context';

const AppProviders = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <DialogProvider>
          <SidebarProvider>
            <ContentProvider key={pathname}> {/* reset on route changes */}
              {children}
            </ContentProvider>
          </SidebarProvider>
        </DialogProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default AppProviders;
