import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

import SignInWrapper from "./SignInWrapper";
import AuthService from "../../services/auth";
import { useAuth } from "../../utils/useAuth";

export default function SignInForm({
  email,
  password,
  setEmail,
  setPassword,
}) {
  const [message, setMessage] = useState("");
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

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

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          AuthService.login(email, password)
            .then((response) => {
              if (response.data.token) {
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data)
                );
              }
              const user_data =
                AuthService.getCurrentUser();
              setCurrentUser({
                ...currentUser,
                token: user_data.token,
                member: user_data.member,
              });
              Toast.fire({
                icon: "success",
                title: "登入成功",
              });
              navigate("/");
            })
            .catch((error) => {
              Toast.fire({
                icon: "error",
                title: "帳號或密碼錯誤",
              });
              console.log(error.response);
              setMessage(error.response.data);
            });
        }}
      >
        <Form.Group className="formGroup">
          <Form.Label className="formlabel">
            帳號
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="請輸入帳號"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="formGroup">
          <Form.Label className="formlabel">
            密碼
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Check className="formCheck" label="記住我" />
        <SignInWrapper />
      </Form>
    </>
  );
}
