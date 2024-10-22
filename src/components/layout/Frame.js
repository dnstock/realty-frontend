import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { PageFrameBox, MainContentBox } from 'theme';
import { useDeviceType } from 'hooks';
import { useSidebar } from 'context';
import Sidebar from './Sidebar';
import Header from './Header';

const Frame = () => {
  const { isMobile } = useDeviceType();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    toggleSidebar(!isMobile);
  }, [isMobile]);

  return (
    <PageFrameBox>
      <Header/>
      <Sidebar/>
      <MainContentBox isSidebarOpen={isSidebarOpen}>
        <Outlet />
      </MainContentBox>
    </PageFrameBox>
  );
};

export default Frame;
