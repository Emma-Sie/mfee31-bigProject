import React, { useState, useEffect, useRef } from "react";
import { Button, DatePicker, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import InputArea from "../cart2/cartInfo3/InputArea";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import CartNull from "../cartNull/CartNull";
import "./BankTransfer.css";


function BankTransfer() {

  // 選擇的檔案
  const uploadRef = useRef();
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState(null)
  // 預覽圖片
  const [preview, setPreview] = useState('')
  // server上的圖片網址
  // const [imgServerUrl, setImgServerUrl] = useState('')


  const navigate = useNavigate()
  const [content, setContent] = useState([]);
  // 抓取最新訂單資料id
  useEffect(() => {
    async function getContent() {
      const response = await axios.get(`http://localhost:8080/api/createOrder`)
      setContent(response.data[0][0]);
    }
    getContent();
  }, []);

  // 當選擇檔案更動時建立預覽圖
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    console.log("圖片路徑", objectUrl)
    setPreview(objectUrl)
    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  // 導入購物車防呆
  const [cart, setCart] = useState(
    window.localStorage.getItem("cart") !== null ? JSON.parse(window.localStorage.getItem("cart")) : []
  );
  if (
    window.localStorage.getItem("cart") === null ||
    cart.length === 0
  ) {
    return (
      <>
        <CartNull />
      </>
    );
  }

  let formData = new FormData();
  function checkPictureType(type) {
    const isJPG = type === "image/jpeg";
    const isPNG = type === "image/png";
    const isBMP = type === "image/bmp";
    const isPic = isJPG || isPNG || isBMP;
    return isPic ? true : false;
  }
  const changeHandler = (e) => {
    // 顯示預覽圖
    const file = e.target.files[0]
    console.log("file", file)
    if (file) {
      setSelectedFile(file)
    } else {
      setSelectedFile(null)
    }
    // new
    let fileArr = [...uploadRef.current.files];
    if (fileArr.length > 2) {
      Toast.fire({
        icon: "error",
        title: "圖片超過兩張",
      });
      console.log("圖片超過兩張");
    } else {
      if (uploadRef.current.files.length === 1) {
        console.log(uploadRef.current.files.length);
        formData.append(
          "photos",
          uploadRef.current.files[0]
        );
      } else {
        fileArr.forEach((data, index) => {
          const picType = checkPictureType(data.type);
          if (picType) {
            formData.append("photos", data);
          } else {
            Toast.fire({
              icon: "error",
              title: "請確保圖片格式正確",
            });
            console.error("請確保圖片格式正確");
          }
        });
      }
    }
  };

  // 傳入資料庫
  async function handleSubmission() {
    console.log(formData.get("photos"));
    let result = await axios.post(
      "http://localhost:8080/upload-transfer",
      formData, preview, content,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log("傳入資料庫", result.data);
    Toast.fire({
      icon: "success",
      title: "轉帳明細上傳成功",
    });
    // navigate("/cart3")
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener(
        "mouseleave",
        Swal.resumeTimer
      );
    },
  });

  return (
    <>
      <Header />
      <div className="bank-transfer border text-center">
        <div className="topTransfer mb-5">
          <div className="leftTransfer d-flex flex-column justify-content-center">
            <div className="order-price bg-warning  text-nowrap">
              <h2 className="fw-bolder p-4 m-0 ">
                訂單金額 NT${content.payment_price}
              </h2>
            </div>
            <div className="payment-method ">
              <h3 className="fw-bolder">付款方式</h3>
              <h5>銀行轉帳/ATM</h5>
            </div>
            <div className="payment-info">
              <h3 className="fw-bolder">付款說明</h3>
              <h5>
                戶名：電競人股份有限公司
                <br />
                中國信託銀行敦南分行(822)
                <br />
                帳號：111-222-444866
              </h5>
            </div>
          </div>
          <div className="Transferline "></div>
          <div className="right-transfer d-flex flex-column justify-content-center">
            <h3 className="fw-bolder">
              完成轉帳後，請上傳轉帳明細
            </h3>
            <div>
              {selectedFile && (
                <div>
                  預覽上傳圖片: <img src={preview} className="h-25 w-25" alt="" />
                </div>
              )}
              <Button
                icon={
                  <UploadOutlined className="fs-2 mb-2" />
                }
                className="uploadBTN bg-dark p-4 mb-3 text-light display-block"
              >
                <h5 className="uploadBtnText fw-bold">上傳明細</h5>
                <h5 className="uploadBtnText fw-bold text-wrap">請確認圖片清晰，包含帳號後五碼、轉帳時間、轉帳金額</h5>
                <input ref={uploadRef} type="file" onChange={changeHandler} multiple />
              </Button>
            </div>
            <h5>轉帳時間</h5>
            <Space
              direction="vertical"
              className="transfer-time"
            >
              <DatePicker
                onChange={() => { }}
                className="date"
              />
              <InputArea placeholder="填寫付款備住" />
              <Button
                type="primary"
                className="send bg-secondary py-2"
                onClick={handleSubmission}
              >
                <h5 className=" fw-bold m-0">
                  發送明細給賣家
                </h5>
              </Button>
            </Space>
          </div>
        </div>
        <div className="buttom-transfer">
          <h5 className="fw-bolder text-black-50">
            您填寫的付款資訊僅用於訂單對帳並經過加密技術，敬請安心付款。
          </h5>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BankTransfer;
