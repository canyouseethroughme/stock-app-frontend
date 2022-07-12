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
import { PanelItem } from './NewOrder';

const { Title } = Typography;

export const ConfirmDelivered: React.FC = ({}) => {
  const navigate = useNavigate();
  let { orderId } = useParams();

  const { userData } = useContext(UserContext);

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
