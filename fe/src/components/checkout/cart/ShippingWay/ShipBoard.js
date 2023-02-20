import React from "react";
import { Select } from "antd";

function ShipBoard({
  oversea,
  paymentOversea,
  handleOverseaSelect,
  handlePaymentOverseaSelect,
}) {
  return (
    <>
      <p>送貨方式(海外)</p>
      <Select
        defaultValue="0"
        placeholder="Search to Select"
        style={{
          width: "100%",
        }}
        onChange={handleOverseaSelect}
        value={oversea}
        options={[
          {
            value: "海外速運",
            label: "海外速運",
          },
        ]}
      />
      <p>付款方式</p>
      <Select
        defaultValue="0"
        placeholder="Search to Select"
        style={{
          width: "100%",
        }}
        onChange={handlePaymentOverseaSelect}
        value={paymentOversea}
        options={[
          {
            value: "信用卡(綠界科技)",
            label: "信用卡(綠界科技)",
          },
        ]}
      />
    </>
  );
}

export default ShipBoard;
