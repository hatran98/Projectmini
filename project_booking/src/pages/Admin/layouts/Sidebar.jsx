import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ForkOutlined,
  FundViewOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/user";
const { Header, Sider, Content } = Layout;
const Sidebar = (props) => {
  const navigate = useNavigate();
  const { content, seletectedKeys } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //   {
  //     key: "3.1",
  //     label: "Danh sách",
  //     icon: <i className="fa-solid fa-list"></i>,
  //     onClick: () => {
  //       navigate("/admin/doctor");
  //     },
  //   },
  //   ,
  //   {
  //     key: "3.2",
  //     label: "Tạo mới",
  //     icon: <i className="fa-solid fa-plus"></i>,
  //     onClick: () => {
  //       navigate("/admin/doctor/add");
  //     },
  //   },
  // ];
  const adminItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Bảng điều khiển",
      onClick: () => {
        navigate("/admin/dashboard");
      },
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Quản lý người dùng",
      onClick: () => {
        navigate("/admin/user");
      },
    },
    {
      key: "3",
      icon: <ForkOutlined />,
      label: "Quản lý bác sĩ",
      onClick: () => {
        navigate("/admin/doctor");
      },
    },
  ];
  const items = [
    {
      key: "1",
      label: <a>Đăng xuất</a>,
      onClick: () => {
        localStorage.removeItem("access_token");
        navigate("/login");
      },
    },
  ];
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={!collapsed}
        breakpoint="xl"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[seletectedKeys]}
          items={
            user.role === "admin"
              ? adminItems
              : user.role === "doctor"
              ? [
                  {
                    key: "4",
                    icon: <FundViewOutlined />,
                    label: "Quản lý lịch đặt",
                    onClick: () => {
                      navigate("/admin/booking");
                    },
                  },
                  {
                    key: "5",
                    icon: <i className="fa-solid fa-person"></i>,
                    label: "Quản lý tài khoản",
                    onClick: () => {
                      navigate("/admin/account");
                    },
                  },
                ]
              : []
          }
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-between items-center">
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
            <Dropdown
              placement="bottomRight"
              arrow
              trigger={["click"]}
              overlayStyle={{
                borderRadius: borderRadiusLG,
              }}
              className="mr-4"
              menu={{
                items,
              }}
            >
              <a
                onClick={(e) => e.preventDefault()}
                className="flex justify-between items-center"
              >
                <Avatar src={<img src={user.image} alt="avatar" />} />
                <p className="font-semibold ml-2">{user.name}</p>
              </a>
            </Dropdown>
          </div>
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
