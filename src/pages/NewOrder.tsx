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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const { Footer, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

export interface NewOrderProps {
  barName: string;
}

interface Order {
  quantity: number;
  name: string;
}

const NewOrder: React.FC<NewOrderProps> = ({ barName }) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order[]>([]);

  const getPanelValue = (reqQuantity: number, brandName: string) => {
    const itemIndex = order.findIndex((o) => o.name === brandName);
    if (itemIndex >= 0) {
      setOrder((prevState) => {
        const newList = [...prevState];
        newList[itemIndex] = {
          ...newList[itemIndex],
          quantity: reqQuantity,
        };
        return newList;
      });
    } else {
      setOrder((prevState) => [
        ...prevState,
        { quantity: reqQuantity, name: brandName },
      ]);
    }
  };

  return (
    <Layout className="layout">
      <Content>
        <div className="flex-row">
          <Button
            type="text"
            size="large"
            onClick={() => navigate("/", { replace: true })}
          >
            <LeftOutlined />
          </Button>
          <Title level={4} style={{ margin: "0" }}>
            Creating order for: {barName}
          </Title>
        </div>
        <Divider />
        <Search placeholder="Search for a product" />
        <div style={{ overflow: "scroll", paddingBottom: "6rem" }}>
          <Collapse defaultActiveKey={["1"]} style={{ marginTop: "1rem" }}>
            {data.map((item, index) => {
              return (
                <Panel header={item.category.toUpperCase()} key={index + 1}>
                  {item.brands.map((brand) => {
                    return (
                      <PanelItem
                        key={brand.name}
                        name={brand.name}
                        measurementUnit={brand.measurementUnit}
                        quantity={brand.quantity}
                        getValue={(reqQuantity) =>
                          getPanelValue(reqQuantity, brand.name)
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
            onClick={() => navigate("/", { replace: true })}
          >
            Cancel
          </Button>
          <Button size="large" type="primary" block disabled={!order.length}>
            Next
          </Button>
        </div>
      </Footer>
    </Layout>
  );
};

export default NewOrder;

interface PanelItemProps {
  name: string;
  measurementUnit: string;
  quantity: string;
  getValue?: (value: number) => void;
}

const PanelItem: React.FC<PanelItemProps> = ({
  name,
  measurementUnit,
  quantity,
  getValue,
}) => {
  const [value, setValue] = useState<number>(0);
  return (
    <>
      <div
        className="flex-row"
        style={{
          paddingTop: ".5rem",
          justifyContent: "space-between",
        }}
      >
        <div className="flex-column">
          <Title level={5}>{name}</Title>
          <Paragraph style={{ color: "grey" }}>{measurementUnit}</Paragraph>
        </div>
        <div className="flex-column">
          <div className="flex-row">
            <Button
              type="text"
              size="small"
              disabled={value === 0}
              onClick={() => {
                setValue(value - 1);
                getValue && getValue(value - 1);
              }}
            >
              <MinusOutlined />
            </Button>

            <InputNumber
              value={value}
              max={9}
              min={0}
              style={{ width: "2rem" }}
            />

            <Button
              type="text"
              size="small"
              disabled={value === 9}
              onClick={() => {
                setValue(value + 1);
                getValue && getValue(value + 1);
              }}
            >
              <PlusOutlined />
            </Button>
          </div>
          <Paragraph style={{ color: "grey", textAlign: "center" }}>
            {quantity}
          </Paragraph>
        </div>
      </div>
      <Divider style={{ margin: "0" }} />
    </>
  );
};

const data = [
  {
    category: "beer",
    brands: [
      {
        name: "Tuborg Green",
        measurementUnit: "Case of 24",
        quantity: "330 left",
      },
      {
        name: "Tuborg Gold",
        measurementUnit: "Case of 24",
        quantity: "30 left",
      },
      {
        name: "Skol",
        measurementUnit: "Case of 24",
        quantity: "33 left",
      },
    ],
  },
  {
    category: "soda",
    brands: [
      {
        name: "Coca Cola",
        measurementUnit: "Case of 24",
        quantity: "330 left",
      },
      {
        name: "Fanta Orange",
        measurementUnit: "Case of 24",
        quantity: "320 left",
      },
      {
        name: "Fanta Dude",
        measurementUnit: "Case of 24",
        quantity: "133 left",
      },
    ],
  },
];
