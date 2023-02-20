import { useState, useEffect } from "react";
import axios from "axios";

import ProfilePath from "./ProfilePath";
import SideBar from "../reUseable/SideBar";
import ProfileInfo from "./ProfileInfo";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import "./profile.scss";

function Profile() {
  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [isSeller, setIsSeller] = useState();

  const local = window.location.origin;
  const previewImg =
    "local + /images/previewProfileImage.png";
  // 選擇的檔案
  const [selectedFile, setSelectedFile] = useState("");
  // 預覽圖片
  const [preview, setPreview] = useState("");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (
      currentUser.member === "" ||
      currentUser.token === ""
    ) {
      window.location.href = "/signIn";
    }
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(selectedFile);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setPreview(objectUrl);

    // 當元件unmounted時清除記憶體
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  async function getData() {
    let response = await axios.get(
      `http://localhost:8080/api/profile/${currentUser.member.id}`
    );
    let result = response.data.user;
    let isSeller = response.data.seller;
    console.log(response.data.user);
    setUserData(result[0]);
    setName(currentUser.member.name);
    setEmail(currentUser.member.email);
    setAddress(currentUser.member.address);
    setPhone(currentUser.member.phone);
    setImage("http://localhost:8080" + result[0].thumbnail);
    setIsSeller(isSeller.length > 0 ? true : false);
  }

  useEffect(() => {
    getData();
  }, [image]);

  async function updateProfile() {
    const formData = new FormData();
    formData.append("thumbnail", selectedFile);
    formData.append("user_name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    try {
      let response = await axios.post(
        `http://localhost:8080/api/profile/${currentUser.member.id}`,
        formData
      );
      getData();
    } catch (err) {
      console.error(err);
    }
  }

  const changeHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

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
      {isLoading ? (
        spinner
      ) : (
        <>
          <div className="title p-5 d-flex w-100">
            <h2 className="fw-bold titleFirst">會</h2>
            <h2 className="fw-bold">員中心</h2>
          </div>
          <div className="Nav-title d-flex justify-content-between">
            <div className="detailPath">
              <ProfilePath />
            </div>
          </div>
          <div className="tableFrameProfile">
            <div className="tableLeft">
              <SideBar />
            </div>
            <div className="tableRight d-flex">
              <div className="profileStatus">
                <div className="profilePhoto">
                  {(selectedFile && (
                    <img
                      src={preview}
                      alt="profileImage"
                      className="profileImage"
                    />
                  )) || (
                      <img
                        src={image}
                        alt="profileImage"
                        className="profileImage"
                      />
                    ) || (
                      <img
                        src="./images/previewProfileImage.png"
                        alt="profileImage"
                        className="profileImage"
                      />
                    )}
                </div>
                <div className="profileName">{name}</div>

                {isSeller ? (
                  <div className="authorityStatus">
                    認證狀態 : 賣家
                  </div>
                ) : (
                  <div className="authorityStatus">
                    認證狀態 : 買家
                    <br />
                    <Link
                      to="/profile/verifySeller"
                      className="verifyBtn btn btn-secondary fw-bold gap-1"
                    >
                      驗證成賣家
                    </Link>
                  </div>
                )}

                {isEdit ? (
                  <>
                    <div className="btns">
                      <button
                        className="profileBtn fw-bold text-light mt-2"
                        onClick={() => {
                          setIsEdit(false);
                          updateProfile();
                        }}
                      >
                        完成修改
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="btns">
                      <button
                        className="profileBtn fw-bold text-light mt-2"
                        onClick={() => {
                          setIsEdit(true);
                        }}
                      >
                        修改
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="profileInfo">
                <ProfileInfo
                  userData={userData}
                  isEdit={isEdit}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  phone={phone}
                  setPhone={setPhone}
                  address={address}
                  setAddress={setAddress}
                  changeHandler={changeHandler}
                />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
export default Profile;
