import { Button, Layout, Spin, Typography } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  confirmCompleteOrderBar,
  confirmCompleteOrderDelivery
} from '../services/orders';
import UserContext from 'src/contexts/UserContext';
import { useGetOrderById } from 'src/hooks/useGetOrderById';
import { CreateOrderType } from './ConfirmingOrder';
import { PanelItem } from '../components/PanelItem';

const { Title, Paragraph } = Typography;

export const ConfirmDelivered: React.FC = ({}) => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const { userData } = useContext(UserContext);

  const [confirmingOrder, setConfirmingOrder] = useState<CreateOrderType[]>([]);

  const { data: orderData, isLoading } = useGetOrderById({
    id: orderId as string
  });

  useEffect(() => {
    // orderData?.data?.order?.orderedItems
    if (orderData?.data?.order?.confirmOrderPickedUp) {
      setConfirmingOrder(orderData?.data?.order?.confirmOrderPickedUp);
    }
    orderData?.data?.order?.orderedItems.map(el => console.log(el));
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

  const onConfirmOrder = async () => {
    try {
      let data;
      if (userData?.role === 'bar') {
        data = await confirmCompleteOrderBar(
          orderId as string,
          confirmingOrder
        );
      } else if (userData?.role === 'delivery') {
        data = await confirmCompleteOrderDelivery(
          orderId as string,
          confirmingOrder
        );
      }

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
                itemId={item.itemId}
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
            onClick={onConfirmOrder}
            disabled={!confirmingOrder}
          >
            Confirm delivered
          </Button>
        </Footer>
      </Content>
    </Layout>
  );
};
