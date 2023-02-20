import { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Swal from "sweetalert2";

import ProductListModal from "./ProductListModal";
import ProductListAddModal from "./ProductListAddModal";
import { useAuth } from "../../../utils/useAuth";

function UserList() {
  const [data, setData] = useState();
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");
  const [page, setPage] = useState(
    parseInt(currentPage, 10) || 1
  );
  const [totalPage, setTotalPage] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [productId, setProductId] = useState();
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productStorage, setProductStorage] = useState("");
  const { currentUser } = useAuth();
  // 選擇的檔案
  const uploadRef = useRef();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShow1(false);
    resetProductStatus();
  };
  const handleShow = () => setShow(true);

  let formData = new FormData();

  function checkPictureType(type) {
    const isJPG = type === "image/jpeg";
    const isPNG = type === "image/png";
    const isBMP = type === "image/bmp";
    const isPic = isJPG || isPNG || isBMP;
    return isPic ? true : false;
  }

  const changeHandler = () => {
    let fileArr = [...uploadRef.current.files];
    if (fileArr.length > 2) {
      Toast.fire({
        icon: "error",
        title: "圖片超過兩張",
      });
      console.log("圖片超過兩張");
    } else {
      if (uploadRef.current.files.length === 1) {
        console.log(uploadRef.current.files.length);
        formData.append(
          "photos",
          uploadRef.current.files[0]
        );
      } else {
        fileArr.forEach((data, index) => {
          const picType = checkPictureType(data.type);
          if (picType) {
            formData.append("photos", data);
          } else {
            Toast.fire({
              icon: "error",
              title: "請確保圖片格式正確",
            });
            console.error("請確保圖片格式正確");
          }
        });
      }
    }
  };

  async function insertProduct(
    brand_name,
    category_id,
    product_name,
    price,
    storage
  ) {
    formData.append("brand_name", brand_name);
    formData.append("category_id", category_id);
    formData.append("product_name", product_name);
    formData.append("price", price);
    formData.append("storage", storage);
    console.log(formData.get("photos"));

    let result = await axios.post(
      `http://localhost:8080/api/product/admin/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result.data);
    Toast.fire({
      icon: "success",
      title: "新增成功",
    });
  }

  async function updateProduct(
    id,
    productName,
    productPrice,
    productStorage
  ) {
    let result = await axios.patch(
      `http://localhost:8080/api/product/admin/${id}`,
      {
        productName,
        productPrice,
        productStorage,
      }
    );
    console.log(result.data.data);
    Toast.fire({
      icon: "success",
      title: "修改成功",
    });
    getData();
    resetProductStatus();
  }

  function resetProductStatus() {
    setProductId("");
    setProductName("");
    setProductPrice("");
    setProductStorage("");
    setProductBrand("");
    setProductType("");
  }

  async function deleteProduct(id, data) {
    let result = await axios.delete(
      `http://localhost:8080/api/product/admin/${id}`
    );

    let newData = data.filter((v, i) => {
      return v.id !== id;
    });

    Toast.fire({
      icon: "success",
      title: "刪除成功",
    });
    setData(newData);
    resetProductStatus();
  }

  async function getData() {
    let response = await axios.get(
      `http://localhost:8080/api/product/admin/${currentUser.member.id}?page=${page}`
    );
    setData(response.data.data);
    setTotalPage(response.data.pagination.totalPage);
  }

  useEffect(() => {
    getData();
  }, [page]);

  const searchedValue = (data, inputValue) => {
    return data.filter((v, i) => {
      return v.product_name
        .toString()
        .includes(inputValue.trim());
    });
  };

  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li
          style={{
            display: "inline-block",
            margin: "2px",
            backgroundColor: page === i ? "#fb570b" : "",
            borderColor: page === i ? "#fb570b" : "#dbdbdb",
            color: page === i ? "#fff" : "#363636",
            borderWidth: "1px",
            width: "28px",
            height: "28px",
            borderRadius: "3px",
            textAlign: "center",
            cursor: "pointer",
          }}
          key={i}
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
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener(
        "mouseleave",
        Swal.resumeTimer
      );
    },
  });

  async function exportCSV() {
    const csvData = data
      .map((row) => Object.values(row).join(","))
      .join("\n");
    const bom = "\ufeff";
    const csvBlob = new Blob([bom + csvData], {
      type: "text/csv;charset=utf-8",
    });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "data.csv";
    link.click();
  }

  async function exportJSON() {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
  }

  return (
    <>
      <Form
        className="d-flex mb-3"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setData(searchedValue(data, inputValue));
          setTotalPage(Math.ceil(data.length / 10));
          setOnSearch(true);
          resetProductStatus();
        }}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
        >
          Search
        </button>
      </Form>
      <button
        type="button"
        class="btn btn-success mb-3"
        onClick={() => {
          setShow1(true);
        }}
      >
        新增商品
      </button>
      <ProductListAddModal
        show1={show1}
        handleClose={handleClose}
        productType={productType}
        setProductType={setProductType}
        productBrand={productBrand}
        setProductBrand={setProductBrand}
        productName={productName}
        setProductName={setProductName}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productStorage={productStorage}
        setProductStorage={setProductStorage}
        changeHandler={changeHandler}
        insertProduct={insertProduct}
        uploadRef={uploadRef}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>產品名稱</th>
            <th>價格</th>
            <th>庫存</th>
            <th>評分</th>
            <th>收藏數量</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((v, i) => {
              const {
                id,
                product_name,
                price,
                storage,
                rate,
                favorites,
              } = v;
              return (
                <tr key={id}>
                  <td>{product_name}</td>
                  <td>{price}</td>
                  <td>{storage}</td>
                  <td>{rate}</td>
                  <td>{favorites}</td>
                  <td className="d-flex w-100">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        handleShow();
                        setProductId(id);
                        setProductName(product_name);
                        setProductPrice(price);
                        setProductStorage(storage);
                      }}
                    >
                      修改
                    </button>
                    <ProductListModal
                      show={show}
                      handleClose={handleClose}
                      id={productId}
                      productName={productName}
                      productStorage={productStorage}
                      productPrice={productPrice}
                      setProductName={setProductName}
                      setProductPrice={setProductPrice}
                      setProductStorage={setProductStorage}
                      updateProduct={updateProduct}
                    />
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        Swal.fire({
                          title: "確定要刪除?",
                          text: "你刪除後將無法返回!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "刪除!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteProduct(id, data);
                            resetProductStatus();
                          } else {
                            resetProductStatus();
                          }
                        });
                      }}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="d-flex">
        <button
          type="button"
          class="btn btn-success m-1"
          onClick={() => {
            exportCSV();
          }}
        >
          匯出成CSV
        </button>
        <button
          type="button"
          class="btn btn-secondary m-1"
          onClick={() => {
            exportJSON();
          }}
        >
          匯出成JSON
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <ul
          style={{
            margin: "0 auto",
          }}
        >
          {getPages()}
        </ul>
        {onSearch && (
          <button
            type="button"
            class="btn btn-dark"
            onClick={() => {
              setOnSearch(false);
              getData();
              setOnSearch("");
            }}
          >
            返回
          </button>
        )}
      </div>
    </>
  );
}

export default UserList;
