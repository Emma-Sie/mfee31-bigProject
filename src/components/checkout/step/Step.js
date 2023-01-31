import React from "react";
import "./step.css";


function Step() {
  
  return (
    <>
      <div className="step-groups">
        <div className="step-group">
          <div className="number active">1</div>
          <div className="cart">購物車</div>
        </div>
        <div className="line"></div>
        <div className="step-group">
          <div className="number">2</div>
          <div className="cart">填寫資料</div>
        </div>
        <div className="line"></div>
        <div className="step-group">
          <div className="number">3</div>
          <div className="cart">訂單確認</div>
        </div>
      </div>
    </>
  );
}

export default Step;
