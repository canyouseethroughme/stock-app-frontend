import { Layout, Tabs, Typography, Divider, Button, Badge, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const { Footer, Content } = Layout;
const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

export interface HomeProps {
  userName: string;
  userType: string;
  barName?: string;
  data: any;
}

const Home: React.FC<HomeProps> = ({
  userName,
  userType = "warehouse",
  barName,
}) => {
  const navigate = useNavigate();
  return (
    <Layout className="layout">
      <Content className="tabsContainer">
        <div className="centeredText">
          <Title level={3}>Hej, {userName}!</Title>
          {userType === "manager" && (
            <Title level={4}>Bar Manager: {barName}</Title>
          )}
          {userType === "warehouse" && <Title level={4}>Warehouse</Title>}
          {userType === "supply" && <Title level={4}>Supply</Title>}
        </div>
        <Divider />
        <Tabs defaultActiveKey="1">
          <TabPane tab="PENDING ORDERS" key="1">
            <OrderCard
              orderNo={1}
              orderStatus="pending"
              orderDescription=""
              orderTime="10:41"
              barName="Space Bar"
            />
            <Title className="centeredText">No orders yet</Title>
          </TabPane>
          <TabPane tab="PAST ORDERS" key="2">
            Orders history
          </TabPane>
        </Tabs>
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
        {userType === "manager" && (
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            block
            onClick={() => {
              navigate("/new-order", { replace: true });
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
  orderNo: number;
  orderTime: string;
  orderStatus: "pending" | "accepted" | "packed" | "delivering" | "delivered";
  barName: string;
  orderDescription?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  orderNo,
  orderStatus,
  orderTime,
  orderDescription,
  barName,
}) => {
  const color = useMemo(() => {
    switch (orderStatus) {
      case "pending":
        return "#7D7D7D";
      case "accepted" || "packed" || "delivering":
        return "#006FBF";
      case "delivered":
        return "#00BF4D";
    }
  }, [orderStatus]);
  return (
    <Badge.Ribbon text={orderStatus} color={color}>
      <Card title={`#${orderNo} ${orderTime}`} size="small">
        <Title level={4}>{barName}</Title>
        <Paragraph style={{ color: "grey" }}>
          {orderDescription ? orderDescription : "No description"}
        </Paragraph>
      </Card>
    </Badge.Ribbon>
  );
};
