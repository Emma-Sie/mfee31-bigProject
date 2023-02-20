import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";

function OrlistEdit({
  orId,
  deliStatus,
  deliWay,
  recip_name,
  recip_phone,
  recip_address,
  updateTodo,
  btnEditing,
}) {
  // 編輯 input 裡面的值的功能
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  async function handleSubmit(e) {
    let response = await axios.post(
      `http://localhost:8080/api/sellerOrders/${orId}`,
      {
        inputName,
        inputPhone,
        inputAddress,
        orId,
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
      title: "修改完成",
    });
  }

  return (
    <>
      <form>
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
            <div className="align-self-center">
              收件人姓名 :{" "}
            </div>
            <div>
              <input
                placeholder={recip_name}
                type="text"
                value={inputName}
                onChange={(e) => {
                  setInputName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setInputName(e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <br />
          <div className="d-flex content">
            <div className="align-self-center">
              收件人電話號碼 :{" "}
            </div>
            <div>
              <input
                placeholder={recip_phone}
                type="text"
                value={inputPhone}
                onChange={(e) => {
                  setInputPhone(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setInputPhone(e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <br />
          <div className="d-flex content">
            <div className="align-self-center">
              收件地址 :{" "}
            </div>
            <div>
              <input
                placeholder={recip_address}
                type="text"
                value={inputAddress}
                onChange={(e) => {
                  setInputAddress(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setInputAddress(e.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="completedOutside">
            <Button
              className="btnComplete"
              style={{
                color: "#FB570B",
                borderColor: "#FB570B",
                padding: "10px 15px",
                fontWeight: "bold",
                backgroundColor: "white",
                marginTop: "15px",
              }}
              variant="secondary"
              onClick={() => {
                handleSubmit();
                btnEditing();
                updateTodo(
                  orId,
                  inputName,
                  inputPhone,
                  inputAddress
                );
              }}
            >
              修改完成
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
export default OrlistEdit;
