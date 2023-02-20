import React from "react";
import Button from "react-bootstrap/Button";
import {
  UploadOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useData } from "../../../../utils/useData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function OrderInfo() {
  const { values, ShippingWays, orderMemo,store } = useData();
  // const inputFileRef = useRef();
  // const handleOnClickUpload = () => {
  //     inputFileRef.current.click();
  //   };

  // const [deliveryStatus,setDeliverryStatus]=useStatus(null)

  // useEffect(() => {
  //     console.log('第二個參數是空陣列');
  //     async function getDeliverryStatus() {
  //     let response = await axios.get('http://localhost:8080/api/delivery_status');
  //     setStocks(response.data);
  //     }
  //     getStocks();
  // }, []);

  const [content, setContent] = useState([]);
  useEffect(() => {
      async function getContent(){
        const response = await axios.get(`http://localhost:8080/api/createOrder`)
        setContent(response.data[0][0]);
        console.log(response.data[0][0])
      }
      getContent();
    }, []);


  return (
    <>
      <div className="orderbox border mb-5">
        <div className="order-success d-flex flex-column align-items-center mb-4">
          <CheckCircleOutlined className="fs-1 mb-3 text-secondary" />
          <p className="fw-bolder fs-3">
            謝謝您！您的訂單已經成立！
          </p>
          <p className="fw-bold fs-5">訂單號碼：{content.id}</p>
          <p className="fw-bold fs-5">
            訂單確認電郵已經發送到您的電子郵箱：
            <br />
            a123451@ispan5.com
          </p>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />

          <Link to="/bank-transfer">
            <Button
              type="primary"
              className="ps-5 pe-5 w-100 bg-dark text-white border-0"
            >
              <UploadOutlined className="fs-4" />
              付款並上傳明細
            </Button>
          </Link>
        </div>

        <div className="underBox border">
          <div className="FirstBox d-flex ">
            <div className="boxes">
              <h3 className="py-3 mt-3">訂單資訊</h3>
              <p>
                訂單號碼 : {content.id}
                <br />
                訂單電郵 : {content.recip_email}
                <br />
                訂單日期 : {content.date} 
                <br />
                訂單狀態 : 訂單處理中-{content.status}
                <br />
                訂單備註 : {orderMemo.memo}
              </p>
            </div>
            <div className="boxes">
              <h3 className="py-3 mt-3">顧客資訊</h3>
              <p>
                名稱 : {content.name} 
                <br />
                電話號碼 : {content.phone}
                <br />
              </p>
            </div>
          </div>
          <div className="SecondBox d-flex">
            <div className="boxes">
              <h3 className="py-3 mt-3">送貨資訊</h3>
              <p>
                送貨方式 : {content.delivery_way_name}
                <br />
                <Button
                  type="primary"
                  className=" fw-bold bg-dark text-white border-0"
                >
                  7-11物流追蹤
                </Button>
                <br />
                送貨狀態 : 備貨中
                <br />
                收件人姓名 : {content.recip_name}
                <br />
                收件人電話號碼 : {content.recip_phone}
                <br />
                收件地址 : {content.recip_address}
                <br />
              </p>
            </div>
            <div className="boxes">
              <h3 className="py-3 mt-3">付款資訊</h3>
              <p>
                付款方式 : {content.type_name}
                <br />
                付款指示 :
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;戶名
                : 電競人股份有限公司
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中國信託銀行敦南分行
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;帳號
                : 111-222-444866 ATM : 822
                <br />
                發票狀態 : 處理中
                <br />
                發票申請類型 : 雲端發票
                <br />
                發票載具類型 : 會員載具 ({content.recip_email})
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderInfo;
