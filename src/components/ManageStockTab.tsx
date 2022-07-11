import { List, Spin, Typography } from 'antd';
import React from 'react';
import { StorageItemType } from 'services/storage';
import { useStorageProducts } from 'src/hooks/useStorageItems';
import { StorageListItem } from './StorageListItem';

const { Title } = Typography;

export const ManageStockTab: React.FC = ({}) => {
  const { isLoading: isStorageProductsLoading, data: storageItems } =
    useStorageProducts();
  console.log(
    '🚀 ~ file: AdminPanel.tsx ~ line 14 ~ storageItemsQuery',
    storageItems?.data?.items
  );

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
        header={<Title level={3}>Storage items</Title>}
        // footer={<div>Footer</div>}
        bordered
        loading={isStorageProductsLoading}
        dataSource={storageItems?.data?.items}
        renderItem={item => (
          <List.Item>
            <StorageListItem item={item} />
          </List.Item>
        )}
      />
    </div>
  );
};
