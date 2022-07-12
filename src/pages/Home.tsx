import { Layout, Tabs, Typography, Divider, Button, Badge, Card } from 'antd';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useMemo } from 'react';
import { getOrders, GetOrdersReturn } from '../services/orders';
import { useGetOrders } from 'src/hooks/useGetOrders';
import UserContext from 'src/contexts/UserContext';
import { getOrderStatus } from 'src/utils/getOrderStatus';

const { Footer, Content } = Layout;
const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

export interface HomeProps {
  userName: string;
  userType: string;
  barName?: string;
  data: any;
}

const Home: React.FC<HomeProps> = ({ userName, userType, barName }) => {
  const navigate = useNavigate();

  const { isLoading, data: orders } = useGetOrders();
  console.log('🚀 ~ file: Home.tsx ~ line 29 ~ orders', orders);
  console.log(orders?.data.orders);

  const { userData } = useContext(UserContext);

  const activeOrders = useMemo(() => {
    if (userData?.role === 'admin') {
      return orders?.data?.orders?.filter(
        item =>
          !item.confirmDeliveredOrderBarId ||
          !item.confirmDeliveredOrderDeliveryId
      );
    }
    if (userData?.role === 'bar') {
      return orders?.data?.orders?.filter(
        item => !item.confirmDeliveredOrderBarId
      );
    }

    if (userData?.role === 'delivery') {
      return orders?.data?.orders?.filter(
        item => !item.confirmDeliveredOrderDeliveryId
      );
    }

    if (userData?.role === 'storage') {
      return orders?.data?.orders?.filter(item => !item.confirmOrderPickupId);
    }
  }, [userData?.role, orders]);

  return (
    <Layout className='layout'>
      <Content className='tabsContainer'>
        <div className='centeredText'>
          <Title level={3}>Hej, {userName}!</Title>
          {userType === 'bar' && (
            <Title level={4}>Bar Manager: {barName}</Title>
          )}
          {userType === 'storage' && <Title level={4}>Storage</Title>}
          {userType === 'delivery' && <Title level={4}>Delivery</Title>}
        </div>
        <Divider />
        <Tabs defaultActiveKey='1'>
          <TabPane tab='PENDING ORDERS' key='1'>
            {activeOrders ? (
              activeOrders.map((order: GetOrdersReturn, orderIndex: any) => {
                return (
                  <OrderCard
                    key={orderIndex}
                    orderNo={order._id}
                    orderStatus={getOrderStatus(order)}
                    orderDescription={order.comment}
                    orderTime={order.createdAt}
                    barName={order.barName}
                    userType={userData?.role}
                  />
                );
              })
            ) : (
              <Title className='centeredText'>No orders yet</Title>
            )}
          </TabPane>
          <TabPane tab='PAST ORDERS' key='2'>
            Orders history
          </TabPane>
        </Tabs>
      </Content>
      <Footer
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          paddingBottom: '40px'
        }}
      >
        {userType === 'bar' && (
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            block
            onClick={() => {
              navigate('/new-order', { replace: true });
            }}
          >
            New order
          </Button>
        )}
      </Footer>
    </Layout>
  );
};

export default Home;

////////////////////////////////// TODO: Move to separate file //////////////////

interface OrderCardProps {
  orderNo: string;
  orderTime: string;
  orderStatus:
    | 'pending'
    | 'accepted'
    | 'packed'
    | 'delivering'
    | 'delivered-delivery'
    | 'delivered-bar'
    | 'delivered';
  barName: string;
  orderDescription?: string;
  userType?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  orderNo,
  orderStatus,
  orderTime,
  orderDescription,
  barName,
  userType
}) => {
  const navigate = useNavigate();

  const color = useMemo(() => {
    switch (orderStatus) {
      case 'pending':
        return '#7D7D7D';
      case 'accepted' ||
        'packed' ||
        'delivering' ||
        'delivered-delivery' ||
        'delivered-bar':
        return '#006FBF';
      case 'delivered':
        return '#00BF4D';
    }
  }, [orderStatus]);

  console.log('item -=. ', orderStatus);
  return (
    <Badge.Ribbon
      text={
        orderStatus === 'delivered-bar' || orderStatus === 'delivered-delivery'
          ? '1/2 delivered'
          : orderStatus
      }
      color={color}
    >
      <Card
        title={`#${orderNo.slice(orderNo.length - 6)} ${orderTime}`}
        size='small'
      >
        <Title level={4}>{barName}</Title>
        <Paragraph style={{ color: 'grey' }}>
          {orderDescription ? orderDescription : 'No description'}
        </Paragraph>
        {userType === 'bar' && orderStatus === 'pending' ? (
          <div style={{ width: '100%' }}>
            <Button
              danger
              icon={<CloseOutlined />}
              style={{ width: '35%' }}
              size='large'
            >
              Cancel
            </Button>
            <Button
              icon={<EditOutlined />}
              style={{ width: '65%' }}
              size='large'
            >
              Edit
            </Button>
          </div>
        ) : (
          <Button
            size='large'
            block
            onClick={() => {
              if (userType === 'storage' && orderStatus === 'pending') {
                return navigate(`/confirming-order-storage/${orderNo}`);
              }

              if (userType === 'storage' && orderStatus === 'accepted') {
                return navigate(`/confirming-packed-order/${orderNo}`);
              }

              if (userType === 'delivery' && orderStatus === 'packed') {
                return navigate(`/confirming-picked-order/${orderNo}`);
              }

              if (
                (userType === 'bar' &&
                  (orderStatus === 'delivering' ||
                    orderStatus === 'delivered-delivery')) ||
                (userType === 'delivery' &&
                  (orderStatus === 'delivered-bar' ||
                    orderStatus === 'delivering'))
              ) {
                return navigate(`/confirm-delivered/${orderNo}`);
              }
            }}
          >
            View order
          </Button>
        )}
      </Card>
    </Badge.Ribbon>
  );
};
