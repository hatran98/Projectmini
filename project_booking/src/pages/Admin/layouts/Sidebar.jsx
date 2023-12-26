import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ForkOutlined,
  FundViewOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const Sidebar = (props) => {
  const navigate = useNavigate();
  const { content, seletectedKeys } = props;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100vh" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={seletectedKeys}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Dashboard",
              onClick: () => {
                navigate("/admin/dashboard");
              },
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "User",
              onClick: () => {
                navigate("/admin/user");
              },
            },
            {
              key: "3",
              icon: <ForkOutlined />,
              label: "Doctor",
              onClick: () => {
                navigate("/admin/doctor");
              },
            },
            {
              key: "4",
              icon: <FundViewOutlined />,
              label: "Booking",
              onClick: () => {
                navigate("/admin/booking");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
