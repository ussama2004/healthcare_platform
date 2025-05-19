import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLanguage } from '../../contexts/LanguageContext';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentLanguage } = useLanguage();
  const isRtl = currentLanguage === 'ar';
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isRtl ? 'rtl' : 'ltr'}`}>
      <Sidebar />
      
      <div className={`${isRtl ? 'mr-64' : 'ml-64'} min-h-screen`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="pt-24 px-6 pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;