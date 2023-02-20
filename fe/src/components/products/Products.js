import { Breadcrumb, Layout, theme } from "antd";
import { Button } from "react-bootstrap";
import React from "react";
import Header from "../header/Header";
import ProductContent from "./product/Product";
import { FilterFilled } from "@ant-design/icons";
import FiterBrand from "./fiter/FiterBrand";
import FilterPrice from "./fiter/FilterPrice";
import FiterRates from "./fiter/FiterRates";
import CategoryFilter from "./CategoryFilter";
import axios from "axios";

//照片輪播
import Carousel from "react-bootstrap/Carousel";
import picFirst from "./categoryImg/pic1.png";
import picSecond from "./categoryImg/pic2.png";
import picThird from "./categoryImg/pic3.png";

import picHandsome from "./categoryImg/picHandsome.webp";

import "./products.scss";
import { useState, useEffect } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

const { Content, Sider } = Layout;

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const [page, setPage] = useState(
    parseInt(currentPage, 10) || 1
  );
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        `http://localhost:8080/api/product?page=${page}`
      );
      setData(response.data.data);
      setTotalPage(response.data.pagination.totalPage);
    }
    getData();
  }, [page]);

  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            display: "inline-block",
            margin: "2px",
            backgroundColor: page === i ? "#fb570b" : "",
            borderColor: page === i ? "#fb570b" : "#dbdbdb",
            color: page === i ? "#fff" : "#363636",
            borderWidth: "1px",
            width: "28px",
            height: "28px",
            borderRadius: "3px",
            textAlign: "center",
            cursor: "pointer",
          }}
          key={i}
          onClick={(e) => {
            setPage(i);
            navigate(`?page=${i}`);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  const spinner = (
    <>
      <div class="d-flex justify-content-start align-items-center p-3">
        <div
          className="spinner-grow text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
        <div
          className="spinner-grow text-secondary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
        <div
          className="spinner-grow text-success"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    </>
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header />
      {isLoading ? (
        spinner
      ) : (
        <Layout>
          <Sider
            className="sidebar"
            width={200}
            style={{
              background: "black",
              marginTop: "0",
              paddingTop: "3rem",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <FilterFilled
              style={{
                paddingLeft: "10px",
                paddingBottom: "20px",
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
            <div className="displayFilter">
              <div className="upFilter">
                <div>
                  <Button className="btnChoose">
                    價格
                  </Button>
                </div>
                <div>
                  <Button className="btnCondition">
                    條件篩選
                  </Button>
                </div>
              </div>
            </div>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              {/* 賣家的賣場的畫面 */}
              {/* <div className="upperBoxOutside">
                <div className="boxInside">
                  <div className="avatar">
                    <div className="avatarImg">
                      <img src={picHandsome} alt="" />
                    </div>
                  </div>
                  <div className="avatarSide">
                    <div>
                      <h1
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          paddingTop: "20px",
                          textAlign: "end",
                        }}
                      >
                        Allen's Company
                      </h1>
                      <div
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          paddingTop: "20px",
                          textAlign: "end",
                        }}
                      >
                        商品數量 : 300
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* 不分賣家就放輪播的畫面 */}
              <div className="upperBoxOutside2">
                <div className="carouselProduct">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="CarouselPage"
                        src={picFirst}
                        alt="Razer Naga V2 Pro"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="CarouselPage"
                        src={picSecond}
                        alt="ROG Strix Scope NX"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="CarouselPage"
                        src={picThird}
                        alt="ROG Strix Scope NX"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>
              </div>

              {/* 商品分類篩選 */}
              <div className="cateGory">
                <CategoryFilter />
              </div>

              <div className="cardOutside">
                {data &&
                  data.map((v, i) => {
                    return (
                      <div
                        className="card-shadow-hover"
                        key={v.id}
                      >
                        <ProductContent
                          id={v.id}
                          name={v.product_name}
                          images={v.images}
                          price={v.price}
                          storage={v.storage}
                          rate={v.rate}
                          favorites={v.favorites}
                        />
                      </div>
                    );
                  })}
              </div>
            </Content>
            <ul
              style={{
                margin: "0 auto",
              }}
            >
              {isLoading ? <></> : getPages()}
            </ul>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
};
export default Products;
