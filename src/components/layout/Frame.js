import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { PageFrameBox, MainContentBox } from 'theme';
import { useDeviceType } from 'hooks';
import Sidebar from './Sidebar';
import Header from './Header';

const Frame = () => {
  const { isMobile } = useDeviceType();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Automatically close the sidebar when switching to mobile, and open on non-mobile
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <PageFrameBox isSidebarOpen={isSidebarOpen}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <MainContentBox isSidebarOpen={isSidebarOpen}>
        <Outlet />
      </MainContentBox>
    </PageFrameBox>
  );
};

export default Frame;
