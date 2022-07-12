import { Layout, Typography, Input, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { postCreateOrder } from '../services/orders';
import { useQueryClient } from 'react-query';
import { useGetOrders } from 'src/hooks/useGetOrders';
import UserContext from 'src/contexts/UserContext';
import { PanelItem } from '../components/PanelItem';

const { Footer, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

export interface CreateOrderType {
  itemId: string;
  quantity: number;
  name: string;
  measurementUnit: string;
}

const ConfirmingOrder: React.FC = () => {
  const navigate = useNavigate();
  const [confirmingOrder, setConfirmingOrder] = useState<CreateOrderType[]>([]);
  const [comment, setComment] = useState<string>();

  const { userData } = useContext(UserContext);
  let { orderId } = useParams();

  const queryClient = useQueryClient();
  const { isLoading, data: orders } = useGetOrders();

  useEffect(() => {
    const orderSession = sessionStorage['order'] ?? null;
    const parsedOrder = JSON.parse(orderSession);
    parsedOrder !== null && setConfirmingOrder(parsedOrder);
  }, [userData, orders, orderId]);

  // console.log('this is ', confirmingOrder);

  return (
    <Layout className='layout'>
      <Content>
        <div className='flex-column' style={{ paddingBottom: '7rem' }}>
          <div className='flex-row'>
            <Button
              type='text'
              size='large'
              onClick={() => navigate('/new-order', { replace: true })}
            >
              <LeftOutlined />
            </Button>
            <Title level={4} style={{ margin: '0' }}>
              Order summary
            </Title>
          </div>
          <div style={{ marginTop: '1rem' }}>
            {confirmingOrder.map((item, index) => (
              <PanelItem
                key={index + 1}
                name={item.name}
                initialValue={item.quantity}
                measurementUnit={item.measurementUnit}
                quantity={0}
              />
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Title level={5} style={{ margin: '0' }}>
              Add comment to order
            </Title>
            <TextArea
              showCount
              maxLength={100}
              rows={4}
              className='confirmTextarea'
              onChange={e => setComment(e.target.value)}
            />
          </div>
        </div>
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
        <div className='flex-row'>
          {userData?.role === 'bar' && (
            <>
              <Button
                danger
                size='large'
                style={{ marginRight: '1rem' }}
                onClick={() => {
                  sessionStorage.removeItem('order');
                  navigate('/', { replace: true });
                }}
              >
                Cancel
              </Button>
              <Button
                size='large'
                type='primary'
                block
                onClick={async () => {
                  await postCreateOrder({
                    orderedItems: confirmingOrder,
                    comment
                  });
                  queryClient.refetchQueries('getOrdersReturn');
                  sessionStorage.removeItem('order');
                  navigate('/', { replace: true });
                }}
              >
                Confirm order
              </Button>
            </>
          )}

          {userData?.role === 'storage' && (
            <Button size='large' block type='primary' onClick={() => {}}>
              Accept Order
            </Button>
          )}
        </div>
      </Footer>
    </Layout>
  );
};

export default ConfirmingOrder;
