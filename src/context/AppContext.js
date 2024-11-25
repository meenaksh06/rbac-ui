import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('login');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        posts,
        setPosts,
        users,
        setUsers,
        roles,
        setRoles,
        permissions,
        setPermissions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
