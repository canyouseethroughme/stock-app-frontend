import { Divider, Layout, Tabs, Typography } from 'antd';
import { ManageStockTab } from '../components/ManageStockTab';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from 'src/contexts/UserContext';
import { UsersTab } from '../components/UsersTab';

const { Title } = Typography;
const { TabPane } = Tabs;

export const AdminPanel: React.FC = ({}) => {
  const { userData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || (userData && userData.role !== 'admin')) {
      navigate('/');
    }
  }, [userData]);

  return (
    <Layout className='layout'>
      <div className='flex-column centeredText'>
        <Title level={5}>WELCOME TO</Title>
        <Title level={3} style={{ margin: '0 0 2rem 0' }}>
          KUNE Festival Bar Stock App Admin Panel
        </Title>
      </div>
      <Divider />
      <Tabs defaultActiveKey='1'>
        <TabPane tab='MANAGE STOCK' key='1'>
          <ManageStockTab />
        </TabPane>
        <TabPane tab='USERS' key='2'>
          <UsersTab />
        </TabPane>
        {/* <TabPane tab='STATISTICS' key='3' /> */}
      </Tabs>
    </Layout>
  );
};
