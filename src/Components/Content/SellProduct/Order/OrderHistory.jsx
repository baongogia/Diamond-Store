import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../../Header/Login/UserContext";
import HistoryProductCard from "../../Product/HistoryProductCard";
import { RingLoader } from "react-spinners";
import { CSSTransition } from "react-transition-group";
import AOS from "aos";

export default function OrderHistory() {
  // AOS effect
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 2000,
    });
  }, []);

  // Data state
  const { userData } = useContext(UserContext);
  const username = userData?.UserName;
  const [orderHistory, setOrderHistory] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const refs = useRef({});

  // Fetch order history
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(
          `https://localhost:7292/api/Order/OrderHistory?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    // Polling
    const interval = setInterval(() => {
      fetchOrderHistory();
    }, 1000);
    return () => clearInterval(interval);
  }, [username]);

  // Handle Status
  const [selectedStatus, setSelectedStatus] = useState("Accepted");
  const filteredOrders = orderHistory.filter(
    (order) => order.OrderStatus === selectedStatus
  );
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  // Toggle expand/collapse products for an order
  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
    toggleShow();
  };

  // NavList
  const navStatus = (name) => {
    return (
      <div
        onClick={() => setSelectedStatus(name)}
        className={`w-[15%] cursor-pointer h-[68%] border border-green-700 flex justify-center items-center rounded-xl ${
          selectedStatus === name
            ? "bg-green-400 border border-green-700 shadow-md shadow-green-700"
            : ""
        } hover:shadow-md hover:shadow-green-700 hover:bg-green-400`}
      >
        {name}
      </div>
    );
  };

  return (
    <div className="">
      {/* NavBar */}
      <div className="w-screen flex justify-center items-center h-20">
        <div className="w-[81%] font-serif h-[80%] border border-green-700 flex justify-around items-center rounded-md">
          {navStatus("Processing")}
          {navStatus("Accepted")}
          {navStatus("Pending Delivery")}
          {navStatus("Deliverying")}
          {navStatus("Deliveried")}
          {navStatus("Cancelled")}
        </div>
      </div>
      {/* Order History List */}
      <div
        data-aos="zoom-in"
        className="w-screen h-[100vh] -mt-4 flex flex-col justify-center items-center"
      >
        <div className="w-[90%] h-[95%] flex justify-between">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[90%] h-full overflow-y-auto hide-scrollbar">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const nodeRef =
                    refs.current[order.OrderID] || React.createRef();
                  refs.current[order.OrderID] = nodeRef;
                  return (
                    <div key={order.OrderID} className="mb-4">
                      {/* Toggle */}
                      <div
                        className="w-full cursor-pointer bg-green-50 hover:bg-white flex justify-between items-center border-green-700 border p-2 rounded-xl mb-2 transition-all duration-300"
                        onClick={() => toggleExpand(order.OrderID)}
                      >
                        <div className="font-serif">
                          Order Number: #{order.OrderID}
                        </div>
                        <div
                          className={`opacity-55 translate-y-1 transition-all duration-300 ${
                            expandedOrders[order.OrderID] ? "rotate-180" : ""
                          }`}
                        >
                          <ion-icon
                            size="large"
                            name="caret-up-outline"
                          ></ion-icon>
                        </div>
                      </div>
                      {/* Orders */}
                      <CSSTransition
                        in={expandedOrders[order.OrderID]}
                        timeout={300}
                        classNames="product-transition"
                        unmountOnExit
                        nodeRef={nodeRef}
                      >
                        <div ref={nodeRef} className="w-full">
                          {order.products.map((product, index) => (
                            <HistoryProductCard
                              key={index}
                              image={product.Image}
                              name={product.ProductName}
                              material={product.Material}
                              price={order.FinalPrice.toFixed(2)}
                              quantity={product.Quantity}
                              size={product.CustomizedSize}
                              status={order.OrderStatus}
                              code={product.ProductID}
                              OrderId={order.OrderID}
                            />
                          ))}
                        </div>
                      </CSSTransition>
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-[60vh] flex flex-col justify-center items-center">
                  <RingLoader size={100} color="#54cc26" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
