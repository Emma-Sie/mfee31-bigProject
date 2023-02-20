import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./couponSeller.scss";
import CouponEdit from "./coupon_edit";
import CouponAdd from "./coupon_add";
import CouponExpired from "./CouponExpired";

function CouponSeller() {
  //資料的狀態
  const [content, setContent] = useState([]);
  const [isExpired, setIsExpired] = useState([]);
  const [unExpired, setUnExpired] = useState([]);

  //button切換的狀態
  const [show, setShow] = useState(false);
  //初始化spinner的狀態
  const [isLoading, setIsLoading] = useState(false);
  //分頁的狀態
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  //彈跳視窗的開關
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getContent() {
    let response = await axios.get(
      `http://localhost:8080/api/couponSeller?page=${page}`
    );
    let result = response.data.data;
    const moment = require("moment");
    result.map((v) => {
      v.start_time = moment(v.start_time)
        .utcOffset(8)
        .format("YYYY-MM-DD");
      v.end_time = moment(v.end_time)
        .utcOffset(8)
        .format("YYYY-MM-DD");
      return v;
    });
    // 篩出已經過期的資料
    let isExpired = result.filter(
      (v) => new Date(v.end_time) < new Date()
    );
    setIsExpired(isExpired);

    // 篩出尚未過期的資料
    let isNotExpired = result.filter(
      (v) => new Date(v.end_time) >= new Date()
    );
    setUnExpired(isNotExpired);

    setTotalPage(response.data.pagination.totalPage);
  }

  //顯示資料的地方
  useEffect(() => {
    setIsLoading(true);
    getContent();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [page]);

  //分頁的功能
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

  const [inputId, setInputId] = useState("");
  const [inputCoupon, setInputCoupon] = useState("");
  const [inputLimit, setInputLimit] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");

  const [edit, setEdit] = useState(true);

  // 刪除的功能
  const deleteTodo = (id) => {
    const newTodos = isExpired.filter((v, i) => {
      return id !== v.id;
    });
    setIsExpired(newTodos);
  };

  const spinner = (
    <>
      <div
        className="spinner-grow text-danger"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow text-warning"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow text-secondary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );

  const display = (
    <>
      <div className="d-flex justify-content-between">
        <Button
          className="btn btnAddCoupons"
          onClick={handleShow}
        >
          新增折扣碼
        </Button>
      </div>
      <CouponAdd
        inputId={inputId}
        inputCoupon={inputCoupon}
        inputLimit={inputLimit}
        inputPrice={inputPrice}
        inputStart={inputStart}
        inputEnd={inputEnd}
        unExpired={unExpired}
        setUnExpired={setUnExpired}
        handleClose={handleClose}
        show={show}
        setInputCoupon={setInputCoupon}
        setInputLimit={setInputLimit}
        setInputPrice={setInputPrice}
        setInputStart={setInputStart}
        setInputEnd={setInputEnd}
        content={content}
      />
      <table className="tableCouponSeller">
        <thead>
          <tr>
            <th>折扣碼</th>
            <th className="couponHide">折扣方式</th>
            <th className="couponHide">最低消費金額</th>
            <th className="couponHide">折扣金額</th>
            <th className="couponHide">開始日期</th>
            <th>結束日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {unExpired.map((v, i) => {
            const {
              id,
              price,
              limited,
              coupon_code,
              start_time,
              end_time,
            } = v;
            return (
              <tr key={id}>
                <td>{coupon_code}</td>
                <td className="couponHide">
                  滿${limited}折${price}
                </td>
                <td className="couponHide">${limited}</td>
                <td className="couponHide">${price}</td>
                <td className="couponHide">{start_time}</td>
                <td>{end_time}</td>
                <td>
                  <CouponEdit
                    id={id}
                    coupon_code={coupon_code}
                    limited={limited}
                    price={price}
                    start_time={start_time}
                    end_time={end_time}
                    inputLimit={inputLimit}
                    setInputLimit={setInputLimit}
                    inputPrice={inputPrice}
                    setInputPrice={setInputPrice}
                    inputEnd={inputEnd}
                    setInputEnd={setInputEnd}
                    unExpired={unExpired}
                    setUnExpired={setUnExpired}
                    setTotalPage={setTotalPage}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {edit ? (
        <>
          <div className="bottomFrame">
            <div className="IsExpiredCoupon">
              <h4 className="text-danger">
                已過期的優惠券
              </h4>
            </div>
            <table className="tableIsExpired">
              <thead>
                <tr>
                  <th>折扣碼</th>
                  <th className="couponHide">折扣方式</th>
                  <th className="couponHide">
                    最低消費金額
                  </th>
                  <th className="couponHide">折扣金額</th>
                  <th className="couponHide">開始日期</th>
                  <th>結束日期</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {isExpired.map((v, i) => {
                  const {
                    id,
                    coupon_code,
                    limited,
                    price,
                    start_time,
                    end_time,
                  } = v;
                  return (
                    <CouponExpired
                      id={id}
                      coupon_code={coupon_code}
                      limited={limited}
                      price={price}
                      start_time={start_time}
                      end_time={end_time}
                      deleteTodo={deleteTodo}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
          <ul className="paginationUl ">{getPages()}</ul>
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <>
      <div>{isLoading ? spinner : display}</div>
    </>
  );
}
export default CouponSeller;
