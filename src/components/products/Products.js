import { Breadcrumb, Layout, theme } from "antd";
import React from "react";
import ProductContent from "./product/Product";
import { Col, Row } from "antd";
import { FilterFilled } from "@ant-design/icons";
import FiterBrand from "./fiter/FiterBrand";
import FilterPrice from "./fiter/FilterPrice";
import FiterRates from "./fiter/FiterRates";

const { Content, Sider } = Layout;

const Products = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Layout>
        <Sider
          width={200}
          style={{
            background: "black",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <FilterFilled
            style={{
              fontSize: "1.3rem",
            }}
          />
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            條件篩選
          </span>
          <br />
          <FiterBrand />
          <hr />
          <FilterPrice />
          <hr />
          <FiterRates />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>所有商品</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {new Array(20).fill(0).map(() => {
                return (
                  <Col
                    className="gutter-row"
                    style={{
                      marginBottom: "1.5rem",
                    }}
                  >
                    <ProductContent />
                  </Col>
                );
              })}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Products;
