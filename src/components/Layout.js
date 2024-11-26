import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Users from './Users';
import Roles from './Roles';
import Permissions from './Permissions';
import DynamicModal from './DynamicModal';
import { useAppContext } from '../context/AppContext';

const Layout = () => {
  const { currentView } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'roles':
        return <Roles />;
      case 'permissions':
        return <Permissions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-50 relative md:ml-64">
        {renderContent()}
        {isModalOpen && (
          <DynamicModal
            context={currentView}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Layout;
