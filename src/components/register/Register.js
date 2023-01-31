import React, { useState } from "react";
import Header from "../header/Header";
import FormInput from "./formInput/FormInput";
import Footer from "../footer/Footer";
import "./register.css";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "用戶名應為 3-16 個字符，並且不應包含任何特殊字符！",
      label: "帳號",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "它應該是一個有效的電子郵件地址！",
      label: "E-mail",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "生日(確定後不可修改)",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "密碼應為8-20個字符，至少包括1個字母、1個數字和1個特殊字符！",
      label: "密碼",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "密碼不匹配！",
      label: "確認密碼",
      pattern: values.password,
      required: true,
    },
    {
      id: 6,
      name: "phone",
      type: "tel",
      placeholder: "phone",
      errorMessage: "電話格式錯誤",
      label: "行動電話",
      pattern: `^[0-9]{3}-[0-9]{3}-[0-9]{4}$`,
      required: true,
    },
    {
      id: 7,
      name: "address",
      type: "text",
      placeholder: "address",
      label: "地址",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>
            <span
              style={{
                color: "#fb570b",
              }}
            >
              會
            </span>
            員註冊
          </h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>註冊</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
