import React from "react";
import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsPinterest,
  BsYoutube,
} from "react-icons/bs";
import "./footer.css";

function Footer() {
  const nav_item = [
    "關於",
    "買家服務",
    "退換貨問題",
    "檢舉濫用",
    "隱私政策",
    "電競人條款",
  ];
  return (
    <>
      <footer>
        <div>
          <nav>
            <ul>
              {nav_item.map((v, i) => {
                return <li key={i}>{v}</li>;
              })}
            </ul>
          </nav>
          <div className="line"></div>
          <div>
            <div>
              <div>
                Copyright © 2022 / a0922568671@gmail.com /
                前端工程師就業養成班(MFEE31)
              </div>

              <div className="icon__group">
                <a href="#/">
                  <BsFacebook />
                </a>
                <a href="#/">
                  <BsTwitter />
                </a>
                <a href="#/">
                  <BsInstagram />
                </a>
                <a href="#/">
                  <BsPinterest />
                </a>
                <a href="#/">
                  <BsYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
