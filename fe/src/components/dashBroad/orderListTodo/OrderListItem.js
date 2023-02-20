import Button from "react-bootstrap/Button";
import { FaRegEdit } from "react-icons/fa";

function OrderListItem({
  deliStatus,
  deliWay,
  recip_name,
  recip_phone,
  recip_address,
  btnEditing,
}) {
  return (
    <>
      <div className="boxes">
        <div className="orderInfo py-3 mt-3">
          送貨資訊
          <Button className="btnDeli" onClick={btnEditing}>
            修改收件資訊&nbsp;
            <FaRegEdit />
          </Button>
        </div>
        <div className="contentInfo">
          <div className="d-flex content">
            <div>送貨方式 :</div>
            <div>&nbsp;{deliWay}</div>
          </div>
          <br />
          <div className="d-flex content">
            <div>送貨狀態 : </div>
            <div>&nbsp;{deliStatus}</div>
          </div>
          <br />
          <div className="d-flex content">
            <div>收件人姓名 : </div>
            <div>&nbsp;{recip_name}</div>
          </div>
          <br />
          <div className="d-flex content">
            <div>收件人電話號碼 : </div>
            <div>&nbsp;{recip_phone}</div>
          </div>
          <br />
          <div className="d-flex content">
            <div>收件地址 : </div>
            <div>&nbsp;{recip_address}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default OrderListItem;
