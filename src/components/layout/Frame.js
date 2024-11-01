import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { PageFrameBox, MainContentBox } from 'theme';
import { useDeviceType } from 'hooks';
import { useAuth, useSidebar } from 'context';
import Sidebar from './Sidebar';
import Header from './Header';

const Frame = () => {
  const { isMobile } = useDeviceType();
  const { isAuthenticated } = useAuth();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    toggleSidebar(!isMobile);
  }, [isMobile]);

  return (
    <PageFrameBox>
      <Header/>
      {isAuthenticated && <Sidebar/>}
      <MainContentBox isAuthenticated={isAuthenticated} isSidebarOpen={isSidebarOpen}>
        <Outlet />
      </MainContentBox>
    </PageFrameBox>
  );
};

export default Frame;
