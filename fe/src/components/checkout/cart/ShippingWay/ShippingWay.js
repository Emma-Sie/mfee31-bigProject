import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

import ShipBoard from "./ShipBoard";
import ShipTW from "./ShipTW";
import { useData } from "../../../../utils/useData";
import AuthService from "../../../../services/auth";
import { useAuth } from "../../../../utils/useAuth";
import Coupon from "../../../coupon/Coupon";


function ShippingWay({ cart, cartTotal }) {
  // 選擇送貨及付款方式
  const { ShippingWays, setShippingWays } = useData();

  // 優惠折扣
  const { coupon, setCoupon } = useData();
  const couponAmount = coupon.couponValue;

  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    // async function getCart() {
    //   let response = await axios.get(
    //     "http://localhost:8080/api/payment_type"
    //   );
    //   setPaymentData(response.data);
    //   console.log(response.data);
    // }
    // getCart();
  }, []);

  const handleCoupon = (value) => {
    setCoupon({ ...coupon, couponValue: value });
  };

  const handleDeliverySelect = (e) => {
    setShippingWays({ ...ShippingWays, location: e });
  };

  const handlePaymentSelect = (e) => {
    setShippingWays({...ShippingWays,payment: e,
      overseaShip: "",
      overseaPayment: "",
    });
  };

  const handleSelect = (e) => {
    setShippingWays({
      ...ShippingWays,
      ship: e,
      // overseaShip: "",
      // overseaPayment: "",
    });
  };

  const handleOverseaSelect = (e) => {
    setShippingWays({
      ...ShippingWays,
      overseaShip: e,
      ship: "",
      payment:""
    });
  };

  const handlePaymentOverseaSelect = (e) => {
    setShippingWays({
      ...ShippingWays,
      overseaPayment: e,
      ship: "",
      payment:"",
    });
  };

  const ShipTWSelect = <><ShipTW
    island={ShippingWays.ship}
    payment={ShippingWays.payment}
    handleIslandSelect={handleSelect}
    handlePaymentSelect={handlePaymentSelect}
  /></>
  const ShipBoardSelect = <><ShipBoard
    oversea={ShippingWays.overseaShip}
    paymentOversea={ShippingWays.overseaPayment}
    handleOverseaSelect={handleOverseaSelect}
    handlePaymentOverseaSelect={
      handlePaymentOverseaSelect
    }
  /></>

  // 確認是否已登入，否則跳轉至登入畫面
  const { currentUser, setCurrentUser } = useAuth();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const content = { message: "", login: true }

  const isLoggedIn = (e) => {
    if (currentUser.token == "" || currentUser.member == "" ){
      content.message = "還沒登入唷。"
      Navigate("/SignIn")
    }else{
        content.message = `歡迎回來, ${currentUser().name}`
        // e.preventDefault();
        // AuthService.login(email, password)
        //   .then((response) => {
        //     if (response.data.token) {
        //       localStorage.setItem(
        //         "user",
        //         JSON.stringify(response.data)
        //       );
        //     }
        //     const user_data =
        //       AuthService.getCurrentUser();
        //     setCurrentUser({
        //       ...currentUser,
        //       token: user_data.token,
        //       member: user_data.member,
        //     });
        //     Navigate("/cart2");
        //   })
        //   .catch((error) => {
        //     console.log(error.response);
        //     setMessage(error.response.data);
        //   });
    }
  }
  return (
    <>
      <div className="shipping-way mb-5">
        <div className="left-bottom ">
          <div className="cartTitle fw-bolder h5 mb-0 text-nowrap">
            選擇送貨及付款方式
          </div>
          <div className="content-info">
            <p>送貨地點</p>
            <Select
              defaultValue="0"
              placeholder="Search to Select"
              style={{
                width: "100%",
              }}
              onChange={handleDeliverySelect}
              value={ShippingWays.location}
              options={[
                {
                  value: "TW",
                  label: "台灣",
                },
                {
                  value: "CN",
                  label: "中國",
                },
                {
                  value: "JP",
                  label: "日本",
                },
                {
                  value: "SG",
                  label: "新加玻",
                },
                {
                  value: "HK",
                  label: "香港",
                },
              ]}
            />
            {ShippingWays.location === "TW" ? ShipTWSelect : ShipBoardSelect}
          </div>
        </div>

        <div className="right-bottom ">
          <div className="cartTitle fw-bolder h5 mb-0 text-nowrap">
            付款資訊
          </div>
          <div className="content-info p-3">
            <div class="ShippingWaySubtotal mb-2">
              <tr>
                <td className="w-100">
                  <div class="ShippingWayTitle d-flex flex-column text-start">
                    <p>小計:</p>
                    <p>運費 :</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column text-end">
                    <p> NT${cartTotal}</p>
                    <p>NT$100</p>
                  </div>
                </td>
              </tr>
            </div>
            <div class="cart-coupon mb-0">
              <p>優惠券折扣：</p>
              <Select
                defaultValue="0"
                placeholder="Search to Select"
                onChange={handleCoupon}
                value={ShippingWays.couponValue}
                options={[
                  {
                    value: "100",
                    label: "滿1000折100",
                  },
                  {
                    value: "200",
                    label: "滿2000折200",
                  },
                ]}
              />
            </div>
            <hr />
            <div class="total mb-2">
              <tr>
                <td className="w-100">
                  <div class="d-flex flex-column text-start">
                    <p>合計：</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column text-end">
                    <p>
                      NT$
                      {Number(cartTotal) + Number(100)+ Number(couponAmount)}
                    </p>
                  </div>
                </td>
              </tr>
            </div>
            <span>{content.message}</span>
            <Link to="/cart2">
              <Button className="btn btn-primary text-light" onClick={isLoggedIn}  >
                前往結帳
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingWay;
