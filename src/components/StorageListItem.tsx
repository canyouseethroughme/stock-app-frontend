import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Modal, Space, Typography, notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { deleteStorageItem, StorageItemType } from '../services/storage';
import { StorageItemForm } from './StorageItemForm';

interface StorageListItemProps {
  item: StorageItemType;
}

const { Text, Title } = Typography;

export const StorageListItem: React.FC<StorageListItemProps> = ({ item }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const queryClient = useQueryClient();

  const onDeleteItem = async () => {
    try {
      await deleteStorageItem(item._id);
      notification.success({
        message: 'Item deleted successfully',
        placement: 'top'
      });
      queryClient.refetchQueries('storageItems');
      setTimeout(() => setIsDeleteModalVisible(false), 400);
    } catch (err) {
      console.log('err delete item => ', err);
      notification.error({
        message: 'There was an error',
        placement: 'top'
      });
    }
  };

  const onEditClick = () => {
    setIsEditModalVisible(true);
  };

  const onDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const onCancelDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <div className='flex-row'>
      <Space size={20}>
        <div className='flex-column'>
          <Text>{item.name}</Text>
          <Text type='secondary'>Left: {item.quantity}</Text>
        </div>
        <EditOutlined onClick={onEditClick} height={40} width={40} />

        <DeleteOutlined onClick={onDeleteClick} height={40} width={40} />
      </Space>

      <Modal
        visible={isEditModalVisible}
        onCancel={closeEditModal}
        onOk={closeEditModal}
        footer={false}
      >
        <StorageItemForm item={item} />
      </Modal>
      <Modal
        visible={isDeleteModalVisible}
        okText={'Delete'}
        okType='danger'
        onOk={onDeleteItem}
        onCancel={onCancelDeleteModal}
      >
        <Title level={4} type='danger'>
          Are you sure you want to delete "{item.name}"?
        </Title>
        <Text>Stock left: {item.quantity}</Text>
      </Modal>
    </div>
  );
};
