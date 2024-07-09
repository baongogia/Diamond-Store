import React, { useState } from "react";
import axios from "axios";
import ProductCard from "../../Content/Product/ProductCard";
import { RingLoader } from "react-spinners";
import Slider from "react-slick";

export default function SearchList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeoutId, updateTimeoutId] = useState();
  const [productList, setProductList] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchData = async (searchString) => {
    try {
      const response = await axios.get(
        `https://localhost:7292/api/Products/ProductName/${searchString}`
      );
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onTextChange = (e) => {
    const value = e.target.value;
    clearTimeout(timeoutId);
    setSearchQuery(value);
    const timeout = setTimeout(() => fetchData(value), 500);
    updateTimeoutId(timeout);
  };

  const totalSlides = productList ? productList.length : 0;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (current) => setCurrentSlide(current),
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className={`absolute z-10 top-40 -right-14 ${
          currentSlide >= totalSlides - 3 ? "opacity-0" : "opacity-100"
        }`}
      >
        <button onClick={onClick}>
          <div className="border border-green-700 text-green-700 hover:bg-green-300 flex justify-center items-center p-4 rounded-full">
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
        className={`absolute z-10 top-40 -left-14 ${
          currentSlide === 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        <button onClick={onClick}>
          <div className="border border-green-700 text-green-700 hover:bg-green-300 flex justify-center items-center p-4 rounded-full">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute top-12 w-screen h-screen">
      {/* Search bar */}
      <div className="w-full h-1/4 bg-white">
        <div className="h-[12em] font-serif">
          <div className="flex h-full flex-col justify-center items-center">
            <div className="flex mt-5">
              <input
                onChange={onTextChange}
                value={searchQuery}
                type="text"
                placeholder="Search products"
                className="outline-none w-[25em] border-b-[0.1em] border-b-black"
              />
              <div className="bg-black text-center text-white w-[40%] font-semibold py-1 hover:bg-white hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500">
                SEARCH
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Search product list */}
      <div
        className={`pl-20 w-full h-screen overflow-hidden bg-white flex justify-between ${
          productList !== null ? "" : "hidden"
        } ${searchQuery === "" ? "hidden" : ""}`}
      >
        {productList !== null ? (
          <Slider className="w-[68%]" {...settings}>
            {productList.map((product) => (
              <ProductCard
                key={product.id}
                id={product.ProductId}
                img={product.Image}
                hovimg={product.Image}
                name={product.ProductName}
                material={product.Material}
                price={parseFloat(product.ProductPrice).toFixed(2)}
                mini={false}
              />
            ))}
          </Slider>
        ) : (
          <div className="w-screen h-full flex justify-center items-center">
            <RingLoader color="#54cc26" />
          </div>
        )}
        {/* Category */}
        <div className="w-1/4 h-full">
          <div className="flex flex-col justify-between w-full h-[40%]">
            <ul className="flex flex-col justify-between w-full h-1/2">
              <div className="text uppercase text-[1.2em]">categories</div>
              <li className="font-serif">Rings in jewelry</li>
              <li className="font-serif">Rings for men in Ring</li>
              <li className="font-serif">Engagement rings in Jewelry</li>
            </ul>
            <ul className="text uppercase flex flex-col justify-between w-full h-1/2 mt-4">
              <div className="text-[1.2em]">Articles</div>
              <li className="">
                WHY DO SCRATCHES APPEAR ON THE STONES IN MY RINGS?
              </li>
              <li className="">23. CALIFORNIA BAN OF EXOTIC SPECIES</li>
              <li className="">CREATIONS WITHOUT LISTED PRICES</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
