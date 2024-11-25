import React from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import { useAppContext } from './context/AppContext';

function App() {
  const { currentView } = useAppContext();

  return (
    <div className="h-screen">
      {currentView === 'login' ? <Login /> : <Layout />}
    </div>
  );
}

export default App;
