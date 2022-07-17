import {
  Layout,
  Typography,
  Divider,
  Input,
  Button,
  Collapse,
  InputNumber,
} from "antd";
import { LeftOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStorageProductsByCategory } from "src/hooks/useStorageItems";
import { PanelItem } from "../components/PanelItem";
import { useGetOrderById } from "src/hooks/useGetOrderById";
import TextArea from "antd/lib/input/TextArea";
import { editOrder } from "../services/orders";

const { Footer, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

export interface EditOrderProps {
  barName?: string;
}

export interface OrderProps {
  itemId: string;
  quantity: number;
  name: string;
  measurementUnit: string;
}

const EditOrder: React.FC<EditOrderProps> = ({ barName }) => {
  const navigate = useNavigate();
  let { orderId } = useParams();

  const [order, setOrder] = useState<OrderProps[]>([]);
  const [comment, setComment] = useState<string>();

  const { data: orderData, isLoading } = useGetOrderById({
    id: orderId as string,
  });

  const { isLoading: isStorageProducstLoadin, data: storageItems } =
    useStorageProductsByCategory({ enabled: true });

  const getPanelValue = (
    reqQuantity: number,
    brandName: string,
    measurementUnit: string,
    itemId: string
  ) => {
    const itemIndex = order.findIndex((o) => o.name === brandName);
    if (itemIndex >= 0) {
      setOrder((prevState) => {
        const newList = [...prevState];
        newList[itemIndex] = {
          ...newList[itemIndex],
          quantity: reqQuantity,
          measurementUnit,
        };
        return newList;
      });
    } else {
      setOrder((prevState) => [
        ...prevState,
        { quantity: reqQuantity, name: brandName, measurementUnit, itemId },
      ]);
    }
  };

  const getInitialValue = (brandName: string): number => {
    const item = order.find((i) => i.name === brandName);
    if (item) {
      return item.quantity;
    }
    return 0;
  };

  useEffect(() => {
    orderData?.data.order.orderedItems &&
      setOrder(orderData?.data.order.orderedItems);

    orderData?.data.order.comment && setComment(orderData?.data.order.comment);
  }, [orderData]);

  return (
    <Layout className="layout">
      <Content>
        <div className="flex-row">
          <Button
            type="text"
            size="large"
            onClick={() => {
              sessionStorage.removeItem("order");
              navigate("/", { replace: true });
            }}
          >
            <LeftOutlined />
          </Button>
          <Title level={4} style={{ margin: "0" }}>
            Creating order for: {barName}
          </Title>
        </div>
        <Divider />
        <Search placeholder="Search for a product" />

        <div style={{ overflowY: "scroll", paddingBottom: "2rem" }}>
          <Collapse defaultActiveKey={["1"]} style={{ marginTop: "1rem" }}>
            {storageItems?.data.items.map((item, index) => {
              return (
                <Panel header={item.category.toUpperCase()} key={index + 1}>
                  {item.brands.map((brand) => {
                    return (
                      <PanelItem
                        key={brand.name}
                        itemId={brand._id}
                        moreThanInitial={true}
                        name={brand.name}
                        enableEdit={true}
                        initialValue={getInitialValue(brand.name)}
                        measurementUnit={brand.measurementUnit}
                        quantity={brand.quantity}
                        getValue={(reqQuantity) =>
                          getPanelValue(
                            reqQuantity,
                            brand.name,
                            brand.measurementUnit,
                            brand._id
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
        <div style={{ paddingBottom: "7rem" }}>
          <Title level={5} style={{ margin: "0" }}>
            Add comment to order
          </Title>
          <TextArea
            value={comment}
            showCount
            maxLength={100}
            rows={4}
            className="confirmTextarea"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </Content>

      <Footer
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          paddingBottom: "40px",
        }}
      >
        <div className="flex-row">
          <Button
            danger
            size="large"
            style={{ marginRight: "1rem" }}
            onClick={() => {
              sessionStorage.removeItem("order");
              navigate("/", { replace: true });
            }}
          >
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            block
            disabled={!order.length}
            onClick={async () => {
              orderId && (await editOrder(orderId, order, comment));
              console.log(order, orderId, comment);
              navigate("/");
            }}
          >
            Save changes
          </Button>
        </div>
      </Footer>
    </Layout>
  );
};

export default EditOrder;
