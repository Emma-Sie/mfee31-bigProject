import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import { BsFillTrashFill } from "react-icons/bs";
import {
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import Step from "../step/Step";
import CartNull from "../cartNull/CartNull";
import ShippingWay from "./ShippingWay/ShippingWay";
import { useAuth } from "../../../utils/useAuth";

import "./cart.scss";

function Cart() {
  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [cart, setCart] = useState(
    window.localStorage.getItem("cart") !== null
      ? JSON.parse(window.localStorage.getItem("cart"))
      : []
  );

  const [cart_total, setCart_Total] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    if (
      currentUser.member === "" ||
      currentUser.token === ""
    ) {
      window.location.href = "/signIn";
    }
  }, []);

  useEffect(() => {
    let total = cart.reduce((acc, cur) => {
      return acc + Number(cur.price) * Number(cur.amount);
    }, 0);
    setCart_Total(total);
  }, [cart]);

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

  if (
    window.localStorage.getItem("cart") === null ||
    cart.length === 0
  ) {
    return <>{isLoading ? spinner : <CartNull />}</>;
  }

  return (
    <>
      <Header />
      {isLoading ? (
        spinner
      ) : (
        <>
          {" "}
          <Step />
          <div className="cart">
            <Table striped >
              <thead>
                <tr className="bg-primary">
                  <th
                    colSpan={5}
                    className="text-center text-dark fw-bolder h2 bg-secondary"
                  >
                    購物車
                  </th>
                </tr>
                <tr className="text-center">
                  <th>商品名稱</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>小計</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cart.map((v, i) => {
                  return (
                    <tr key={v.id}>
                      <td>{v.name}</td>
                      <td>{v.price}</td>
                      <td className="w-25">
                        <InputGroup >
                          <Button
                            className="cart-quantity-button d-flex align-items-center w-25"
                            variant="outline-dark"
                            onClick={() => {
                              let new_cart = cart.map(
                                (item) => {
                                  if (item.id === v.id) {
                                    if (v.amount > 1) {
                                      item.amount -= 1;
                                    }
                                  }
                                  return item;
                                }
                              );
                              window.localStorage.setItem(
                                "cart",
                                JSON.stringify(new_cart)
                              );
                              setCart(new_cart);
                            }}
                          >
                            <MinusOutlined className="cartAmount" />
                          </Button>
                          <Form.Control
                            className=" text-center w-25 px-0"
                            variant="outline-dark"
                            value={v.amount}
                          />
                          <Button
                            className="cart-quantity-button d-flex align-items-center w-25"
                            variant="outline-dark"
                            onClick={() => {
                              let new_cart = cart.map(
                                (item) => {
                                  if (item.id === v.id) {
                                    item.amount += 1;
                                  }
                                  return item;
                                }
                              );
                              window.localStorage.setItem(
                                "cart",
                                JSON.stringify(new_cart)
                              );
                              setCart(new_cart);
                            }}
                          >
                            <PlusOutlined />
                          </Button>
                        </InputGroup>
                      </td>
                      <td>
                        {Number(v.amount) * Number(v.price)}
                      </td>
                      <td>
                        <BsFillTrashFill
                          onClick={() => {
                            let new_cart = cart.filter(
                              (data) => {
                                return data.id !== v.id;
                              }
                            );
                            setCart(new_cart);
                            if (cart.length > 1) {
                              window.localStorage.setItem(
                                "cart",
                                JSON.stringify(new_cart)
                              );
                            } else {
                              window.localStorage.removeItem(
                                "cart"
                              );
                            }
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <ShippingWay cartTotal={cart_total} cart={cart} />
          </div>
          <Footer />{" "}
        </>
      )}
    </>
  );
}

export default Cart;
