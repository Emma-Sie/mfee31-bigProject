function OrderCoupon() {
  return (
    <>
      <div className="fw-bold py-3 ms-2 mt-3 usedCoupon">
        已使用過的優惠券
      </div>
      <div className="d-flex my-3">
        <div className="couponSticker ms-2 mb-3">
          ISPAN20230126
        </div>
        <div className="d-flex align-items-center mx-3">
          <p>滿1000折100</p>
        </div>
      </div>
    </>
  );
}
export default OrderCoupon;