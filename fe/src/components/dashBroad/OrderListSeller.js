import { useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import OrderListSellerContent from "./OrderListSellerContent";
import "./orderListSeller.scss";
import { useAuth } from "../../utils/useAuth";

function OrderListSeller() {
  // 資料存放的地方
  const { currentUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [content, setContent] = useState([]);

  // 資料最終呈現用
  const [contentDisplay, setContentDisplay] = useState([]);

  // 全部訂單 已出貨 未出貨 運送中 商品已送達目的地 切換用的
  const [statusFilter, setStatusFilter] =
    useState("全部訂單");

  // 搜尋用的
  const [searchWord, setSearchWord] = useState("");

  // 製作分頁所需要的狀態
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const [page, setPage] = useState(
    parseInt(currentPage, 10) || 1
  );
  const [totalPage, setTotalPage] = useState(1);

  // 後端傳過來的sellerid
  const { sellerid } = useParams();

  // 後端的資料
  async function getContent() {
    let response = await axios.post(
      `http://localhost:8080/api/orderSeller/${currentUser.member.id}?page=${page}`,
      {
        statusFilter,
        searchWord,
      }
    );
    let result = response.data.data;
    const moment = require("moment");
    result.map((v) => {
      v.date = moment(v.start_time)
        .utcOffset(8)
        .format("YYYY-MM-DD");
      return v;
    });
    setContent(result);
    setTotalPage(response.data.pagination.totalPage);
  }

  useEffect(() => {
    setIsLoading(true);
    getContent();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getContent();
  }, [page, statusFilter, searchWord]);

  // 分頁的function
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      // push整個li 一直往後面放li
      pages.push(
        <li
          key={i}
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            padding: "13px 20px",
            color: page === i ? "#FB570B" : "black",
            cursor: "pointer",
          }}
          onClick={(e) => {
            setPage(i);
            navigate(`?page=${i}`);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  // button所使用的按鈕內容
  const filterOptions = [
    "全部訂單",
    "已出貨",
    "未出貨",
    "運送中",
    "商品已送達目的地",
  ];

  // 搜尋的功能
  const getSearchedTodos = (todoArray, searchWord) => {
    return todoArray.filter((v, i) => {
      return v.orId.toString().includes(searchWord);
    });
  };

  // 訂單狀態的切換
  const getfilterTodos = (todoArray, statusFilter) => {
    if (statusFilter === "全部訂單") {
      return todoArray;
    } else {
      return todoArray.filter(
        (value) => value.status === statusFilter
      );
    }
  };

  // 多重篩選處理
  useEffect(() => {
    let newContent = getSearchedTodos(content, searchWord);
    newContent = getfilterTodos(newContent, statusFilter);
    setContentDisplay(newContent);
  }, [content, statusFilter, searchWord]);

  const spinner = (
    <>
      <div
        className="spinner-grow text-danger"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow text-warning"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow text-secondary"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );

  return (
    <>
      {isLoading ? (
        spinner
      ) : (
        <div>
          <div className="btnGroup">
            {filterOptions.map((v, i) => {
              return (
                <button
                  key={i}
                  className={
                    statusFilter === v
                      ? "btnFirst"
                      : "btnSecond"
                  }
                  onClick={() => {
                    setStatusFilter(v);
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>
          <div className="inputs">
            <div className="inputGroup">
              <input
                type="text"
                className="form-control inputSearch"
                placeholder="搜尋訂單編號..."
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
              />
              <button
                className="btn btnSearch"
                type="button"
                onClick={() => {}}
              >
                搜尋
              </button>
            </div>
          </div>
          <table className="tableSeller">
            <thead className="tableHead">
              <tr>
                <th>訂單編號</th>
                <th className="tableHide">成立日期</th>
                <th className="tableHide">總金額</th>
                <th>收件人</th>
                <th className="tableHide">收件電話</th>
                <th className="tableHide">收件地址</th>
                <th className="tableHide">付款方式</th>
                <th>訂單狀態</th>
                <th>訂單詳細</th>
              </tr>
            </thead>
            <tbody className="tableBodySeller">
              <OrderListSellerContent
                content={contentDisplay}
              />
            </tbody>
          </table>
          <ul className="paginationUl">{getPages()}</ul>
        </div>
      )}
    </>
  );
}
export default OrderListSeller;