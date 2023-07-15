import { PlusCircleOutlined } from '@ant-design/icons';
import { List, Modal, Space, Spin, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import { StorageItemType } from 'services/storage';
import { useStorageProducts } from 'src/hooks/useStorageItems';
import { StorageItemForm } from './StorageItemForm';
import { StorageListItem } from './StorageListItem';
import Table, { ColumnsType } from 'antd/lib/table';
import { getCategoryColor } from 'src/utils/getCategoryColors';
import { getMeasurementColor } from 'src/utils/getMeasurementColor';

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

  const columns: ColumnsType<StorageItemType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
      sorter: (a, b) => a.measurementUnit.localeCompare(b.measurementUnit),
      width: '15%'
    },
    {
      title: 'Amount left',
      dataIndex: 'quantity',
      key: 'quantity',
      render: text => (
        <p style={Number(text) < 2 ? { color: 'red' } : {}}>{text}</p>
      ),
      width: '10%',
      align: 'center'
    },
    {
      title: 'Measurement unit',
      dataIndex: 'measurementUnit',
      key: 'measurementUnit',
      sorter: (a, b) => a.measurementUnit.localeCompare(b.measurementUnit),
      render: measurementUnit => (
        <>
          <Tag
            color={getMeasurementColor(measurementUnit)}
            key={measurementUnit}
            style={{ color: 'black' }}
          >
            {measurementUnit}
          </Tag>
        </>
      ),
      width: '20%'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: category => (
        <>
          <Tag color={getCategoryColor(category)} key={category}>
            {category}
          </Tag>
        </>
      ),
      width: '20%'
    }
  ];

  if (isStorageProductsLoading) {
    return (
      <div className='centeredText'>
        <Spin size='large' />;
      </div>
    );
  }
  return (
    <div>
      {window.innerWidth >= 728 ? (
        <>
          <div className='flex-row'>
            <Space size={30}>
              <Title level={3}>Storage items</Title>
              <PlusCircleOutlined
                onClick={showCreateModal}
                style={{ fontSize: 30 }}
              />
            </Space>
          </div>
          <Table<StorageItemType>
            columns={columns}
            dataSource={storageItems?.data?.items}
            style={{ paddingBottom: 100 }}
            size='small'
          />
        </>
      ) : (
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
            <List.Item
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'black'
              }}
            >
              <StorageListItem item={item} />
            </List.Item>
          )}
        />
      )}

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
