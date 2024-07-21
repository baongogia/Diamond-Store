import React, { useContext, useEffect, useState } from "react";
import OrderDetailsItem from "../Items/OrderDetailsItem";
import ProductCard from "../../Product/ProductCard";
import Slider from "react-slick";
import AOS from "aos";
import { OrderContext } from "../Order/OrderContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../Payment/PaymentContext";
import WarrantyGene from "../Warranty/WarantyGene";

export default function OrderDetails() {
  const [similar, setSimilar] = useState([]);
  const { order, setOrder } = useContext(OrderContext);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const { paymentMethod } = useContext(PaymentContext);
  const navigate = useNavigate();
  const Cancel = () => {
    setIsFlipped(!isFlipped);
    setShowCancel(!showCancel);
  };

  // Fetch Data
  useEffect(() => {
    fetch(
      "https://diamondstoreapi.azurewebsites.net/api/Products/Category/Necklaces"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSimilar(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

  // AOS effect
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 2000,
    });
  }, []);

  // Retrieve order from localStorage on mount
  useEffect(() => {
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, [setOrder]);

  // Update localStorage whenever order state changes
  useEffect(() => {
    if (order) {
      localStorage.setItem("order", JSON.stringify(order));
    }
  }, [order]);

  console.log(order);

  // Fetch latest order data from the server
  const fetchLatestOrder = async () => {
    try {
      const response = await axios.get(
        `https://diamondstoreapi.azurewebsites.net/api/Order/getOrderInfo?id=${order.OrderID}`
      );
      if (response.data) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch latest order:", error);
    }
  };

  // Fetch latest order data periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (order) {
        fetchLatestOrder();
      }
    }, 1000); // Fetch latest data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [order]);

  // Cancel Product
  const cancelProduct = async () => {
    try {
      const response = await axios.put(
        `https://diamondstoreapi.azurewebsites.net/api/Order/CancelOrder?id=${order.OrderID}`
      );
      console.log("Cancel successful!");
      if (response) {
        navigate("/");
        setOrder(null);
        localStorage.removeItem("order");
      }
    } catch (error) {
      console.error("Cancel failed:", error);
    }
  };

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
  const currentStep = getCurrentStep(order?.OrderStatus);

  if (!order) {
    return <div></div>;
  }
  return (
    <div className="mt-12">
      <div className="w-screen flex justify-around">
        <div
          data-aos="fade-right"
          data-aos-duration="1500"
          className="relative w-1/2 h-[50vh] flex justify-center items-center rounded-2xl border-[0.1em]"
        >
          <div className="w-[90%] h-[90%] flex flex-col justify-between">
            <div
              className={`absolute top-5 right-5 text-green-700 cursor-pointer ${
                currentStep === 4
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              } transition-opacity duration-500`}
            >
              <WarrantyGene orderId={order ? order.OrderID : ""} />
            </div>
            {/* Order Number */}
            <div className="text text-[1.4em] flex justify-between uppercase">
              <div className="text-green-800">
                {" "}
                {`Order Number: #${order?.OrderID}`}
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
                    className={`bg-white text-center text-black w-[40%] font-semibold px-4 py-2 text uppercase
                 hover:bg-red-400 hover:text-white border-black border-solid border-[0.08em]  cursor-pointer transition-colors duration-500`}
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
              <div className="flex">
                <div className="">Status:</div>
                <div className="ml-2 text-white bg-green-800 rounded-md px-2">
                  {order.OrderStatus}
                </div>
              </div>
              <div className="">Price: {order.TotalPrice.toFixed(2)}$</div>
              <div className="">Discount: {order.DiscountRate * 100}%</div>
              <div className="">Total: {order.FinalPrice.toFixed(2)}$</div>
              {/* Payment method */}
              <div className="flex items-center">
                <div className="">Payment:</div>
                <div
                  className={`${
                    order.Payment === "Card"
                      ? "bg-blue-400"
                      : order.Payment === "PayPal"
                      ? "bg-yellow-400"
                      : order.Payment === "Received"
                      ? "bg-green-800"
                      : ""
                  } rounded-md px-2 ml-2 text-white`}
                >
                  {order.Payment !== "" ? order.Payment || paymentMethod : ""}
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
        <OrderDetailsItem />
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

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  Swipe: true,
};
