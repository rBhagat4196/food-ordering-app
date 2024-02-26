import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import {SliderCard} from "../components"
const Slider = () => {
  const products = useSelector((state) => state.product.products);
  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    if (products) {
      const filteredFruits = products.filter(
        (data) => data.product_category === "fruits"
      );
      setFruits(filteredFruits);
    //   console.log(filteredFruits);
    }
  }, [products]);

//   console.log(fruits)
  return (
    <div className="w-full pt-24 ">
    <Swiper
      slidesPerView={3}
      centeredSlides={false}
      spaceBetween={30}
      grabCursor={true}
      className="mySwiper "
    >
      {fruits &&
        fruits.map((data, i) => (
            <SwiperSlide key={i} className="">
            <SliderCard key={i} data={data} index={i} />
          </SwiperSlide>
        ))}
    </Swiper>
  </div>
  );
};

export default Slider;
