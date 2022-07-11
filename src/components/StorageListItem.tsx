import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Divider, Modal, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { StorageItemType } from 'services/storage';
import { StorageItemForm } from './StorageItemForm';

interface StorageListItemProps {
  item: StorageItemType;
}

const { Text } = Typography;

export const StorageListItem: React.FC<StorageListItemProps> = ({ item }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [name, setName] = useState<string>(item.name);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [measurementUnit, setMeasurementUnit] = useState<string>(
    item.measurementUnit
  );
  const [category, setCategory] = useState<string>(item.category);

  const onEditClick = () => {
    setIsEditModalVisible(true);
  };

  const onDeleteClick = () => {
    setIsDeleteModalVisible(true);
  };

  const onEditModalSave = () => {
    setIsEditModalVisible(false);
  };

  const onDeleteModalOk = () => {
    setIsDeleteModalVisible(false);
  };

  const onCancelEditModal = () => {
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
        // okText={'Save'}
        // okType='primary'
        // onOk={onEditModalSave}
        // onCancel={onCancelEditModal}
        // okButtonProps={{
        //   disabled:
        //     name === item.name ||
        //     category === item.category ||
        //     measurementUnit === item.measurementUnit ||
        //     quantity === item.quantity
        // }}

        footer={false}
      >
        <StorageItemForm item={item} />
      </Modal>
      <Modal
        visible={isDeleteModalVisible}
        okText={'Delete'}
        okType='danger'
        onOk={onDeleteModalOk}
        onCancel={onCancelDeleteModal}
      />
    </div>
  );
};
