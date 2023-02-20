import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import FunctionToggle from "../reUseable/SideBar";
import CouponPath from "./CouponPath";
import CouponUnexpired from "./CouponUnexpired";

import "./coupon.scss";

const Coupon = () => {
  const [content, setContent] = useState([]);

  // 製作分頁
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);

  // 使用規則 -> OffCanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function getContent() {
      let response = await axios.get(
        `http://localhost:8080/api/coupon?page=${page}`
      );
      let result = response.data.data;
      const moment = require("moment");
      result.map((v) => {
        v.end_time = moment(v.end_time)
          .utcOffset(8)
          .format("YYYY-MM-DD");
        return v;
      });
      setTotalPage(response.data.pagination.totalPage);
      setTotal(response.data.pagination.total);

      setContent(result);
    }
    getContent();
  }, [page]);

  // 分頁的功能
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li
          className="paginationLi"
          key={i}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "13px 20px",
            color: page === i ? "#FB570B" : "black",
          }}
          onClick={(e) => {
            setPage(i);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <>
      <div className="titleCoupon p-5 mb-5">
        <div className="titleContent">
          <h2 className=" fw-bold titleFirst">優</h2>
          <h2 className=" fw-bold">惠券</h2>
        </div>
      </div>
      <div className="Nav-title d-flex justify-content-between">
        <div className="detailPath">
          <CouponPath />
        </div>
      </div>
      <div className="tableFrame">
        <div className="tableLeft">
          <FunctionToggle />
        </div>
        <div className="tableRight">
          <div className="unExpired">
            <div className="unExpiredWord">
              您目前有&nbsp;{total}&nbsp;張優惠券
            </div>
            <Button
              onClick={handleShow}
              className="couponRules"
            >
              優惠券使用規則
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  style={{
                    fontWeight: "bold",
                    color: "#fb570b",
                  }}
                >
                  優惠券使用規則
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <p
                  style={{
                    fontWeight: "bold",
                    lineHeight: "40px",
                  }}
                >
                  {" "}
                  1. 請留意您的優惠券使用期限。
                  <br />
                  2. 每次結帳時，僅能使用一張優惠券。
                  <br />
                  3. 優惠券不可折抵運費。
                  <br />
                  4.
                  優惠券有使用期限，到期後將不在顯示於畫面中。
                  <br />
                  5.
                  優惠券僅能使用一次且不找零，一經使用後將無法恢復。
                  <br />
                  6.
                  使用優惠券的訂單如取消或退貨，優惠券將自動失效不會歸還。
                </p>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
          <div className="unExpiredCoupon">
            <CouponUnexpired content={content} />
          </div>
          <ul className="paginationUl">{getPages()}</ul>
        </div>
      </div>
    </>
  );
};
export default Coupon;
