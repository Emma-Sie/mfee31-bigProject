import { useState, useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";

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

  async function getData() {
    let response = await axios.get(
      `http://localhost:8080/api/users?page=${page}`
    );
    setData(response.data.user);
    setTotalPage(response.data.pagination.totalPage);
  }
  useEffect(() => {
    getData();
  }, [page]);

  const searchedValue = (data, inputValue) => {
    return data.filter((v, i) => {
      return (
        v.name.toString().includes(inputValue.trim()) ||
        v.email.toString().includes(inputValue.trim()) ||
        v.address.toString().includes(inputValue.trim())
      );
    });
  };

  async function updateUserValid(id, valid) {
    try {
      let response = undefined;
      if (valid === 1) {
        response = await axios.patch(
          `http://localhost:8080/api/users/${id}`
        );
      } else if (valid === 0) {
        response = await axios.put(
          `http://localhost:8080/api/users/${id}`
        );
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    getData();
  }

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

  return (
    <>
      <Form
        className="d-flex mb-3"
        style={{
          width: "100%",
        }}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setData(searchedValue(data, inputValue));
          setTotalPage(Math.ceil(data.length / 10));
          setOnSearch(true);
        }}
      >
        <input
          className="form-control me-2"
          style={{
            width: "50%",
          }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          className="btn btn-outline-info"
          type="submit"
        >
          Search
        </button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>姓名</th>
            <th>信箱</th>
            <th>地址</th>
            <th>創建時間</th>
            <th>vaild</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((v, i) => {
              const {
                id,
                name,
                email,
                address,
                created_at,
                valid,
              } = v;
              return (
                <tr key={i}
                  style={{
                    verticalAlign: "middle",
                  }}
                >
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{address}</td>
                  <td>{created_at}</td>
                  <td>{valid}</td>
                  <td className="w-100 d-flex align-items-center justify-content-center">
                    {valid === 1 ? (
                      <Link
                        className="btn btn-danger"
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          padding: "10px",
                          lineHeight: "normal",
                          width: "110px",
                        }}
                        onClick={() => {
                          updateUserValid(id, valid);
                        }}
                      >
                        加入黑名單
                      </Link>
                    ) : (
                      <Link
                        className="btn btn-success"
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          padding: "10px",
                        }}
                        onClick={() => {
                          updateUserValid(id, valid);
                        }}
                      >
                        解除封鎖
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <ul
          style={{
            // margin: "0 auto",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "13px 20px",
          }}
        >
          {getPages()}
        </ul>
        {onSearch && (
          <button
            type="button"
            class="btn btn-dark"
            style={{
              width: "70px",
              height: "50px",
            }}
            onClick={() => {
              setOnSearch(false);
              getData();
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
