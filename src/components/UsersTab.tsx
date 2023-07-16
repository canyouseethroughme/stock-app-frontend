import { Modal, Space, Table, Tabs, Typography } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';
import React, { useState } from 'react';
import { UsersTable } from './tables/AllUsersTable';
import { PlusCircleOutlined } from '@ant-design/icons';
import { UserForm } from './UserForm';

const { Title } = Typography;

export const UsersTab: React.FC = ({}) => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalVisible(false);
  };

  // const closeEditModal = () => {
  //   setIsEditModalVisible(false);
  // };

  const onCancelDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <div>
      <>
        <div className='flex-row'>
          <Space size={30}>
            <Title level={3}>USERS</Title>
            <PlusCircleOutlined
              onClick={showCreateModal}
              style={{ fontSize: 30 }}
            />
          </Space>
        </div>
      </>
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
      <Modal
        visible={isCreateModalVisible}
        footer={false}
        onCancel={closeCreateModal}
        destroyOnClose={true}
      >
        <UserForm onOk={closeCreateModal} onCancel={closeCreateModal} />
      </Modal>
    </div>
  );
};
