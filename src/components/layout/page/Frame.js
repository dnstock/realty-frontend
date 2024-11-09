import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { PageFrameBox, MainContentBox } from 'theme';
import { useDeviceType } from 'hooks';
import { useAuth, useSidebar } from 'context';
import { PageHeader, PageSidebar, ContentHeader } from 'components';

const Frame = () => {
  const { isMobile } = useDeviceType();
  const { isAuthenticated } = useAuth();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    toggleSidebar(!isMobile);
  }, [isMobile]);

  return (
    <PageFrameBox>
      <PageHeader />
      {isAuthenticated && <PageSidebar />}
      <MainContentBox isAuthenticated={isAuthenticated} isSidebarOpen={isSidebarOpen}>
        <ContentHeader />
        <Outlet />
      </MainContentBox>
    </PageFrameBox>
  );
};

export default Frame;
