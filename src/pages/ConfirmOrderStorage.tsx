import { LeftOutlined } from '@ant-design/icons';
import { Button, Layout, Spin, Typography } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmOrderStorage } from '../services/orders';
import { useGetOrderById } from 'src/hooks/useGetOrderById';
import { CreateOrderType } from './ConfirmingOrder';
import { PanelItem } from '../components/PanelItem';

interface ConfirmOrderStorageProps {}

const { Title } = Typography;

export const ConfirmOrderStorage: React.FC<ConfirmOrderStorageProps> = ({}) => {
  const navigate = useNavigate();
  let { orderId } = useParams();

  const [confirmingOrder, setConfirmingOrder] = useState<CreateOrderType[]>([]);

  const { data: orderData, isLoading } = useGetOrderById({
    id: orderId as string
  });

  useEffect(() => {
    if (orderData) {
      console.log(
        '🚀 ~ file: ConfirmOrderStorage.tsx ~ line 30 ~ useEffect ~ orderData',
        orderData
      );
      setConfirmingOrder(orderData?.data?.order?.orderedItems);
    }
  }, [orderData]);

  const onConfirmOrder = async () => {
    try {
      const data = await confirmOrderStorage(orderId as string);
      console.log(
        '🚀 ~ file: ConfirmOrderStorage.tsx ~ line 39 ~ onConfirmOrder ~ data',
        data
      );
      navigate('/');
    } catch (err) {
      console.log('err confirm order storage => ', err);
    }
  };

  if (isLoading) {
    return (
      <div className='centerDiv'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <Layout className='layout'>
      <Content>
        <div className='flex-column' style={{ paddingBottom: '7rem' }}>
          <div className='flex-row'>
            <Title level={4} style={{ margin: '0' }}>
              Order summary
            </Title>
          </div>
          <div style={{ marginTop: '1rem' }}>
            {confirmingOrder?.map((item, index) => (
              <PanelItem
                key={index + 1}
                name={item.name}
                initialValue={item.quantity}
                measurementUnit={item.measurementUnit}
                quantity={0}
              />
            ))}
          </div>
        </div>

        <Footer>
          <Button
            size='large'
            block
            type='primary'
            onClick={onConfirmOrder}
            disabled={!confirmingOrder}
          >
            Accept Order
          </Button>
        </Footer>
      </Content>
    </Layout>
  );
};
