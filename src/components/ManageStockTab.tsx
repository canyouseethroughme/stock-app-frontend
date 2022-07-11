import { PlusCircleOutlined } from '@ant-design/icons';
import { List, Modal, Space, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { StorageItemType } from 'services/storage';
import { useStorageProducts } from 'src/hooks/useStorageItems';
import { StorageItemForm } from './StorageItemForm';
import { StorageListItem } from './StorageListItem';

const { Title } = Typography;

export const ManageStockTab: React.FC = ({}) => {
  const { isLoading: isStorageProductsLoading, data: storageItems } =
    useStorageProducts();

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalVisible(false);
  };

  if (isStorageProductsLoading) {
    return (
      <div className='centeredText'>
        <Spin size='large' />;
      </div>
    );
  }
  return (
    <div>
      <List<StorageItemType>
        size='large'
        itemLayout='horizontal'
        header={
          <div className='flex-row'>
            <Space size={30}>
              <Title level={3}>Storage items</Title>
              <PlusCircleOutlined
                onClick={showCreateModal}
                style={{ fontSize: 30 }}
              />
            </Space>
          </div>
        }
        bordered
        loading={isStorageProductsLoading}
        dataSource={storageItems?.data?.items}
        renderItem={item => (
          <List.Item>
            <StorageListItem item={item} />
          </List.Item>
        )}
      />
      <Modal
        visible={isCreateModalVisible}
        footer={false}
        onCancel={closeCreateModal}
        destroyOnClose={true}
      >
        <StorageItemForm onOk={closeCreateModal} onCancel={closeCreateModal} />
      </Modal>
    </div>
  );
};
