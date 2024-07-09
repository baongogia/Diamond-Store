import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function ProductShopCard({ id, img, name, material, price }) {
  const [onhover, setOnHover] = useState(false);
  const [redHeart, setRedHeart] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const toggleHeart = () => {
    setRedHeart(!redHeart);
  };
  const totalSlides = 3;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    Swipe: true,
    nextArrow: onhover && <SampleNextArrow />,
    prevArrow: onhover && <SamplePrevArrow />,
    afterChange: (current) => setCurrentSlide(current),
  };
  // Slider Control
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={`absolute z-10 bottom-2 right-2 ${
          currentSlide === totalSlides - 1 ? "opacity-0" : "opacity-100"
        }`}
      >
        <button className="" onClick={onClick}>
          <div className="bg-white flex justify-center items-center p-2 rounded-full">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        </button>
      </div>
    );
  }
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={`absolute z-10 bottom-2 left-2 ${
          currentSlide === 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        <button className="" onClick={onClick}>
          <div className="bg-white flex justify-center items-center p-2 rounded-full">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className={`group w-[18vw] h-[53vh] flex flex-col items-center
  hover:border-[0.1em] hover:border-green-900 hover:border-opacity-25 pt-2`}
    >
      {/* Background */}
      <Link
        to={`/ProductPage/${id}`}
        className={`relative overflow-hidden cursor-pointer w-5/6 h-1/2`}
        onMouseEnter={() => {
          setOnHover(true);
        }}
        onMouseLeave={() => {
          setOnHover(false);
        }}
      >
        {/* Product Image */}
        <div className="h-full">
          <Slider className="relative w-full h-full" {...settings}>
            <div className="w-full h-[14em]">
              <img
                src={`${img}`}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[14em]">
              <img
                src={`${img}`}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[14em]">
              <img
                src={`${img}`}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </Slider>
          {/* Custom Dots */}
          <div
            className={`absolute bottom-0 w-full flex justify-center transition-opacity duration-200 ${
              onhover ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-[0.15em] overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-green-500 transition-transform duration-200"
                style={{
                  width: `${100 / totalSlides}%`,
                  transform: `translateX(${currentSlide * 100}%)`,
                }}
              />
            </div>
          </div>
          {/* Heart */}
          <div
            className={`absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex justify-center items-center ${
              onhover ? "opacity-100" : "opacity-0"
            } transition-all duration-500`}
          >
            <div
              onClick={toggleHeart}
              className={`w-full h-[2.5em] text flex justify-center items-center hover:text-red-500 cursor-pointer ${
                redHeart ? "text-red-500" : ""
              }`}
            >
              {redHeart ? <FaHeart /> : <FaRegHeart />}
            </div>
          </div>
        </div>
      </Link>

      {/* Name */}
      <div className="text-center uppercase max-h-[2.6em] overflow-hidden w-[70%] leading-5 mt-2">
        <p className="text">{name}</p>
      </div>
      {/* Material */}
      <div className="mt-4 max-h-12 font-serif w-[80%] overflow-hidden text-center">
        {material}
      </div>
      {/* Price */}
      <div className="mt-4 mb-2 text uppercase text-[1.1em]">{price}$</div>
      {/* Select */}
      <div
        className={`text bg-black text-white text-center uppercase py-1 w-[90%] border-black border-[0.1em]
   hover:bg-white hover:text-black ${
     onhover ? "opacity-100" : "opacity-0"
   } cursor-pointer transition-all duration-500 mb-3`}
      >
        select size
      </div>
    </div>
  );
}
