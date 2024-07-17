import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import one from "../../assets/ff.jpeg";
import two from "../../assets/two.jpeg";
import three from "../../assets/three.jpeg";
import four from "../../assets/forth.jpeg";
import five from "../../assets/five.jpeg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Slider.css";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className=" bg_ha">
            <div className="card-body-border">
              <img src={four} alt="" class="img-fluid"/>
              <p className="mt-3">Make Bet in BNB</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg_ha">
            <div className="card-body-border">
              <img src={five} alt="" class="img-fluid"/>
              <p className="mt-3">
                You got tickets in this round and % to win total amount
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" bg_ha">
            <div className="card-body-border">
              <img src={two} alt="" />
              <p className="mt-3">
                The contract is fulfilled by randomization of tickets
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" bg_ha">
            <div className="card-body-border">
              <img src={one} alt="" />

              <p className="mt-3">
                You automatically receive BNB on your wallet
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
