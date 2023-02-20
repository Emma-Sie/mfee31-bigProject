import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// 圖片檔
import backpackImg from "./categoryImg/backpack.png";
import earPhoneImg from "./categoryImg/earPhone.png";
import heatSinkImg from "./categoryImg/heatSink.png";
import keyboardImg from "./categoryImg/keyboard.png";
import mouseImg from "./categoryImg/mouse.png";
import mousePadImg from "./categoryImg/mousePad.png";
import PeripheralPproductsImg from "./categoryImg/PeripheralPproducts.png";
import videoToolImg from "./categoryImg/videoTool.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper";
import { Button } from "antd";

export default function CategoryFilter() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        scrollbar={{
          hide: false,
        }}
        modules={[Scrollbar]}
        className="mySwiperSmall"
      >
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={backpackImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={earPhoneImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={heatSinkImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={keyboardImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img className="boxImg" src={mouseImg} alt="" />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={mousePadImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box">
            <img
              className="boxImg"
              src={PeripheralPproductsImg}
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box">
            <img
              className="boxImg"
              src={videoToolImg}
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        slidesPerView={4}
        scrollbar={{
          hide: false,
        }}
        modules={[Scrollbar]}
        className="mySwiperMain"
      >
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={backpackImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={earPhoneImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={heatSinkImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={keyboardImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img className="boxImg" src={mouseImg} alt="" />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button className="box">
            <img
              className="boxImg"
              src={mousePadImg}
              alt=""
            />
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box">
            <img
              className="boxImg"
              src={PeripheralPproductsImg}
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box">
            <img
              className="boxImg"
              src={videoToolImg}
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
