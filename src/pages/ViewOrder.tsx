import { Button, Layout, Spin, Typography } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import { PanelItem } from '../components/PanelItem';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrderById } from 'src/hooks/useGetOrderById';
import { CreateOrderType } from './ConfirmingOrder';

const { Title } = Typography;

interface ViewOrderProps {}

export const ViewOrder: React.FC<ViewOrderProps> = ({}) => {
  const navigate = useNavigate();

  let { orderId } = useParams();

  const [confirmingOrder, setConfirmingOrder] = useState<CreateOrderType[]>([]);

  const { data: orderData, isLoading } = useGetOrderById({
    id: orderId as string
  });

  useEffect(() => {
    if (orderData) {
      setConfirmingOrder(orderData?.data?.order?.orderedItems);
    }
  }, [orderData]);

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
            onClick={() => navigate('/')}
            disabled={!confirmingOrder}
          >
            Go Back
          </Button>
        </Footer>
      </Content>
    </Layout>
  );
};
