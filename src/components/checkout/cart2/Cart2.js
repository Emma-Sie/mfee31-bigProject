import React, { useState } from "react"

import CartTable from "./cartTable/CartTable";
import CartInfo2 from "./cartInfo2/CartInfo2"
import CartInfo2_1 from "./cartinfo2-1/CartInfo2_1"
import CartInfo3 from "./cartInfo3/CartInfo3"
import { Button } from 'antd';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import { Link } from 'react-router-dom'

import { useCart } from '../../../utils/useCart'

// css樣式
import "./Cart2.css"
import  Step  from "../step/Step";

function CartTwo() {
  const { cart, items, plusOne, minusOne, removeItem } = useCart()

  return (
    <div className="cart-two">
      <div className="content">
        <Step />
        {/* part1 */}
        <CartTable />
        {/* part2 */}
        <CartInfo2 />
        <CartInfo2_1/>
        {/* part3 */}
        <CartInfo3 />
      </div>


      <div className="CartSubmit d-flex justify-content-between">
        <Link to="/cart" className="back text-dark fw-border text-decoration-none" >
          <AiOutlineArrowLeft/>返回購物車
        </Link>
        <Link to="/cart3" >
          <Button type="primary" danger className="ps-5 pe-5 w-100">
            提交訂單
          </Button>
        </Link>
        <div></div>
      </div>
      
    </div>
  );
}

export default CartTwo