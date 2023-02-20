import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import axios from "axios";
function CouponExpired({
  id,
  coupon_code,
  limited,
  price,
  start_time,
  end_time,
  deleteTodo,
}) {
  // 刪除
  async function handleDelete(e) {
    let response = await axios.post(
      `http://localhost:8080/api/couponDelete/${id}`,
      {
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
      title: "刪除優惠券成功",
    });
  }

  return (
    <>
      <tr key={id}>
        <td className="textLine">{coupon_code}</td>
        <td className="couponHide">
          滿${limited}折${price}
        </td>
        <td className="couponHide">${limited}</td>
        <td className="couponHide">${price}</td>
        <td className="couponHide">{start_time}</td>
        <td>{end_time}</td>
        <td>
          <Button
            className="btn btn-danger fw-bold"
            onClick={() => {
              handleDelete();
              deleteTodo(id);
            }}
          >
            刪除
          </Button>
        </td>
      </tr>
    </>
  );
}
export default CouponExpired;
