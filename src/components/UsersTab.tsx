import { Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import React from 'react';
import { UsersTable } from './tables/AllUsersTable';

export const UsersTab: React.FC = ({}) => {
  return (
    <Tabs defaultActiveKey='barManager'>
      <TabPane tab='Bar manager' key='barManager'>
        <UsersTable role='bar' />
      </TabPane>
      <TabPane tab='Delivery' key='delivery'>
        <UsersTable role='delivery' />
      </TabPane>
      <TabPane tab='Storage' key='storage'>
        <UsersTable role='storage' />
      </TabPane>
      <TabPane tab='Admin' key='admin'>
        <UsersTable role='admin' />
      </TabPane>
    </Tabs>
  );
};
