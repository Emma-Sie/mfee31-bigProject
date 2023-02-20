import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingFilled,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { HiOutlineTicket } from "react-icons/hi";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const App = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Link
          to="/"
          style={{
            color: "white",
            padding: "5px 10px",
            fontSize: "3.5rem",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              color: "#FB570B",
            }}
          >
            電競
          </span>
          人
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: (
                <Link
                  to="/dashboard/userList"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  會員管理
                </Link>
              ),
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: (
                <Link
                  to="/dashboard/orderSeller"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  訂單管理
                </Link>
              ),
            },
            {
              key: "3",
              icon: <ShoppingFilled />,
              label: (
                <Link
                  to="/dashboard/productList"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  商品管理
                </Link>
              ),
            },
            {
              key: "4",
              icon: <HiOutlineTicket />,
              label: (
                <Link
                  to="/dashboard/couponSeller"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  優惠券管理
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed
              ? MenuUnfoldOutlined
              : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: 1550,
            background: colorBgContainer,
          }}
        >
          {props.children}
          {/* <h3 className="fw-bolder">Hi,歡迎來到電競人後台中心！</h3>
          <h4 className="fw-bolder">請點擊左方至各項管理列表</h4> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
