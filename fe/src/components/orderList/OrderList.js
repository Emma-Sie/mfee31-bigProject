import OrderPath from "./OrderPath";
import SideBar from "../reUseable/SideBar";
import OrderTable from "./OrderTable";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useState } from "react";

import "./orderList.scss";

function OrderList() {
  const [isLoading, setLoading] = useState(false);
  const spinner = (
    <>
      <div class="d-flex justify-content-start align-items-center p-3">
        <div
          className="spinner-grow text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
        <div
          className="spinner-grow text-secondary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
        <div
          className="spinner-grow text-success"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    </>
  );
  return (
    <>
      <Header />
      {isLoading ? (spinner) : (
        <>
          <div className="title py-5 d-flex">
            <h2 className="fw-bold titleFirst">我</h2>
            <h2 className="fw-bold">的訂單</h2>
          </div>
          <div className="Nav-title d-flex justify-content-between">
            <div className="detailPath">
              <OrderPath />
            </div>
          </div>
          <div className="tableFrame">
            <div className="tableLeft">
              <SideBar />
            </div>
            <div className="tableRight">
              <OrderTable isLoading={isLoading} setLoading={setLoading}/>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
export default OrderList;