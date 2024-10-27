import React, { useEffect, useState } from "react";
import IntroVideo from "./IntroVideo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import HomeCard from "./HomeCard";
import { RingLoader } from "react-spinners";

export const title = (title, info, shop) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className={`uppercase text-[1.6em] text tracking-wide mb-3 ${
          title === "THE OCELLE NECKLACE"
            ? "blueneck"
            : title === "THE RYU NECKLACE"
            ? "greenneck"
            : title === "The Magic Of Sparkle Of Heaven"
            ? "magic"
            : title === "BEAUTÉS DU MONDE"
            ? "beauty"
            : title === "LE VOYAGE RECOMMENCÉ"
            ? "vol"
            : "text-black"
        }`}
      >
        {title}
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1100"
        className="tracking-wide mb-3 text-center font-serif"
      >
        {info}
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        className="title-link h-10 mb-3 cursor-pointer"
      >
        {shop}
      </div>
    </div>
  );
};

export default function HomePage() {
  const [univer, setUniver] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // AOS
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1500,
      offset: 0,
    });
  }, []);

  useEffect(() => {
    fetch(
      "https://diamondstoreapi.azurewebsites.net/api/Products/Category/Bracelets"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUniver(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  return (
    <div className="w-screen font-serif">
      <IntroVideo />
      <div className="w-full flex flex-col justify-center items-center pt-8">
        {title(
          "The Magic Of Sparkle Of Heaven",
          "Share your love with a heartfelt gesture. Eternity creations celebrate the joy of giving.",
          "Shop Gifts"
        )}
        <div data-aos="fade-up" className="w-[95%] mt-4">
          <img
            src="https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw21c57203/clp/2022/Beautes%20du%20Monde/Landing%20Page/01_HEADER_GOLSHIFTEH_BDM_2560x996%20(1).jpg"
            alt=""
          />
        </div>
        <div className="mt-8 mb-4">
          {title(
            "BEAUTÉS DU MONDE",
            "Seeing the beauty of the world, preserving it, and above all, enriching it, are values that have continuously influenced the Maison’s philosophy.",
            "Shop Accessories"
          )}
        </div>
        <div className="w-[92%] flex justify-between">
          <div data-aos="fade-right" className="w-[90%] mr-8">
            <img
              src="https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dwc6d1d884/clp/2022/Beautes%20du%20Monde/2.%20OCELLE_1920%20x%201494-NEW-2.jpg"
              alt=""
            />
            <div className="mt-4">
              {title(
                "THE OCELLE NECKLACE",
                "Of all birds, the peacock is possibly the most fascinating.",
                "Shop the collection"
              )}
            </div>
          </div>
          <div data-aos="fade-left" className="w-[90%]">
            <img
              src="https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw883baefe/clp/2022/Beautes%20du%20Monde/NM_RYU_1920x1494%20copie.jpg"
              alt=""
            />
            <div className="mt-4">
              {title(
                "THE RYU NECKLACE",
                "Dragon scales inspire Enternity with their structure, material and pattern.",
                "Shop the collection"
              )}
            </div>
          </div>
        </div>
        <div data-aos="zoom-in" className="w-[95%]">
          <img
            src="https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw82b9c294/clp/2024/le-voyage-recommence/HEADER_MT02_CARTIER_PORTES_2560x996.jpg"
            alt=""
          />
          <div className="mt-4">
            {title(
              "LE VOYAGE RECOMMENCÉ",
              "A journey through the Maison's savoir-faire and creative explorations, experienced through the light of a new vision.",
              "Shop the collection"
            )}
          </div>
        </div>
        <div className="text uppercase text-[2em] mt-14 mb-5 univer">
          Enter the Eternity universe
        </div>
        <div className="w-[90%]">
          {isLoading ? (
            <div className="w-full h-[40vh] flex justify-center items-center">
              <RingLoader size={95} color="#54cc26" />
            </div>
          ) : univer.length > 1 ? (
            <Slider {...settings}>
              {univer.map((item, index) => (
                <HomeCard key={index} bg={item?.Image || ""} />
              ))}
            </Slider>
          ) : (
            <div className=""></div>
          )}
        </div>
        <div
          className="bg-black text-center text-white w-[10%] font-semibold px-4 py-2 uppercase text mt-4 mb-5
                 hover:bg-white hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500"
        >
          Discover
        </div>
      </div>
    </div>
  );
}

// Slider Control
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute top-44 -right-12">
      <button className="" onClick={onClick}>
        <div className="bg-black bg-opacity-30 flex justify-center items-center p-3 rounded-full">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
      </button>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute top-44 -left-12">
      <button className="" onClick={onClick}>
        <div className="bg-black bg-opacity-30 flex justify-center items-center p-3 rounded-full">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </div>
      </button>
    </div>
  );
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 3,
  initialSlide: 0,
  Swipe: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
