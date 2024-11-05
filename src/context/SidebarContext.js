import { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const storedState = localStorage.getItem('isSidebarOpen');
    return storedState !== null ? JSON.parse(storedState) : true;
  });

  const toggleSidebar = ( newState ) => {
    const newSidebarState = typeof newState == 'boolean' ? newState : !isSidebarOpen;
    setIsSidebarOpen(newSidebarState);
    localStorage.setItem('isSidebarOpen', JSON.stringify(newSidebarState));
  };

  useEffect(() => {
    // Store the sidebar state so it persists across pages
    localStorage.setItem('isSidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
