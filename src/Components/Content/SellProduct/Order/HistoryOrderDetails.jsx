import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AOS from "aos";
import axios from "axios";
import { RingLoader } from "react-spinners";
import HistoryOrderDetailsItem from "../Items/HistoryOrderDetailsItem";
import { PaymentContext } from "../Payment/PaymentContext";
import { OrderContext } from "../Order/OrderContext";
import Slider from "react-slick";
import ProductCard from "../../Product/ProductCard";
import WarantyGene from "../Warranty/WarantyGene";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  swipe: true,
};

export default function HistoryOrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFlipped, setIsFlipped] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [showCancel, setShowCancel] = useState(false);
  const { paymentMethod } = useContext(PaymentContext);
  const { setOrder } = useContext(OrderContext);
  const [orderProcess, setOrderProcess] = useState(null);
  const date = orderProcess?.OrderDate.slice(0, 10);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 2000,
    });
  }, []);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(
          "https://diamondstoreapi.azurewebsites.net/api/Products/Category/Necklaces"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSimilar(data);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };
    fetchSimilarProducts();
  }, []);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `https://diamondstoreapi.azurewebsites.net/api/Order/getOrderInfo?id=${id}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setOrderProcess(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrderHistory();

    const intervalId = setInterval(fetchOrderHistory, 1000);
    return () => clearInterval(intervalId);
  }, [id]);

  const cancelProduct = async () => {
    try {
      const response = await axios.put(
        `https://diamondstoreapi.azurewebsites.net/api/Order/CancelOrder?orderID=${id}`
      );
      console.log("Cancel successful!");
      if (response) {
        navigate("/");
        setOrder(null);
      }
    } catch (error) {
      console.error("Cancel failed:", error);
    }
  };

  const Cancel = () => {
    setIsFlipped(!isFlipped);
    setShowCancel(!showCancel);
  };

  if (!orderProcess) {
    return (
      <div className="w-screen h-[80vh] flex justify-center items-center">
        <RingLoader size={100} color="#54cc26" />
      </div>
    );
  }

  const getCurrentStep = (status) => {
    switch (status) {
      case "Cancelled":
        return 0;
      case "Processing":
        return 1;
      case "Accepted":
        return 2;
      case "Deliverying":
      case "Pending Delivery":
        return 3;
      case "Deliveried":
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep(orderProcess?.OrderStatus);

  return (
    <div className="mt-12">
      <div className="w-screen flex justify-around">
        <div className="relative w-1/2 h-[50vh] flex justify-center items-center rounded-2xl border-[0.1em]">
          <div className="w-[90%] h-[90%] flex flex-col justify-between">
            <div
              className={`absolute top-5 right-5 text-green-700 cursor-pointer ${
                currentStep === 4
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } transition-opacity duration-500`}
            >
              {/* Warranty */}
              <WarantyGene orderId={id} />
            </div>

            {/* Order Number */}
            <div className="text text-[1.4em] flex justify-between uppercase">
              <div className="text-green-800">
                {" "}
                {`Order Number: #${orderProcess?.OrderID}`}
              </div>
              <div
                onClick={Cancel}
                className={`text-[2em] h-0 -translate-y-3 translate-x-3 cursor-pointer hover:text-red-400  ${
                  currentStep >= 3 || currentStep >= 4 || currentStep === 0
                    ? "hidden"
                    : ""
                }`}
              >
                <ion-icon name="close-outline"></ion-icon>
              </div>
            </div>
            {/* Cancel */}
            <div
              style={{ backdropFilter: "blur(1em)" }}
              className={`absolute z-[999] rounded-2xl left-0 bottom-0 w-full h-full transform-style-preserve-3d ${
                isFlipped ? "" : "rotate-y-180"
              } ${
                showCancel
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } transition-all duration-1000 drop-shadow-xl bg-black bg-opacity-35`}
            >
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="text-center flex flex-col items-center">
                  <div className="text text-[1.2em] mb-2 uppercase">
                    Cancel process?
                  </div>
                  <div className="font-serif w-[70%] mb-2">
                    Are you sure you want to cancel the following product from
                    the cart?
                  </div>
                </div>
                <div className="flex justify-around items-center w-[80%] mt-2">
                  <div
                    onClick={Cancel}
                    className="bg-white text-center text-black w-[40%] font-semibold px-4 py-2 text uppercase
             hover:bg-red-400 hover:text-white border-black border-solid border-[0.08em] cursor-pointer transition-colors duration-500"
                  >
                    cancel
                  </div>
                  <div
                    onClick={cancelProduct}
                    className="bg-black text-center text-white w-[40%] font-semibold px-6 py-2 text uppercase
             hover:bg-green-700 hover:text-black border-black border-solid border-[0.08em] cursor-pointer transition-colors duration-500"
                  >
                    yes
                  </div>
                </div>
              </div>
            </div>
            {/* Process */}
            <div className="w-full flex items-center">
              <div
                className={`w-24 h-24 flex flex-col justify-center items-center rounded-full border-green-700 border-[0.1em] ${
                  currentStep > 1
                    ? "bg-green-400"
                    : currentStep === 1
                    ? "bg-yellow-400"
                    : currentStep === 0
                    ? "bg-red-400"
                    : ""
                }`}
              >
                <div className={`${currentStep > 1 ? "hidden" : ""}`}>
                  <ion-icon name="bag-handle-outline"></ion-icon>
                </div>
                <div
                  className={`${currentStep > 1 ? "hidden" : ""} font-serif`}
                >
                  Processing
                </div>
                {currentStep > 1 && (
                  <ion-icon
                    name="checkmark-circle-outline"
                    className="text-green-700"
                  />
                )}
              </div>
              <div className="border-t-2 border-green-800 w-20"></div>
              <div
                className={`w-24 h-24 flex flex-col justify-center items-center rounded-full border-green-700 border-[0.1em] ${
                  currentStep > 2
                    ? "bg-green-400"
                    : currentStep === 2
                    ? "bg-yellow-400"
                    : ""
                }`}
              >
                <div className={`${currentStep > 2 ? "hidden" : ""}`}>
                  <ion-icon name="bag-check-outline"></ion-icon>
                </div>
                <div
                  className={`${currentStep > 2 ? "hidden" : ""} font-serif`}
                >
                  Accepted
                </div>
                {currentStep > 2 && (
                  <ion-icon
                    name="checkmark-circle-outline"
                    className="text-green-700"
                  />
                )}
              </div>
              <div className="border-t-2 border-green-800 w-20"></div>
              <div
                className={`w-24 h-24 flex flex-col justify-center items-center rounded-full border-green-700 border-[0.1em] ${
                  currentStep > 3
                    ? "bg-green-400"
                    : currentStep === 3
                    ? "bg-yellow-400"
                    : ""
                }`}
              >
                <div className={`${currentStep > 3 ? "hidden" : ""}`}>
                  <ion-icon name="car-sport-outline"></ion-icon>
                </div>
                <div
                  className={`${currentStep > 3 ? "hidden" : ""} font-serif`}
                >
                  Deliverying
                </div>

                {currentStep > 3 && (
                  <ion-icon
                    name="checkmark-circle-outline"
                    className="text-green-700"
                  />
                )}
              </div>
              <div className="border-t-2 border-green-800 w-20"></div>
              <div
                className={`w-24 h-24 flex flex-col justify-center items-center rounded-full border-green-700 border-[0.1em] ${
                  currentStep >= 4 ? "bg-green-400" : ""
                }`}
              >
                <div className={`${currentStep > 4 ? "hidden" : ""}`}>
                  <ion-icon name="star-outline"></ion-icon>
                </div>
                <div
                  className={`${currentStep > 4 ? "hidden" : ""} font-serif`}
                >
                  Complete
                </div>
              </div>
            </div>
            {/* Order Details */}
            <div className="w-full flex flex-col justify-between h-1/2 Mfont">
              <div className="">Create at: {date}</div>
              <div className="flex">
                <div className="">Status:</div>
                <div className="ml-2 text-white bg-green-800 rounded-md px-2">
                  {orderProcess?.OrderStatus}
                </div>
              </div>
              <div className="">
                Price: {orderProcess.TotalPrice.toFixed(2)}$
              </div>
              <div className="">
                Discount: {orderProcess.DiscountRate * 100}%
              </div>
              <div className="">
                Total: {orderProcess.FinalPrice.toFixed(2)}$
              </div>
              <div className="flex items-center">
                <div className="">Payment:</div>
                <div
                  className={`${
                    orderProcess.Payment === "Card"
                      ? "bg-blue-400"
                      : orderProcess.Payment === "PayPal"
                      ? "bg-yellow-400"
                      : orderProcess.Payment === "Received"
                      ? "bg-green-800"
                      : ""
                  } rounded-md px-2 ml-2 text-white`}
                >
                  {orderProcess.Payment || paymentMethod}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 translate-x-[17vw]">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQKzLQdB9YfdlZXmfFGHXJPTuz849jMo9dvQU_zHVVWdlKGpa8ZMLKPY_NSWDL7Ej6oM&usqp=CAU"
              alt=""
              className="w-[85%]"
            />
          </div>
        </div>
        <HistoryOrderDetailsItem
          product={orderProcess.products}
          order={orderProcess}
        />
      </div>
      <div className="relative w-screen mt-36 flex flex-col justify-center items-center h-[50vh]">
        {/* More Products */}
        <div className="absolute -top-16 left-16 flex items-center text-green-800">
          <div className="text text-[1.5em] uppercase">More product</div>
          <div className="translate-y-[10%]">
            <ion-icon size="large" name="chevron-forward-outline"></ion-icon>
          </div>
        </div>
        {/* List Products */}
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="relative w-[92%] h-[56vh] flex justify-center items-center"
        >
          <div className="w-full ml-3 h-full">
            <Slider className="w-full h-full" {...settings}>
              {similar.slice(0, 4).map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.ProductId}
                  img={item.Image}
                  hovimg={item.Image}
                  name={item.ProductName}
                  material={item.Material}
                  price={parseFloat(item.ProductPrice).toFixed(2)}
                  mini={false}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
