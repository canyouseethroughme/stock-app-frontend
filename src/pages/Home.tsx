import { Layout, Tabs, Typography, Divider, Button, Badge, Card } from 'antd';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { deleteOrder, GetOrdersReturn } from '../services/orders';
import { useGetOrders } from 'src/hooks/useGetOrders';
import UserContext from 'src/contexts/UserContext';
import { getOrderStatus } from 'src/utils/getOrderStatus';
import { useQueryClient } from 'react-query';
import axios from 'axios';
import format from 'date-fns/format';
import { ManageStockTab } from '../components/ManageStockTab';

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

  const pastOrders = useMemo(() => {
    if (userData?.role === 'admin') {
      return orders?.data?.orders?.filter(
        item =>
          item.confirmDeliveredOrderBarId ||
          item.confirmDeliveredOrderDeliveryId
      );
    }

    if (userData?.role === 'bar') {
      return orders?.data?.orders?.filter(
        item => item.confirmDeliveredOrderBarId
      );
    }

    if (userData?.role === 'delivery') {
      return orders?.data?.orders?.filter(
        item => item.confirmDeliveredOrderDeliveryId
      );
    }

    if (userData?.role === 'storage') {
      return orders?.data?.orders?.filter(item => item.confirmOrderPickupId);
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
          <Button
            size='small'
            danger
            onClick={() => {
              axios.defaults.headers.common['Authorization'] = '';
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>
        <Divider />
        <Tabs defaultActiveKey='1'>
          <TabPane tab='PENDING ORDERS' key='1'>
            {activeOrders?.length ? (
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
            {pastOrders ? (
              pastOrders.map((order: GetOrdersReturn, orderIndex: any) => {
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
          {userData?.role === 'admin' && (
            <TabPane tab='MANAGE STOCK' key='3'>
              <ManageStockTab />
            </TabPane>
          )}
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
        {(userType === 'bar' || userType === 'admin') && (
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            block
            disabled={
              activeOrders &&
              activeOrders?.length >= 0 &&
              activeOrders?.some(item => item.createdBy === userData?.userId)
            }
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
  const queryClient = useQueryClient();

  const date = format(new Date(orderTime), 'dd-LL-Y / H:m');

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
        title={`#${orderNo.slice(orderNo.length - 6)} ${date}`}
        size='small'
      >
        <Title level={4}>{barName}</Title>
        <Paragraph style={{ color: 'grey' }}>
          {orderDescription ? orderDescription : 'No description'}
        </Paragraph>
        {(userType === 'bar' || userType === 'admin') &&
        orderStatus === 'pending' ? (
          <div style={{ width: '100%' }}>
            <Button
              danger
              icon={<CloseOutlined />}
              style={{ width: '35%' }}
              size='large'
              onClick={() => {
                deleteOrder(orderNo);
                queryClient.refetchQueries('getOrdersReturn');
              }}
            >
              Cancel
            </Button>
            <Button
              icon={<EditOutlined />}
              style={{ width: '65%' }}
              size='large'
              onClick={() => navigate(`/edit-order/${orderNo}`)}
            >
              Edit
            </Button>
          </div>
        ) : (
          <Button
            size='large'
            block
            onClick={() => {
              if (
                (userType === 'storage' || userType === 'admin') &&
                orderStatus === 'pending'
              ) {
                return navigate(`/confirming-order-storage/${orderNo}`);
              }

              if (
                (userType === 'storage' || userType === 'admin') &&
                orderStatus === 'accepted'
              ) {
                return navigate(`/confirming-packed-order/${orderNo}`);
              }

              if (
                (userType === 'delivery' || userType === 'admin') &&
                orderStatus === 'packed'
              ) {
                return navigate(`/confirming-picked-order/${orderNo}`);
              }

              if (
                ((userType === 'bar' || userType === 'admin') &&
                  (orderStatus === 'delivering' ||
                    orderStatus === 'delivered-delivery')) ||
                ((userType === 'delivery' || userType === 'admin') &&
                  (orderStatus === 'delivered-bar' ||
                    orderStatus === 'delivering'))
              ) {
                return navigate(`/confirm-delivered/${orderNo}`);
              }
              return navigate(`/view-order/${orderNo}`);
            }}
          >
            View order
          </Button>
        )}
      </Card>
    </Badge.Ribbon>
  );
};
