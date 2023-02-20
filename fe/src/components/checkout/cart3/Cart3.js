import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import OrderInfo from "./orderInfo/OrderInfo";
import Step from "../step/Step";
import CartNull from "../cartNull/CartNull";
import CartTable from "./cartTable/CartTable";
import axios from "axios";

import "./Cart3.css";

function CartThree() {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);

  // const {  couponAmount } = useData();

  useEffect(() => {
    async function getContent(){
      const response = await axios.get(`http://localhost:8080/api/createOrder`)
      setContent(response.data[0][0]);
      console.log(response.data[0][0])
    }
    getContent();
  }, []);

  const [cart, setCart] = useState(
    window.localStorage.getItem("cart") !== null ? JSON.parse(window.localStorage.getItem("cart")) : []
  );
  if (
    window.localStorage.getItem("cart") === null ||
    cart.length === 0
  ) {
    return (
      <>
        <CartNull />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="cart-three">
        <Step />
        <div className="comment border d-flex justify-content-between align-items-center mb-5">
          <div className="text">
            <p className="fw-bolder fs-4 mb-0">
              我們在等待你的評價！
            </p>
            <p className="fs-5 mb-0">
              喜歡之前購買的商品嗎？給我們一個好評吧！
            </p>
          </div>
          <Link to={`/${content.user_id}/orders/${content.id}`} >
            <Button className="btn btn-secondary w-10 px-4 fw-bold">
              評價
            </Button>
          </Link>
        </div>
        <CartTable />
        <OrderInfo />
      </div>
      <Footer />
    </>
  );
}

export default CartThree;
