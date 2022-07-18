import { Button, Layout, Spin, Typography } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmPickedUp } from '../services/orders';
import { useGetOrderById } from 'src/hooks/useGetOrderById';
import { CreateOrderType } from './ConfirmingOrder';
import { PanelItem } from '../components/PanelItem';
import { LeftOutlined } from '@ant-design/icons';

interface ConfirmPickedOrderProps {}

const { Title, Paragraph } = Typography;

export const ConfirmPickedOrder: React.FC<ConfirmPickedOrderProps> = ({}) => {
  const navigate = useNavigate();
  let { orderId } = useParams();

  const [confirmingOrder, setConfirmingOrder] = useState<CreateOrderType[]>([]);

  const { data: orderData, isLoading } = useGetOrderById({
    id: orderId as string
  });

  useEffect(() => {
    if (orderData?.data?.order?.confirmPackedOrderStorage) {
      setConfirmingOrder(orderData?.data?.order?.confirmPackedOrderStorage);
    }
  }, [orderData]);

  const getFirstInitialValue = (id: string): number | undefined => {
    const orderValue = orderData?.data.order.orderedItems.find(
      i => i.itemId === id
    );
    return orderValue?.quantity;
  };

  const getPanelValue = (
    reqQuantity: number,
    brandName: string,
    measurementUnit: string,
    itemId: string
  ) => {
    const itemIndex = confirmingOrder.findIndex(o => o.name === brandName);
    if (itemIndex >= 0) {
      setConfirmingOrder(prevState => {
        const newList = [...prevState];
        newList[itemIndex] = {
          ...newList[itemIndex],
          quantity: reqQuantity,
          measurementUnit
        };
        return newList;
      });
    } else {
      setConfirmingOrder(prevState => [
        ...prevState,
        { quantity: reqQuantity, name: brandName, measurementUnit, itemId }
      ]);
    }
  };

  const onConfirmPickedUp = async () => {
    console.log('order items -> ', confirmingOrder);
    if (confirmingOrder) {
      try {
        const data = await confirmPickedUp(orderId as string, confirmingOrder);
        navigate('/');
      } catch (err) {
        console.log('err confirm packed order => ', err);
      }
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
            <Button
              type='text'
              size='large'
              onClick={() => navigate('/', { replace: true })}
            >
              <LeftOutlined />
            </Button>
            <Title level={4} style={{ margin: '0' }}>
              Order summary
            </Title>
          </div>
          <div style={{ marginTop: '1rem' }}>
            {confirmingOrder?.map((item, index) => (
              <PanelItem
                itemId={item.itemId}
                key={index + 1}
                name={item.name}
                initialValue={item.quantity}
                firstInitialValue={getFirstInitialValue(item.itemId)}
                measurementUnit={item.measurementUnit}
                quantity={0}
                enableEdit={true}
                getValue={reqQuantity =>
                  getPanelValue(
                    reqQuantity,
                    item.name,
                    item.measurementUnit,
                    item.itemId
                  )
                }
              />
            ))}
          </div>
          {orderData?.data?.order?.comment && (
            <div style={{ marginTop: '1rem' }}>
              <Title level={4}>Comments:</Title>
              <Paragraph>{orderData?.data?.order?.comment}</Paragraph>
            </div>
          )}
        </div>
        <Footer>
          <Button
            size='large'
            block
            type='primary'
            onClick={onConfirmPickedUp}
            disabled={!confirmingOrder}
          >
            Confirm pick up
          </Button>
        </Footer>
      </Content>
    </Layout>
  );
};
