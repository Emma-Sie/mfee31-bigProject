import React, { useState, useEffect } from "react";
import LikeProduct from "./Card";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


import Header from "../header/Header";
import Footer from "../footer/Footer";
import CollectPath from "./CollectPath";
import FunctionToggle from "../reUseable/SideBar";
import { useAuth } from "../../utils/useAuth";

import "./collect.scss";
import { DataGridPremium } from "@mui/x-data-grid-premium";

function Collect() {
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  
  const MySwal = withReactContent(Swal);

  async function getData() {
    let result = await axios.get(
      `http://localhost:8080/api/profile/${currentUser.member.id}/collect`
    );
    console.log(currentUser.member.id);
    setData(result.data.data);
  }

  async function deleteLike(id, data) {
    let result = await axios.delete(
      `http://localhost:8080/api/profile/${currentUser.member.id}/collect?productId=${id}`
    );
    let newData = data.filter((v, i) => {
      return v.id !== id;
    });
    console.log(newData);
    setData(newData);
    MySwal.fire({
      icon: "success",
      title: "刪除成功",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  useEffect(() => {
    getData();
  }, [data]);
  return (
    <>
      <Header />
      <div className="titleCollect p-5 mb-5">
        <div className="titleContent">
          <h2 className="fw-bold titleFirst">收</h2>
          <h2 className="fw-bold">藏清單</h2>
        </div>
      </div>
      <div className="Nav-title d-flex justify-content-between">
        <div className="detailPath">
          <CollectPath />
        </div>
      </div>
      <div className="tableFrameCollect">
        <div className="tableLeft">
          <FunctionToggle />
        </div>
        <div className="tableRight">
          <div className="collectCard">
            <div className="collect_right">
              {/* 右側內容 */}
              <div className="right_cards">
                {data &&
                  data.map((v, i) => {
                    const {
                      id,
                      user_id,
                      product_name,
                      price,
                      rate,
                      images,
                    } = v;
                    return (
                      <LikeProduct
                        key={id}
                        id={id}
                        user_id={user_id}
                        product_name={product_name}
                        price={price}
                        rate={rate}
                        images={images}
                        getData={getData}
                        data={data}
                        setData={setData}
                        deleteLike={deleteLike}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <ul className="paginationUl"></ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Collect;
