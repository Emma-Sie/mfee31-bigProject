

// 引入排版用元件
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// 引入頁面元件

// 巢狀
import Register from "./components/register/Register";
import Page404 from "./components/page404/Page404";
import CartNull from "./components/checkout/cartNull/CartNull";
import Products from "./components/products/Products";
import CheckoutSuccess from "./components/checkout/checkoutSuccess/CheckoutSuccess";
import Page500 from "./components/page500/page500";

// 結帳流程頁
import Checkout from "./components/checkout/Checkout";
import Cart from "../src/components/checkout/cart/Cart"
import Cart2 from "../src/components/checkout/cart2/Cart2"
import Cart3 from "../src/components/checkout/cart3/Cart3"
import BankTransfer from "../src/components/checkout/bankTransfer/BankTransfer"

// test
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestProduct from "./components/test-product/testProducts"
import TestCart from "./components/test-product/testCart"
import GlobalState from "./context/GlobalState"

// teacher-version
// 匯入 Cart 要用的 ContextProvider
import { CartProvider } from './utils/useCart'
import cartData from './data/cart.json'
import { DataProvider } from "./utils/useData";

import "./App.css";

function App() {
  return (
    <>
      {/* <CheckoutSuccess /> */}
      {/* <Page500 /> */}
      {/* <Products /> */}
      {/* <Register /> */}
      {/* <Checkout /> */}
      {/* <Page404 /> */}
      {/* <CartNull /> */}

      <GlobalState>
        <DataProvider>
        <CartProvider initialCartItems={cartData}>
          <BrowserRouter>
            {/* 所有頁面統一選單(導覽列) */}
            <Header />

            <Routes>
              {/* 這裡加上index與`path="/"`同意思 */}
              {/* <Route index element={<Home />} /> */}

              <Route index element={<Products />} />

              {/* 巢狀路由 `/user/xxxx` */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart2" element={<Cart2 />} />
                <Route path="/cart3" element={<Cart3 />} />
                <Route path="/bank-transfer" element={<BankTransfer />} />
                <Route path="/cartNull" element={<CartNull />} />

                <Route path="/testProduct" element={<TestProduct />} />
                <Route path="/testCart" element={<TestCart />} />
             
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
        </DataProvider>
      </GlobalState>
    </>
  );
};

export default App;
