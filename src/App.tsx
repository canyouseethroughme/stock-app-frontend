import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Input, Button, Typography } from "antd";
import Home from "./pages/Home";
import NewOrder from "./pages/NewOrder";
import ConfirmingOrder from "./pages/ConfirmingOrder";

const { Title } = Typography;
const { Content } = Layout;

const App: React.FC = () => {
  const loggedIn = true;
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Home
                userName="Alin"
                barName="Space Bar"
                userType="manager"
                data=""
              />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/new-order" element={<NewOrder barName="Space Bar" />} />
        <Route path="/confirming-order" element={<ConfirmingOrder />} />
      </Routes>
    </div>
  );
};

export default App;

////////////////////////////////// TODO: Move to separate file //////////////////

export const Login: React.FC = () => {
  return (
    <Layout className="layout">
      <Content>
        <div className="flex-column centerDiv">
          <Title level={5}>WELCOME TO</Title>
          <Title level={3} style={{ margin: "0 0 2rem 0" }}>
            KUNE Festival Bar Stock App
          </Title>

          <Input
            placeholder="username"
            size="large"
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="password"
            type="password"
            size="large"
            style={{ marginBottom: "1rem" }}
          />

          <Button size="large" type="primary" block>
            LOGIN
          </Button>
        </div>
      </Content>
    </Layout>
  );
};
