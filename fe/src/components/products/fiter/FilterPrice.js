import React from "react";

function FilterPrice() {
  return (
    <>
      <p
        style={{
          paddingLeft: "20px",
        }}
      >
        價格篩選
      </p>
      <br />
      <div
        className="filter-price"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <input
          type="text"
          style={{
            width: "4.2rem",
            marginTop: "-6rem",
          }}
        />
        <div
          style={{
            backgroundColor: "black",
            display: "inline-block",
            height: "1px",
            width: "1rem",
            margin: "1.5px",
          }}
        ></div>
        <input
          type="text"
          style={{
            width: "4.2rem",
          }}
        />
        <button className="btnApply">套用</button>
      </div>
    </>
  );
}

export default FilterPrice;
