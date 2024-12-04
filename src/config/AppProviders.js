import { useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ContentLoadingBox } from 'theme';
import {
  useAuth,
  SidebarProvider,
  DialogProvider,
  ContentProvider,
} from 'context';

const AppProviders = ({ children }) => {
  const { pathname } = useLocation();
  const { loading: authLoading } = useAuth();

  return (
    // Wait until auth loading is complete
    authLoading ? <ContentLoadingBox /> :
    <SnackbarProvider maxSnack={3}>
      <DialogProvider>
        <SidebarProvider>
          <ContentProvider key={pathname}> {/* reset on route changes */}
            {children}
          </ContentProvider>
        </SidebarProvider>
      </DialogProvider>
    </SnackbarProvider>
  );
};

export default AppProviders;
