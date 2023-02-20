import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Swal from "sweetalert2";

import { useAuth } from "../../utils/useAuth";
import AuthService from "../../services/auth";

import "./header.scss";

function Header() {
  const nav_items = [
    ["首頁", "/"],
    ["訂單管理", "/profile/orders"],
    ["所有商品", "/product"],
    ["會員中心", "/profile"],
  ];

  const { currentUser, setCurrentUser } = useAuth();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [search, setSearch] = useState(false);
  const [position, setPosition] = useState(
    window.pageYOffset
  );
  const [visible, setVisible] = useState(true);

  const handleLogout = () => {
    AuthService.logout();
    Swal.fire({
      icon: "success",
      title: "登出成功",
      showConfirmButton: false,
      timer: 1500,
    });
    setCurrentUser({
      token: "",
      member: "",
    });
  };

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

  return (
    <>
      <header className={visible ? "" : "active"}>
        <div className="logo">
          <Link to="/">
            <div>電競</div>人
          </Link>
        </div>
        <nav className="active">
          <ul className="mb-0">
            {nav_items.map(([label, router], i) => {
              return (
                <li key={i}>
                  <Link to={router}>{label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="icon-groups">
          <Link
            to="#/"
            onClick={() => {
              setSearch(!search);
            }}
          >
            <AiOutlineSearch />
          </Link>
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
          {currentUser.token === "" ||
          currentUser.member === "" ? (
            <Link to="/signIn" className="login">
              <span>登入</span>
            </Link>
          ) : (
            <Link
              className="login"
              to="/signIn"
              onClick={() => {
                handleLogout();
              }}
            >
              <span>登出</span>
            </Link>
          )}
          <Link
            to="#/"
            className="menu"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <FiMenu />
          </Link>
        </div>
      </header>
      <div
        className={
          search ? "search-group active" : "search-group"
        }
      >
        <input type="text" className="search-input" />
        <Link
          to="/#"
          className="search-inputButton d-flex"
          onClick={() => {}}
        >
          <AiOutlineSearch className="align-self-center" />
        </Link>
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
            <Link to="/">首頁</Link>
          </li>
          <li>
            <Link to="/profile/orders">訂單管理</Link>
          </li>
          <li>
            <Link to="/product">所有商品</Link>
          </li>
          <li>
            <Link to="/profile">會員中心</Link>
          </li>
          {currentUser.token === "" ||
          currentUser.member === "" ? (
            <li>
              <Link to="/signIn">登入</Link>
            </li>
          ) : (
            <li>
              <Link
                onClick={() => {
                  handleLogout();
                }}
              >
                登出
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Header;
