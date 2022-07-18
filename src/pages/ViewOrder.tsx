import { Button, Divider, Layout, Spin, Typography } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import { PanelItem } from '../components/PanelItem';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOrderById } from 'src/hooks/useGetOrderById';
import { CreateOrderType } from './ConfirmingOrder';

const { Title, Paragraph } = Typography;

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
                itemId={item.itemId}
                key={index + 1}
                name={item.name}
                initialValue={item.quantity}
                measurementUnit={item.measurementUnit}
                quantity={0}
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
            onClick={() => navigate('/')}
            disabled={!confirmingOrder}
          >
            Go Back
          </Button>
        </Footer>
        {orderData?.data?.order?.confirmPackedOrderStorage &&
          orderData?.data?.order?.confirmPackedOrderStorage?.length >= 1 && (
            <>
              <div style={{ marginTop: '2rem' }}>
                <Title level={4} style={{ margin: '0' }}>
                  Packed from storage
                </Title>
                {orderData?.data?.order?.confirmPackedOrderStorage?.map(
                  (item, index) => (
                    <PanelItem
                      itemId={item.itemId}
                      key={index + 1}
                      name={item.name}
                      initialValue={item.quantity}
                      measurementUnit={item.measurementUnit}
                      quantity={0}
                    />
                  )
                )}
              </div>
            </>
          )}

        {orderData?.data?.order?.confirmOrderPickedUp &&
          orderData?.data?.order?.confirmOrderPickedUp?.length >= 1 && (
            <>
              <div style={{ marginTop: '2rem' }}>
                <Title level={4} style={{ margin: '0' }}>
                  Picked up
                </Title>
                {orderData?.data?.order?.confirmOrderPickedUp?.map(
                  (item, index) => (
                    <PanelItem
                      itemId={item.itemId}
                      key={index + 1}
                      name={item.name}
                      initialValue={item.quantity}
                      measurementUnit={item.measurementUnit}
                      quantity={0}
                    />
                  )
                )}
              </div>
            </>
          )}

        {orderData?.data?.order?.confirmDeliveredOrderBar &&
          orderData?.data?.order?.confirmDeliveredOrderBar?.length >= 1 && (
            <>
              <div style={{ marginTop: '2rem' }}>
                <Title level={4} style={{ margin: '0' }}>
                  Confirmed delivered by the bar manager
                </Title>
                {orderData?.data?.order?.confirmDeliveredOrderBar?.map(
                  (item, index) => (
                    <PanelItem
                      itemId={item.itemId}
                      key={index + 1}
                      name={item.name}
                      initialValue={item.quantity}
                      measurementUnit={item.measurementUnit}
                      quantity={0}
                    />
                  )
                )}
              </div>
            </>
          )}

        {orderData?.data?.order?.confirmDeliveredOrderDelivery &&
          orderData?.data?.order?.confirmDeliveredOrderDelivery?.length >=
            1 && (
            <>
              <div style={{ marginTop: '2rem' }}>
                <Title level={4} style={{ margin: '0' }}>
                  Confirmed delivered by the delivery team
                </Title>
                {orderData?.data?.order?.confirmDeliveredOrderDelivery?.map(
                  (item, index) => (
                    <PanelItem
                      itemId={item.itemId}
                      key={index + 1}
                      name={item.name}
                      initialValue={item.quantity}
                      measurementUnit={item.measurementUnit}
                      quantity={0}
                    />
                  )
                )}
              </div>
            </>
          )}
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
