import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useAuth } from "../../utils/useAuth";
import { Box } from "@mui/system";
import { Rating } from "@mui/material";

import OrderListChange from "./orderListTodo/OrderListChange";
import OrderListUpload from "./OrderListUpload";

function OrlistDetail({ orId }) {
  
  const { currentUser } = useAuth();
  const [content, setContent] = useState([]);

  // 查看詳細按鈕的功能
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function refreshPage() {
    window.location.reload(false);
  }

  // 資料庫撈出來每一筆訂單的資料
  const getContent = async () => {
    const response = await axios.post(
      `http://localhost:8080/api/orderSeller/${currentUser.member.id}/orders/${orId}`
    );
    setContent(response.data);
    console.log(response.data)
  };

  useEffect(() => {
    // setLoading(true);
    getContent();
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  }, []);

  // 資料更新的功能
  const updateTodo = (
    orId,
    recip_name,
    recip_phone,
    recip_address
  ) => {
    const newContent = content.map((v, i) => {
      console.info(
        "編輯前data",
        v.recip_name,
        v.recip_phone,
        v.recip_address
      );
      if (v.orId === orId) {
        let name =
          recip_name !== "" ? recip_name : v.recip_name;
        let phone =
          recip_phone !== "" ? recip_phone : v.recip_phone;
        let address =
          recip_address !== ""
            ? recip_address
            : v.recip_address;
        console.info("編輯後data", name, phone, address);
        return {
          ...v,
          recip_name: name,
          recip_phone: phone,
          recip_address: address,
        };
      }
    });
    setContent(newContent);
    console.log(content);
  };
  

  return (
    <>
      <Button className="buttonDetail" onClick={handleShow}>
        查看
      </Button>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold ps-2">
            訂單編號 : {orId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content.map((v, i) => {
            const {
              orId,
              name,
              product_name,
              price,
              amount,
            } = v;
            return (
              <div>
                <div className="custoInfo">
                  <h2 key={orId}>買家帳號 : {name}</h2>
                </div>
                <table className="tableDetail">
                  <thead>
                    <tr>
                      <th className="productInfo">
                        商品名稱
                      </th>
                      <th className="productNone">價格</th>
                      <th>數量</th>
                      <th>小計</th>
                    </tr>
                  </thead>
                  <tbody className="sellerTableBody">
                    <tr>
                      <td className="productInfo">
                        <div className="imageWords d-flex align-items-center">
                          <p className="pt-3 fw-bold">
                            {product_name}
                          </p>
                        </div>
                      </td>
                      <td className="productNone fw-bold">
                        {price}
                      </td>
                      <td className="fw-bold">{amount}</td>
                      <td className="fw-bold">
                        {price * amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
          <div className="Coupon">
            <div className="fw-bold py-2 ms-2 mt-2">
              已使用過的優惠券
            </div>
            <div className="d-flex my-2">
              <div className="couponSticker ms-2 mb-3">
                ISPAN20230126
              </div>
              <div className="d-flex align-items-center mx-3">
                <p>滿1000折100</p>
              </div>
            </div>
          </div>

          <div className="subtotal">
            {content.map((v, i) => {
              const { orId, payment_price, delivery_fee } =
                v;
              return (
                <ul key={orId}>
                  <li>
                    <div>小計:</div>
                    <div>NT${parseInt(payment_price)}</div>
                  </li>
                  <li>
                    <div>運費:</div>
                    <div>NT${delivery_fee}</div>
                  </li>
                  <li>
                    <div>優惠代碼折扣:</div>
                    <div>- NT$100</div>
                  </li>
                  <li>
                    <div>合計:</div>
                    <div>
                      NT$
                      {parseInt(payment_price) +
                        parseInt(delivery_fee) -
                        100}
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
          {content.map((v, i) => {
            const {
              orId,
              recip_email,
              date,
              name,
              phone,
              type_name,
              orderStatus,
              order_transfer_img,
            } = v;
            return (
              <div className="underBoxSellersDetail">
                <div className="FirstBox">
                  <div className="boxes">
                    <div className="orderInfo py-3 mt-3">
                      訂單資訊
                    </div>
                    <div className="contentInfo">
                      <div className="d-flex content">
                        <div>訂單號碼 :</div>
                        <div>&nbsp;{orId}</div>
                      </div>
                      <br />
                      <div className="d-flex content">
                        <div>訂單電郵 :</div>
                        <div>&nbsp;{recip_email}</div>
                      </div>
                      <br />
                      <div className="d-flex content">
                        <div>訂單日期 : </div>
                        <div>&nbsp;{date}</div>
                      </div>
                    </div>
                  </div>
                  <div className="boxes">
                    <div className="orderInfo py-3 mt-3">
                      顧客資訊
                    </div>
                    <div className="contentInfo">
                      <div className="d-flex content">
                        <div>名稱 : </div>
                        <div>&nbsp;{name}</div>
                      </div>
                      <br />
                      <div className="d-flex content">
                        <div>電話號碼 : </div>
                        <div>&nbsp;{phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="FirstBox">
                  <OrderListChange
                    content={content}
                    updateTodo={updateTodo}
                  />
                  <div className="boxes">
                    <div className="orderInfo py-3 mt-3">
                      付款資訊
                    </div>
                    <div className="contentInfo">
                      <div className="d-flex content">
                        <div>付款方式 :</div>
                        <div>&nbsp;{type_name}</div>
                      </div>
                      <br />
                      <div className="d-flex content">
                        <div>付款狀態 : </div>
                        <div>&nbsp;{orderStatus}</div>
                      </div>
                      <br />
                      <div className="content d-flex justify-content-between me-5">
                        <div> 付款指示 :</div>
                        <div>
                          <OrderListUpload
                            order_transfer_img={
                              order_transfer_img
                            }
                          />
                        </div>
                      </div>
                      <br />
                      <div className="contentPay">
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;戶名
                          : 電競人股份有限公司
                        </div>
                      </div>
                      <br />
                      <div className="contentPay">
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中國信託銀行敦南分行
                        </div>
                      </div>
                      <br />
                      <div className="contentPay">
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;帳號
                          : 111-222-444866 ATM : 822
                        </div>
                      </div>
                      <br />
                      <div className="d-flex content">
                        <div>發票類型 :</div>
                        <div>雲端發票</div>
                      </div>
                      <br />
                      <div className="d-flex content">
                        <div>載具類型 : </div>
                        <div>
                          會員載具 (發票會寄至您的電郵)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="underSecondBox">
            {content.map((v, i) => {
              return (
                <>
                  {/* 賣家 */}
                  <div className="d-flex justify-content-between me-3">
                    <h3 className="commentsTitle">
                      {v.name}給你的評價
                    </h3>
                    <div className="commentsStar">
                      <div className="commentsLeft">
                        <div className="stars">
                          <Box
                            component="fieldset"
                            borderColor="transparent"
                            autoComplete="off"
                          >
                            <Rating
                              name="simple-controlled"
                              value={v.sellers_rate}
                              readOnly
                            />
                          </Box>
                        </div>
                        <div className="commentsRate">
                          {" "}
                          {v.sellers_rate} / 5 分
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="textField">
                    <h6 className="pb-5">
                      買家想告訴賣家之內容&nbsp;&nbsp;:&nbsp;&nbsp;
                      {v.sellers_comment}
                    </h6>
                  </div>
                  {/* 商品 */}
                  <div
                    className="d-flex justify-content-between me-3"
                    key={v.order_list_detail_id}
                  >
                    <h3 className="commentsTitle">
                      {v.name}給商品{v.product_name}的
                      評價&nbsp;&nbsp;:&nbsp;&nbsp;
                    </h3>
                    <div className="commentsStar">
                      <div className="commentsLeft">
                        <div className="stars">
                          <Box
                            component="fieldset"
                            borderColor="transparent"
                            autoComplete="off"
                          >
                            <Rating
                              name="simple-controlled"
                              value={v.rate}
                              readOnly
                            />
                          </Box>
                        </div>
                        <div className="commentsRate">
                          {" "}
                          {v.rate} / 5 分
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="textField">
                    <h6 className="pb-5">
                      買家對此商品的購物體驗&nbsp;&nbsp;:&nbsp;&nbsp;
                      {v.comment}
                    </h6>
                  </div>
                </>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="btnGroup d-flex justify-content-end">
            <Button
              className="btnClose"
              variant="primary"
              onClick={() => {
                handleClose();
                refreshPage();
              }}
            >
              關閉
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrlistDetail;
