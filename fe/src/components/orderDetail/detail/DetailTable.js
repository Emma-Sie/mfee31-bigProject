import Accordion from "react-bootstrap/Accordion";
import OrderCoupon from "../OrderCoupon";
import Button from "react-bootstrap/Button";
import { BsShop } from "react-icons/bs";

function DetailTable({
  content,
  orId,
  company_name,
  product_name,
  price,
  amount,
  payment_price,
  delivery_fee,
}) {
  return (
    <>
      <Accordion
        defaultActiveKey="0"
        alwaysOpen
        className="accordionChange"
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h2 key={orId}>{company_name}</h2>
            <Button className="btnLook">
              <BsShop className="btnWord" />
              &nbsp;
              <h6 className="btnWord">查看賣場</h6>
            </Button>
          </Accordion.Header>
          <Accordion.Body>
            <table className="tableDetail">
              <thead>
                <tr>
                  <th className="productsInfo align-start">
                    商品名稱
                  </th>
                  <th className="productNone">單件價格</th>
                  <th>數量</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody>
                {content.map((v, i) => {
                  return (
                    <tr key={v.orId}>
                      <td className="productInfo">
                        <div className="imageWords d-flex align-items-center ms-3">
                          <div className="productName fw-bold">
                            {v.product_name}
                          </div>
                        </div>
                      </td>
                      <td className="productNone fw-bold">
                        {v.price}
                      </td>
                      <td className="fw-bold">{v.amount}</td>
                      <td className="fw-bold">{v.price * v.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="Coupon">
              <OrderCoupon />
            </div>
            <div className="subtotal">
              <ul>
                <li key={orId}>
                  <div>小計:</div>
                  <div>NT${parseInt(payment_price)}</div>
                </li>

                <li key={orId}>
                  <div>運費:</div>
                  <div>NT${delivery_fee}</div>
                </li>
                <li>
                  <div>優惠代碼折扣:</div>
                  <div>- NT$100</div>
                </li>

                <li key={orId}>
                  <div>合計:</div>
                  <div>
                    NT$
                    {parseInt(payment_price) +
                      parseInt(delivery_fee) -
                      100}
                  </div>
                </li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
export default DetailTable;