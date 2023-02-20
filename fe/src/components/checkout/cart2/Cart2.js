import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import CartTable from "./cartTable/CartTable";
import CartInfo2 from "./cartInfo2/CartInfo2";
import CartInfo3 from "./cartInfo3/CartInfo3";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Step from "../step/Step";
import CartNull from "../cartNull/CartNull";

import "./Cart2.css";
import { useData } from "../../../utils/useData";
import { useAuth } from "../../../utils/useAuth";

function CartTwo() {
  const navigate = useNavigate();
  const { ShippingWays, coupon, values, store, orderMemo } = useData();
  const {currentUser} =useAuth();

  const couponAmount = coupon.couponValue;
  const [cart, setCart] = useState(
    window.localStorage.getItem("cart") !== null ? JSON.parse(window.localStorage.getItem("cart")) : []
  );
  const [cart_total, setCart_Total] = useState(0);

  useEffect(() => {
    let total = cart.reduce((acc, cur) => {
      return acc + Number(cur.price) * Number(cur.amount);
    }, 0);
    setCart_Total(total);
    // const product_id = cart[0].id;
  }, [cart]);

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

  // 成立訂單送後端
  const recip_name = values.name;
  const recip_phone = values.phone;
  const recip_address = values.address || store.storeAddress;
  const delivery_way = ShippingWays.ship || ShippingWays.overseaShip;
  const payment_method = ShippingWays.payment || ShippingWays.overseaPayment;
  const finalCartTotal = Number(cart_total) + Number(100)+ Number(couponAmount)
console.log(delivery_way)
console.log(payment_method)
console.log(recip_address)

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await axios.post(
      `http://localhost:8080/api/createOrder`,
      {
        finalCartTotal,
        recip_name, 
        recip_phone, 
        recip_address,
        ShippingWays,


        delivery_way,
        payment_method,
        cart,
        currentUser,
      }
    );
    // setNewOrderId(getOrderId[0].id)
    // let getOrderId =await axios.get(`http://localhost:8080/api/createOrder`)  
    // console.log(getOrderId);
    console.log(response);
    console.log(response.data.orderId);
    navigate("/cart3")
  }

  return (
    <>
      <Header />
      <div className="cart-two">
        <div className="content">
          <Step />
          {/* part1 */}
          <CartTable />
          {/* part2 */}
          <CartInfo2 />
          {/* part3 */}
          <CartInfo3 />
        </div>

        <div className="CartSubmit d-flex justify-content-between">
          <Link
            to="/cart"
            className="back text-dark fw-border text-decoration-none"
          >
            <AiOutlineArrowLeft />
            返回購物車
          </Link>
          <button className="submitOrderBtn btn-secondary text-light" onClick={handleSubmit} >
            提交訂單
          </button>
          <div></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartTwo;
