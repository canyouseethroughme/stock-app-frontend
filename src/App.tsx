import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Input, Typography } from 'antd';
import Home from './pages/Home';
import NewOrder from './pages/NewOrder';
import ConfirmingOrder from './pages/ConfirmingOrder';
import { Login } from './pages/Login';
import UserContext, { UserType } from './contexts/UserContext';

const { Title } = Typography;
const { Content } = Layout;

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserType>();

  return (
    <div className='App'>
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
          <Route path='/new-order' element={<NewOrder barName='Space Bar' />} />
          <Route path='/confirming-order' element={<ConfirmingOrder />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
