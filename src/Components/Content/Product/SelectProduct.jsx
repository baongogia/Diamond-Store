import React, { useState, useContext, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Header/Header/Cart/CartContext";
import Select from "react-select";
import { WishlistContext } from "../../Header/SileProfileBar/WishlistContext";

export default function SelectProduct({ details }) {
  const { id } = useParams();
  const oriSize = details.ProductSize || 0;
  const [size, setSize] = useState({
    value: oriSize,
    label: oriSize.toString(),
  });
  const [showIns, setShowIns] = useState(false);
  const [showMissingMsg, setShowMissingMsg] = useState(false);
  const [redHeart, setRedHeart] = useState(false);
  const [showCer, setShowCer] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showVid, setShowVid] = useState(false);
  const { setShowCart, addToCart, isProductInCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const isAvailable = details.Status;
  console.log(isAvailable);
  // Hold wishlist icon;
  useEffect(() => {
    setRedHeart(isInWishlist(details.ProductId));
  }, [isInWishlist, details.ProductId]);
  //  Get original size
  useEffect(() => {
    if (oriSize) {
      setSize({ value: oriSize, label: oriSize.toString() });
    }
  }, [oriSize]);
  // Original price
  const oriPrice = details.ProductPrice;
  // Price up
  const calculatePrice = (selectedSize) => {
    return details.UnitSizePrice * (selectedSize - details.ProductSize);
  };
  // Calculate price
  const selectedSize = size ? size.value : oriSize;
  const price =
    selectedSize >= oriSize && selectedSize < 100
      ? oriPrice + calculatePrice(selectedSize)
      : null;

  const formatPrice = (price) => {
    return price ? parseFloat(price).toFixed(2) + "$" : "";
  };
  // Add to cart
  const handleAddToCart = () => {
    if (selectedSize >= oriSize && !isProductInCart(details.ProductId)) {
      const product = {
        productID: details.ProductId,
        image: details.Image,
        name: details.ProductName,
        material: details.Material,
        size: selectedSize,
        price: price,
        code: id,
      };
      addToCart(product);
      setShowCart(true);
    }
  };
  // Animation
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  // Add to wish list
  const toggleHeart = () => {
    if (isInWishlist(details.ProductId)) {
      removeFromWishlist(details.ProductId);
      setRedHeart(false);
    } else {
      addToWishlist({
        productID: details.ProductId,
        image: details.Image,
        name: details.ProductName,
        material: details.Material,
        size: selectedSize,
        price: price,
        code: id,
      });
      setRedHeart(true);
    }
  };
  // Miss options
  const getMissingSelections = () => {
    let missing = [];
    if (!size) missing.push("Size");
    return missing.join(", ");
  };
  const missingSelections = getMissingSelections();
  const missingMessage =
    missingSelections.length === 1
      ? `Please Select: ${missingSelections[0]}`
      : "Please Select Size";
  // Size to select
  const options = [
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
    { value: 13, label: "13" },
    { value: 14, label: "14" },
    { value: 15, label: "15" },
    { value: details.ProductSize, label: `${details.ProductSize}` },
  ];
  const handleChange = (selectedOption) => {
    setSize(selectedOption);
  };
  // Css input box
  const colourStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "white",
      border: "1.5px solid #000",
      borderRadius: "none",
      boxShadow: isFocused ? "none" : styles.boxShadow,
      borderColor: isFocused ? "green" : "green",
      "&:hover": {
        borderColor: isFocused ? "green" : "green",
      },
    }),
    option: (styles) => {
      return {
        ...styles,
        fontFamily: "sans-serif",
      };
    },
    placeholder: (styles) => ({
      ...styles,
      textAlign: "center",
      color: "black",
      textTransform: "uppercase",
    }),
  };

  return (
    <div className="w-[80%] float-right flex flex-col justify-center items-start">
      {/* Product name */}
      <div className="text uppercase text-[1.6em] text-green-800">
        {details.ProductName}
      </div>
      {/* Information */}
      <div className="grid grid-cols-2 Mfont">
        <div className="flex items-center mb-1">
          <span className="font-bold infor">Material:</span>
          <span className="ml-2">24K {details.Material}</span>
        </div>
        <div className="flex items-center mb-1 ml-3">
          <span className="font-bold infor">Carat Weight:</span>
          <span className="ml-2">{details.CaratWeight} Carat</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="font-bold infor">Origin:</span>
          <span className="ml-2">{details.GemOrigin}</span>
        </div>
        <div className="flex items-center mb-1 ml-3 ">
          <span className="font-bold infor">Clarity:</span>
          <span className="ml-2">{details.Clarity}</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="font-bold infor">Color:</span>
          <span className="ml-2">{details.Color}</span>
        </div>
        <div className="flex items-center mb-1 ml-3 ">
          <span className="font-bold infor">Cut:</span>
          <span className="ml-2">{details.Cut}</span>
        </div>
        <div className="flex items-center mb-1">
          <span className="font-bold infor">For:</span>
          <span className="ml-2">{details.Gender}</span>
        </div>
        <div className="flex items-center mb-1 ml-3">
          <span className="font-bold infor">Brand:</span>
          <span className="ml-2">Enternity</span>
        </div>
      </div>
      {/* Code */}
      <div className="flex w-full justify-between items-center">
        <div className="">
          <div className="uppercase font-bold text-green-800 mb-2">
            Code: {id}
          </div>
        </div>
        <div
          onClick={() => {
            setShowCer(true);
            handleFlip();
          }}
          className={`text-[1.6em] mb-2 cursor-pointer hover:text-green-700 ${
            showCer ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <ion-icon name="shield-checkmark-outline"></ion-icon>
        </div>
      </div>
      {/* Select */}
      <div className="w-full">
        <Select
          placeholder="Select Size"
          options={options}
          onChange={handleChange}
          styles={colourStyles}
          className="text mt-1"
          value={size}
        />
      </div>
      {/* Price */}
      <div className="flex w-full h-[5vh] mt-4 justify-between items-center">
        <div className="text uppercase text-[1.6em] text-green-800">
          {isAvailable ? `${formatPrice(price)}` : "SOLD OUT"}
        </div>
        {/* Measuring */}
        <div
          onMouseEnter={() => setShowIns(true)}
          onMouseLeave={() => setShowIns(false)}
          onClick={() => setShowVid(true)}
          className="relative translate-x-1 cursor-pointer hover:text-green-700"
        >
          <ion-icon size="large" name="help-circle-outline"></ion-icon>
          <div
            className={`absolute top-1 right-8 rounded-lg w-max h-6 px-3 py-2 font-serif bg-green-900 bg-opacity-15 overflow-hidden ${
              showIns ? "-translate-x-5 opacity-100" : "translate-x-3 opacity-0"
            } transition-all duration-300 border-green-800 border-[0.1em] flex justify-center items-center`}
          >
            Measuring diamonds
          </div>
        </div>
      </div>
      {/* Add */}
      <div className="w-full flex justify-between mt-3">
        <div
          onMouseEnter={() => !size && setShowMissingMsg(true)}
          onMouseLeave={() => setShowMissingMsg(false)}
          onClick={handleAddToCart}
          className={`group w-[83%] h-[2.5em] bg-green-950 flex justify-center items-center cursor-pointer ${
            size && isAvailable && !isProductInCart(details.ProductId)
              ? "bg-opacity-100 shadow-md shadow-green-800 hover:shadow-lg hover:shadow-green-800 transition-all duration-300"
              : "bg-opacity-25 hover:bg-opacity-100 pointer-events-none"
          } }`}
        >
          <div
            className={`text uppercase ${
              size && isAvailable && !isProductInCart(details.ProductId)
                ? "text-green-50"
                : "text-gray-700 group-hover:text-white group-hover:pointer-events-none"
            }`}
          >
            {showMissingMsg && !size ? missingMessage : "Add to Bag"}
          </div>
        </div>
        <div
          onClick={toggleHeart}
          className={`w-[12%] h-[2.5em] text border-green-700 border-[0.1em] flex justify-center items-center hover:text-red-500 cursor-pointer ${
            redHeart ? "text-red-500" : ""
          }`}
        >
          {redHeart ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>
      {/* Contact */}
      <div className="mt-8 flex flex-col justify-between w-full h-[24vh] font-thin text-[1.1em]">
        <div className="flex items-center">
          <ion-icon name="call-outline"></ion-icon>
          <div className="uppercase ml-4 footer-link">
            Order by phone 0888888888
          </div>
        </div>
        <div className="flex items-center">
          <ion-icon name="archive-outline"></ion-icon>
          <div className="uppercase ml-4 footer-link">Find in boutique</div>
        </div>
        <div className="flex items-center">
          <ion-icon name="headset-outline"></ion-icon>
          <div className="uppercase ml-4 footer-link">
            contact an ambassador
          </div>
        </div>
        <div className="flex items-center">
          <ion-icon name="bookmark-outline"></ion-icon>
          <div className="uppercase ml-4 footer-link">book an appointment</div>
        </div>
        <div className="flex items-center">
          <ion-icon name="share-social-outline"></ion-icon>
          <div className="uppercase ml-4 footer-link">Ref.B52</div>
        </div>
      </div>
      {/* CIA */}
      <div
        className={`absolute z-10 -top-3 -left-[40vw] w-[70vw] h-[80vh] border-green-700 border-[0.4em] border-double  ${
          showCer ? "opacity-100" : "opacity-0 pointer-events-none"
        } transform-style-preserve-3d ${
          isFlipped ? "" : "rotate-y-180"
        } transition-all duration-1000 drop-shadow-xl`}
      >
        <div
          style={{
            backgroundImage: `url('https://lapolajewelry.com/image/catalog/san_pham/WEB/4.52%20D%20-1155.jpg')`,
          }}
          className="relative w-full h-full bg-red-500 bg-cover bg-center bg-no-repeat"
        >
          <div
            onClick={() => {
              setShowCer(false);
              handleFlip();
            }}
            className="absolute top-2 right-2 cursor-pointer"
          >
            <ion-icon size="large" name="close-circle-outline"></ion-icon>
          </div>
        </div>
      </div>
      {/* Video */}
      <div
        className={`absolute top-0 left-0 border-green-700 border-[0.3em] rounded-md ${
          showVid
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-[80vh]"
        } transition-all duration-700 pt-8 bg-green-900`}
      >
        <div className="relative">
          <video className="w-full h-[75.5vh]" autoPlay loop muted controls>
            <source src="/Measure.mp4" type="video/mp4" />
          </video>
          <div
            onClick={() => setShowVid(false)}
            className="absolute -top-8 right-0 text-white cursor-pointer"
          >
            <ion-icon size="large" name="close-circle-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}
