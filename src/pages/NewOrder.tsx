import {
  Layout,
  Typography,
  Divider,
  Input,
  Button,
  Collapse,
  InputNumber
} from 'antd';
import { LeftOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStorageProductsByCategory } from 'src/hooks/useStorageItems';
import { PanelItem } from 'components/PanelItem';

const { Footer, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

export interface NewOrderProps {
  barName: string;
}

export interface OrderProps {
  quantity: number;
  name: string;
  measurementUnit: string;
}

const NewOrder: React.FC<NewOrderProps> = ({ barName }) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderProps[]>([]);

  const { isLoading: isStorageProducstLoadin, data: storageItems } =
    useStorageProductsByCategory({ enabled: true });

  const getPanelValue = (
    reqQuantity: number,
    brandName: string,
    measurementUnit: string
  ) => {
    const itemIndex = order.findIndex(o => o.name === brandName);
    if (itemIndex >= 0) {
      setOrder(prevState => {
        const newList = [...prevState];
        newList[itemIndex] = {
          ...newList[itemIndex],
          quantity: reqQuantity,
          measurementUnit
        };
        return newList;
      });
    } else {
      setOrder(prevState => [
        ...prevState,
        { quantity: reqQuantity, name: brandName, measurementUnit }
      ]);
    }
  };

  const getInitialValue = (brandName: string): number => {
    const item = order.find(i => i.name === brandName);
    if (item) {
      return item.quantity;
    }
    return 0;
  };

  useEffect(() => {
    const orderSession = sessionStorage['order'] ?? null;
    const parsedOrder: OrderProps[] = JSON.parse(orderSession);
    parsedOrder !== null && setOrder(parsedOrder);
  }, []);

  return (
    <Layout className='layout'>
      <Content>
        <div className='flex-row'>
          <Button
            type='text'
            size='large'
            onClick={() => {
              sessionStorage.removeItem('order');
              navigate('/', { replace: true });
            }}
          >
            <LeftOutlined />
          </Button>
          <Title level={4} style={{ margin: '0' }}>
            Creating order for: {barName}
          </Title>
        </div>
        <Divider />
        <Search placeholder='Search for a product' />

        <div style={{ overflowY: 'scroll', paddingBottom: '6rem' }}>
          <Collapse defaultActiveKey={['1']} style={{ marginTop: '1rem' }}>
            {storageItems?.data.items.map((item, index) => {
              return (
                <Panel header={item.category.toUpperCase()} key={index + 1}>
                  {item.brands.map(brand => {
                    return (
                      <PanelItem
                        key={brand.name}
                        moreThanInitial={true}
                        name={brand.name}
                        enableEdit={true}
                        initialValue={getInitialValue(brand.name)}
                        measurementUnit={brand.measurementUnit}
                        quantity={brand.quantity}
                        getValue={reqQuantity =>
                          getPanelValue(
                            reqQuantity,
                            brand.name,
                            brand.measurementUnit
                          )
                        }
                      />
                    );
                  })}
                </Panel>
              );
            })}
          </Collapse>
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
            disabled={!order.length}
            onClick={() => {
              sessionStorage.setItem(
                'order',
                JSON.stringify(order.filter(i => i.quantity !== 0))
              );
              navigate('/confirming-order', { replace: true });
            }}
          >
            Next
          </Button>
        </div>
      </Footer>
    </Layout>
  );
};

export default NewOrder;
