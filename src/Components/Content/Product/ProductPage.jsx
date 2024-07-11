import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SelectProduct from "./SelectProduct";
import AOS from "aos";
import ProductServices from "./ProductServices";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { RingLoader } from "react-spinners";

export default function ProductPage() {
  const { id } = useParams();
  const [suggest, setSuggest] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  // Data
  useEffect(() => {
    fetch(`https://diamondstoreapi.azurewebsites.net/api/Products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductDetails(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [id]);
  // Succgest
  useEffect(() => {
    fetch(`https://diamondstoreapi.azurewebsites.net/api/Products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSuggest(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [id]);
  // When scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // AOS Effect
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 2000,
    });
  }, []);
  // Mini image
  const MiniImg = ({ image, image2 }) => {
    return (
      <div className="flex mt-4 justify-between">
        <div
          style={{
            backgroundImage: `url(${image})`,
          }}
          className="w-[49%] h-[40vh] bg-cover bg-center bg-no-repeat"
        ></div>
        <div
          style={{
            backgroundImage: `url(${image2})`,
          }}
          className="w-[49%] h-[40vh] bg-cover bg-center bg-no-repeat"
        ></div>
      </div>
    );
  };

  return (
    <div>
      {/* Product Image */}
      {productDetails ? (
        <div className="">
          <div className="flex">
            {/* Image */}
            <div className="relative w-[50vw] h-max ml-16">
              <div className="">
                {productDetails.Image ? (
                  <div
                    style={{
                      backgroundImage: `url(${productDetails.Image})`,
                    }}
                    className="w-full h-[88vh] bg-cover bg-center bg-no-repeat"
                  ></div>
                ) : (
                  <div className="w-full h-[88vh] flex justify-center items-center">
                    <RingLoader size={100} color="#54cc26" />
                  </div>
                )}
              </div>

              <MiniImg
                image="https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw3f440a80/images/large/f7d87b96f2dd5aefb8906787c574fc9b.png?sw=750&sh=750&sm=fit&sfrm=png"
                image2="https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwb69f3540/images/large/d7f702ef4a1b599a8bad047c468fa526.png?sw=750&sh=750&sm=fit&sfrm=png"
              />
              <MiniImg
                image="https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwc9f94916/images/large/0debb05c7334590293530f3d4d5ac82a.png?sw=750&sh=750&sm=fit&sfrm=png"
                image2="https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw5555a615/images/large/a53b0f71f72e54c19e9c09f5c84d65c7.png?sw=750&sh=750&sm=fit&sfrm=png"
              />
              <MiniImg
                image="https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dwe4047068/images/large/d288595f046554599461b5322f0c05e9.png?sw=750&sh=750&sm=fit&sfrm=png"
                image2="https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw930644bd/images/large/ffa80ab2d53b578d8e0ce9037e422102.png?sw=750&sh=750&sm=fit&sfrm=png"
              />
            </div>
            {/* Buy */}
            <div className={`w-[40.1vw] h-[73.5vh] mr-20 sticky top-0 `}>
              <SelectProduct details={productDetails} />
            </div>
          </div>
          {/* More Info */}
          <div
            className={`w-[95vw] h-[70vh] flex items-center justify-around mt-8 ml-10`}
          >
            <div
              style={{
                backgroundImage: `url("https://www.cartier.com/dw/image/v2/BGTJ_PRD/on/demandware.static/-/Sites-cartier-master/default/dw32f332a1/images/large/7ce045b164a25f92a272cd48e0128929.png?sw=750&sh=750&sm=fit&sfrm=png")`,
              }}
              data-aos="fade-up"
              className="w-[45%] h-full bg-cover bg-center bg-no-repeat"
            ></div>
            <div className="w-[45%]">
              <div className="flex flex-col items-start">
                <div
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="uppercase text-[1.6em] text tracking-wide mb-3"
                >
                  rule of three
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-duration="1300"
                  className="tracking-wide mb-3 text-start font-serif"
                >
                  Trinity takes center stage with iconic rings, diamond
                  embellishments and geometric details.
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-duration="1500"
                  className="bg-black text-center text-white w-[50%] font-semibold px-4 py-2 border-black border-[0.1em] cursor-pointer transition-colors duration-500 hover:bg-white hover:text-black"
                >
                  Discover the collection
                </div>
              </div>
            </div>
          </div>
          {/* Services */}
          <ProductServices />
          {/* Suggest */}
          <div className="w-full flex flex-col justify-center items-center mt-20">
            <div className="text text-[1.6em] mb-8">YOU MAY ALSO LIKE</div>
            <div className="w-[70%]">
              <Slider {...settings}>
                {suggest.map((item, index) => (
                  <ProductCard
                    key={index}
                    id={item.ProductId}
                    img={item.Image}
                    hovimg={item.Image}
                    name={item.ProductName}
                    material={item.Material}
                    price={parseFloat(item.ProductPrice).toFixed(2)}
                    mini={true}
                  />
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <img
              src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-eternal-love-symbol-heart-infinity-sign-calligraphy-for-declarations-vector-png-image_37918768.png"
              alt=""
              className="w-1/6"
            />
          </div>
        </div>
      ) : (
        <div className="w-screen h-[80vh] flex justify-center items-center">
          <RingLoader size={100} color="#54cc26" />
        </div>
      )}
    </div>
  );
}

// Slider Control
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute top-28 -right-8">
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
    <div className="absolute top-28 -left-12">
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
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  Swipe: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
