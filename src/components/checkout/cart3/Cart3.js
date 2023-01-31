import React from "react"
import CartTable from "../cart2/cartTable/CartTable";
import OrderInfo from "./orderInfo/OrderInfo"
import { Button } from 'antd';
import { AiOutlineArrowLeft } from 'react-icons/ai';


// css樣式
import "./Cart3.css"

function CartThree() {
  return (
    <div className="cart-three ">

      <div className="comment border d-flex justify-content-between align-items-center mb-5">
        <div className="text">
          <p className=" fw-bolder fs-4 mb-0">我們在等待你的評價！</p>
          <p className=" fs-5 mb-0">喜歡之前購買的商品嗎？給我們一個好評吧！</p>
        </div>
        <Button type="primary" className="bg-secondary w-10 px-4 fw-bold">
          評價
        </Button>
      </div>
      {/* part1 */}
      <CartTable />
      {/* part2 */}
      <OrderInfo />
    </div>
  );
}

export default CartThree