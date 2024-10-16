import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MainContainerBox } from 'theme';
import Sidebar from './Sidebar';
import Header from './Header';

const Frame = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <MainContainerBox>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Outlet />
    </MainContainerBox>
  );
};

export default Frame;
