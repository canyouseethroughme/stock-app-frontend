import { Divider, Layout, Typography } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from 'src/contexts/UserContext';
import { useStorageProducts } from 'src/hooks/useStorageItems';

const { Title } = Typography;

export const AdminPanel: React.FC = ({}) => {
  const { userData } = useContext(UserContext);

  const navigate = useNavigate();
  const { isLoading: isStorageProducstLoadin, data: storageItems } =
    useStorageProducts();
  console.log(
    '🚀 ~ file: AdminPanel.tsx ~ line 14 ~ storageItemsQuery',
    storageItems?.data?.items
  );

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
          KUNE Festival Bar Stock App
        </Title>
      </div>
      <Divider />
    </Layout>
  );
};
