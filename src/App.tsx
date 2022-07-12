import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NewOrder from './pages/NewOrder';
import ConfirmingOrder from './pages/ConfirmingOrder';
import { Login } from './pages/Login';
import UserContext, { UserType } from './contexts/UserContext';
import { AdminPanel } from './pages/AdminPanel';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ConfirmOrderStorage } from './pages/ConfirmOrderStorage';

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserType>();
  const navigate = useNavigate();

  const queryClient = new QueryClient();

  useEffect(() => {
    if (userData?.role === 'admin' && window.innerWidth >= 728) {
      navigate('/admin-panel');
    }
  }, [userData]);

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Routes>
            <Route
              path='/'
              element={
                userData?.token ? (
                  <Home
                    userName={userData?.username}
                    barName={userData?.barName}
                    userType={userData?.role}
                    data=''
                  />
                ) : (
                  <Login />
                )
              }
            />
            <Route path='/admin-panel' element={<AdminPanel />} />
            <Route
              path='/new-order'
              element={<NewOrder barName='Space Bar' />}
            />
            <Route path='/confirming-order/' element={<ConfirmingOrder />} />
            <Route
              path='/confirming-order-storage/:orderId'
              element={<ConfirmOrderStorage />}
            />
          </Routes>
        </UserContext.Provider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
