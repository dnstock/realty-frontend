import { useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
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
    <>
      <Toaster position='bottom-left' />
      <DialogProvider>
        <SidebarProvider>
          <ContentProvider key={pathname}> {/* reset on route changes */}
            {children}
          </ContentProvider>
        </SidebarProvider>
      </DialogProvider>
    </>
  );
};

export default AppProviders;
