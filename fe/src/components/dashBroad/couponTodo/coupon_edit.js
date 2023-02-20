import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function CouponEdit({
  id,
  coupon_code,
  limited,
  price,
  start_time,
  end_time,
  inputLimit,
  setInputLimit,
  inputPrice,
  setInputPrice,
  inputEnd,
  setInputEnd,
  unExpired,
  setTotalPage,
  setUnExpired,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function refreshPage() {
    let response = await axios.get(
      `http://localhost:8080/api/couponSeller`
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
    let isNotExpired = result.filter(
      (v) => new Date(v.end_time) >= new Date()
    );
    setUnExpired(isNotExpired);
    setTotalPage(response.data.pagination.totalPage);
  }
  // 修改
  async function handleChange(e) {
    // e.preventDefault();
    let response = await axios.post(
      `http://localhost:8080/api/couponChange/${id}`,
      {
        inputLimit,
        inputPrice,
        inputEnd,
        id,
      }
    );
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener(
          "mouseenter",
          Swal.stopTimer
        );
        toast.addEventListener(
          "mouseleave",
          Swal.resumeTimer
        );
      },
    });
    Toast.fire({
      icon: "success",
      title: "修改優惠券成功",
    });
  }
  return (
    <>
      <Button
        className="btn btn-warning fw-bold"
        onClick={(data, index) => {
          let new_content = unExpired.filter(
            (data, index) => {
              return data.id === id;
            }
          );
          setUnExpired(new_content);
          handleShow();
        }}
      >
        修改
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h4 className="fw-bold">
            修改折扣碼&nbsp;{coupon_code}
          </h4>
        </Modal.Header>
        <Modal.Body className="formOutside">
          <form>
            <div className="formDiv">
              <label>折扣碼</label>
              <div>{coupon_code}</div>
            </div>
            <div className="formDiv">
              <label>低消</label>
              <input
                placeholder={limited}
                className="changeInput"
                type="text"
                value={inputLimit}
                onChange={(e) => {
                  setInputLimit(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setInputLimit(e.target.value);
                  }
                }}
              />
            </div>
            <div className="formDiv">
              <label>折扣金額</label>
              <input
                placeholder={price}
                className="changeInput"
                type="text"
                value={inputPrice}
                onChange={(e) => {
                  setInputPrice(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setInputPrice(e.target.value);
                  }
                }}
              />
            </div>
            <div className="formDiv">
              <label>開始日期</label>
              <div>{start_time}</div>
            </div>
            <div className="formDiv">
              <label>結束日期</label>
              <input
                type="date"
                value={inputEnd}
                onChange={(e) => {
                  setInputEnd(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setInputEnd(e.target.value);
                  }
                }}
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button
                className="btn btn-warning fw-bold"
                onClick={() => {
                  handleChange();
                  refreshPage();
                  setInputLimit("");
                  setInputPrice("");
                  setInputEnd("");
                  handleClose();
                }}
              >
                完成
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default CouponEdit;
