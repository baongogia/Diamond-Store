import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductListItems from "./ProductListItems";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function ListItems({ titles }) {
  const [data, setData] = useState(null);
  const [category, setCategory] = useState("");
  const [activeStates, setActiveStates] = useState(
    Array(titles.length).fill(false)
  );
  const [apiUrl, setApiUrl] = useState(
    "https://localhost:7292/api/Products/Category/Rings"
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (url, setData, setLoading) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error("There has been a problem with your fetch operation:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(apiUrl, setData, setLoading);
  }, [apiUrl]);

  const handleMouseEnter = (index) => {
    let newApiUrl;
    let newCategory;
    switch (index) {
      case 0:
        newApiUrl = "https://localhost:7292/api/Products/Category/Rings";
        newCategory = "Rings";
        break;
      case 1:
        newApiUrl = "https://localhost:7292/api/Products/Category/Earrings";
        newCategory = "Earrings";
        break;
      case 2:
        newApiUrl = "https://localhost:7292/api/Products/Category/Bracelets";
        newCategory = "Bracelets";
        break;
      case 3:
        newApiUrl = "https://localhost:7292/api/Products/Category/Necklaces";
        newCategory = "Necklaces";
        break;
      default:
        newApiUrl = "";
        newCategory = "";
    }
    if (newApiUrl !== apiUrl) {
      setApiUrl(newApiUrl);
      setCategory(newCategory);
    }
    setActiveStates((prevStates) => {
      const newStates = Array(titles.length).fill(false);
      newStates[index] = true;
      return newStates;
    });
  };

  useEffect(() => {
    setActiveStates(titles.map((title, index) => index === 0));
    setCategory("Rings");
  }, [titles]);

  return (
    <div className="absolute top-8 w-[90%] h-[85%] flex flex-col justify-center items-center">
      {/* Nav list */}
      {/* data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0" */}
      <ul className=" uppercase flex justify-around w-[77%] mt-14 border-b-[0.1em] border-b-black border-opacity-30 ">
        {titles.map((title, index) => (
          <li
            key={title}
            onMouseEnter={() => handleMouseEnter(index)}
            className={`relative z-10 Mfont list-link hover:font-semibold pr-4 cursor-pointer whitespace-nowrap  ${
              activeStates[index] ? "active" : "unactive"
            }`}
          >
            {title}
          </li>
        ))}
      </ul>
      {/* Items */}
      <div className={`w-[80%] mt-5`}>
        {loading ? (
          <div className="w-full h-[20vh] flex justify-center items-center">
            <RingLoader color="#54cc26" />
          </div>
        ) : data ? (
          <Slider {...settings}>
            {data.map((list) => (
              <ProductListItems
                key={list.CategoryId}
                img={list.Image}
                title={list.ProductName}
                category={category}
              />
            ))}
          </Slider>
        ) : (
          <div className="w-full h-[20vh] flex justify-center items-center">
            <RingLoader color="#54cc26" />
          </div>
        )}
      </div>
      {/* Link shop */}
      <div
        onClick={() => navigate(`/AllItems/${category}`)}
        className="absolute title-link h-10 mb-3 cursor-pointer font-serif -bottom-8"
      >
        View all
      </div>
    </div>
  );
}

// Controls & Settings Slider
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute top-11 -right-8">
      <button className="" onClick={onClick}>
        <div className="flex justify-center items-center p-3">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
      </button>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="absolute top-11 -left-8">
      <button className="" onClick={onClick}>
        <div className="flex justify-center items-center p-3">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </div>
      </button>
    </div>
  );
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  Swipe: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
