import React, { useContext, useEffect } from "react";
import Step from "../step/Step"

import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { BsFillTrashFill } from "react-icons/bs";
import InputNum from "./inputNumber/InputNumber";
import ShippingWay from "./ShippingWay/ShippingWay"

import "./cart.css";

// test
import ShopContext from "../../../context/ShopContext";
import { useCart } from '../../../utils/useCart'

// useContext商品內容
function Cart() {
  const context = useContext(ShopContext);
  useEffect(() => {
    console.log(context);
  }, []);

  const { cart, items, plusOne, minusOne, removeItem } = useCart()

  return (
    <>
      <React.Fragment>
        <div className="cart">
        <Step className="step"/>
          <Table className="border">
            <thead>
              <tr className="bg-secondary">
                <th
                  colSpan={6}
                  className="text-center fw-bold h2"
                >
                  購物車
                </th>
              </tr>
              <tr className="text-center">
                <th>商品內容</th>
                <th>優惠</th>
                <th>單價</th>
                <th>數量</th>
                <th>小計</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((v, i) => {
                return(
                <tr key={v.id} >
                  <td className="text-left">
                    <img src={v.picture} alt="" className="w-25"/>
                    {v.name}
                  </td>
                  <td className="text-center">NT$0</td>
                  <td className="text-center">NT${v.price}</td>
                  <td className="w-25">
                    <InputGroup>
                      <Button className="cart-quantity-button d-flex align-items-center" variant="outline-dark" onClick={() => {
                        minusOne(v.id)
                      }}>
                        <MinusOutlined />
                      </Button>
                      <Form.Control
                        className=" text-center"
                        variant="outline-dark"
                        value={v.quantity}
                      />
                      <Button className="cart-quantity-button d-flex align-items-center" variant="outline-dark" onClick={() => {
                        plusOne(v.id)
                      }} >
                        <PlusOutlined/>
                      </Button>
                    </InputGroup>
                  </td>
                  <td> NT${v.itemTotal} </td>
                  <td>
                    <a href=""><BsFillTrashFill onClick={() => {
                      removeItem(v.id)}} className="text-dark"/>
                    </a>
                  </td>
                </tr>
              )
              })}
            </tbody>
          </Table>
          <ShippingWay />
        </div>
      </React.Fragment>
    </>
  );
}

export default Cart;
