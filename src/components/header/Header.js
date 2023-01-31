import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./header.css";

// test
// import { Link } from "react-router-dom";
import { Component } from "react";
import ShopContext from "../../context/ShopContext";

// teacher-v
// 要使用能有active css效果的NavLink元件
import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../../utils/useCart'

// 商品範例
import Products from '../../data/products.json'
import Item from "antd/es/list/Item";

function Header() {
  const nav_items = [
    "首頁",
    "訂單管理",
    "所有商品",
    "會員中心",
  ];
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [search, setSearch] = useState(false);
  const [position, setPosition] = useState(
    window.pageYOffset
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const { cart } = useCart()

  return (
    <>
          <React.Fragment>
            <header className={visible ? "" : "active"}>
              <div className="logo">
                <div>電競</div>人
              </div>
              <nav className="active">
                <ul>
                  {nav_items.map((v, i) => {
                    return <li key={i}>{v}</li>;
                  })}
                </ul>
              </nav>
              <div className="icon__groups">
                <a
                  href="#/"
                  onClick={() => {
                    setSearch(!search);
                  }}
                >
                  <AiOutlineSearch />
                </a>
                <a className="">
                <Link as={NavLink} to="/checkout" className="d-flex flex-row align-items-center justify-content-center">
                  <FaShoppingCart />
                  <div className="quantity ms-1 ">({cart.totalItems})</div>
                </Link>
                </a>
                <a href="#/" className="login">   
                  登入
                </a>

                <a
                  href="#/"
                  className="menu"
                  onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                  }}
                >
                  <FiMenu />
                </a>
              </div>
            </header>
            <div
              className={
                search ? "search__group active" : "search__group"
              }
            >
              <input type="text" className="search__input" />
              <a href="/#" className="search__inputButton">
                <AiOutlineSearch />
              </a>
            </div>
            <div
              className={
                isNavExpanded
                  ? "navigation-menu active"
                  : "navigation-menu"
              }
            >
              <ul>
                <li>
                  <a href="#/">首頁</a>
                </li>
                <li>
                  <a href="#/">訂單管理</a>
                </li>
                <li>
                  <a href="#/">所有商品</a>
                </li>
                <li>
                  <a href="#/">會員中心</a>
                </li>
                <li>
                  <a href="#/">登入</a>
                </li>
              </ul>
            </div>

          </React.Fragment>
    </>
  );
}

export default Header;
