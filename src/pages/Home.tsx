import { Layout, Tabs, Typography, Divider, Button } from "antd";
import {
  PlusOutlined,
  BoxPlotOutlined,
  DropboxOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;
const { Title, Paragraph, Text, Link } = Typography;

export interface HomeProps {
  userName: string;
  userType: string;
  // barType?: 'space' | 'vessel' | 'astral';
  barName?: string;
  data: any;
}

const Home: React.FC<HomeProps> = ({
  userName,
  userType = "warehouse",
  barName,
  data,
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
            <Title className="centeredText">No orders yet</Title>
          </TabPane>
          <TabPane tab="PAST ORDERS" key="2">
            Orders history
          </TabPane>
        </Tabs>
      </Content>
      <Footer>
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
