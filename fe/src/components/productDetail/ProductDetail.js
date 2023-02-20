import { Card } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Rating } from "@mui/material";
import axios from "axios";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import "./productDetail.css";

function ProductDetail() {
  const [isLoading, setLoading] = useState(false);
  let navigate = useNavigate();
  const local = window.location.origin;

  // const [data, setData] = useState([]);
  // async function getData() {
  //   let result = await axios.get(
  //     "http://localhost:8080/api/product/1/detail"
  //   );
  //   setData(result.data.data);
  // }

  const [content, setContent] = useState([]);
  const [productComment, setProductComment] = useState([]);

  const { productID } = useParams();

  const getContent = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/product/${productID}/detail`
    );
    setContent(response.data.data);
  };

  const getComment = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/product/${productID}/comment`,
    );
    setProductComment(response.data.data);
  };

  async function addFavorite(userId, productId) {
    let result = await axios.post(`http://localhost:8080/api/profile/${userId}/detail/${productId}`);
    console.log(result.data)
}

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getContent();
    getComment();
  }, []);

  const spinner = (
    <>
      <div class="d-flex justify-content-center align-items-center">
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

  return (
    <>
      <Header />
      {content &&
        content.map((v, i) => {
          return (
            <>
              <div className="productDetail">
                <div className="productDetailTop">
                  <div className="productImg">
                    <div className="card text-align-center">
                      <img
                        src={v.images}
                        className="mainImg w-50"
                        alt="image1"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      ></img>
                    </div>
                    <div className="inline-container">
                      <div class="card">
                        <img
                          src={v.images2}
                          className="subImg w-25"
                          alt="images2"
                        ></img>
                      </div>
                    </div>
                  </div>
                  <div className="productInfo">
                    <h3 className="fw-bolder">
                      {v.product_name}
                    </h3>
                    <div className="line"></div>
                    <h3 className="fw-bolder">
                      NT${v.price}
                    </h3>
                    <div className="commentsStar mb-2">
                      <Rating value={v.rate} readOnly />
                      <h5 className="rateAmount ms-3 fw-bold">
                        {v.rate} / 5 分
                      </h5>
                    </div>
                    <Link to="#">
                      <Button className="buyingBtn btn-primary text-light">
                        立即購買
                      </Button>
                    </Link>
                    <div className="addBtn">
                      <Button
                        type="text"
                        className="addFav"
                        // onClick={addFavorite(currentUser.member.id, productID)}
                      >
                        加入收藏
                      </Button>
                      <Button
                        type="link"
                        className="addCart"
                      >
                        加入購物車
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <img src="/images_old/profileImage.jpg" alt="" style={{
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "50%"
                  }} />
                  <p style={{
                    fontSize: "1.75rem"
                  }}> {v.company_name} </p>
                </div>
                <hr />
                <div className="productDetailText">
                  <div className="DetailText">
                    <h3 className="mb-4 fw-bolder">
                      {v.product_name}
                    </h3>
                    <h5 className="mb-4 fw-bolder">
                      {v.introduce}
                    </h5>
                  </div>
                </div>

                <div className="productDetailComment ">
                  <h3 className="CommentTitle fw-bolder mb-3">
                    評價總覽
                  </h3>
                  {productComment.map((v1, i1) => {
                    return (<>
                      <Card
                        hoverable
                        className="commentCard mb-3"
                      >
                        <div className="cardRow ">
                          <div className="left">
                            <div className="userImg overflow-hidden">
                              <img
                                className="userImgBorder"
                                src={`http://localhost:8080${v1.thumbnail}`}
                              />
                            </div>
                          </div>
                          <div className="middle">
                            <div className="commentsStar ">
                              <Rating value={v1.rate} readOnly />
                              <h5 className="rateAmount ms-3 fw-bold">
                                {v1.rate} / 5 分
                              </h5>
                            </div>
                            <h5 className="commentsText fw-bold">
                              {v1.comment}
                            </h5>
                          </div>
                          <div className="userInfo">
                            <div className="userid">ID : {v1.user_id}</div>
                            <div className="commentTime">
                              留言時間 : 2022-12-22
                            </div>
                          </div>
                        </div>
                      </Card>
                    </>)
                  })}
                </div>
              </div>
            </>
          );
        })}

      <Footer />
    </>
  );
}
export default ProductDetail;
