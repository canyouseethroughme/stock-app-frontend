import { Button, Layout, Spin, Typography } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmPickedUp } from '../services/orders';
import { useGetOrderById } from 'src/hooks/useGetOrderById';
import { CreateOrderType } from './ConfirmingOrder';
import { PanelItem } from '../components/PanelItem';

interface ConfirmPickedOrderProps {}

const { Title } = Typography;

export const ConfirmPickedOrder: React.FC<ConfirmPickedOrderProps> = ({}) => {
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
        </div>
        <Footer>
          <Button
            size='large'
            block
            type='primary'
            onClick={onConfirmPickedUp}
            disabled={!confirmingOrder}
          >
            Confirm packed order
          </Button>
        </Footer>
      </Content>
    </Layout>
  );
};
