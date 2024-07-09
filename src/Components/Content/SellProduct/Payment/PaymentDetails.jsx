import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../Header/Header/Cart/CartContext";
import PaymentDetailsCard from "./PaymentDetailsCard";
import { OrderContext } from "../Order/OrderContext";
import { UserContext } from "../../../Header/Login/UserContext";
import { PaymentContext } from "./PaymentContext";

export default function PaymentDetails({ title, linkto }) {
  const navigate = useNavigate();
  const { setOrder } = useContext(OrderContext);
  const { userData } = useContext(UserContext);
  const { paymentMethod } = useContext(PaymentContext);

  // Retrieve order from localStorage if available
  useEffect(() => {
    const savedOrder = localStorage.getItem("order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, [setOrder]);

  // Clear Cart and get cart items
  const { clearCart, cartItems } = useContext(CartContext);
  console.log(cartItems.map((item) => item.productID));

  // Change Product Status
  const changeProductStatus = async (productIds) => {
    try {
      const response = await fetch(
        `https://localhost:7292/api/Products/UpdateStatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productIds),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Status order change successfully:", result);
    } catch (error) {
      console.error("There was an error creating the order:", error);
    }
  };

  // Create Order
  const createOrder = async () => {
    const orderData = {
      Username: userData.UserName,
      OrderDate: new Date().toISOString(),
      PaymentMethod: paymentMethod,
      Products: cartItems.map((item) => ({
        ProductID: item.productID,
        ProductName: item.name,
        CustomizedSize: item.size,
        Quantity: item.quantity,
      })),
      Deposits: 0,
    };

    try {
      const response = await fetch(
        "https://localhost:7292/api/Order/createorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setOrder(result);
      localStorage.setItem("order", JSON.stringify(result));
      changeProductStatus(cartItems.map((item) => item.productID));
      console.log("Order created successfully:", result);
      clearCart();
    } catch (error) {
      console.error("There was an error creating the order:", error);
    }
  };

  // Calculate Total
  const total = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const subtotal = total;
  const discount = userData.DiscountRate * total;
  const finalPrice = total - discount;

  // Handle Click
  const handleClick = () => {
    if (title.toLowerCase() === "place your order") {
      createOrder();
    }
    navigate(`${linkto}`);
  };

  return (
    <div className="w-[35vw] h-[80vh] bg-black bg-opacity-5 flex justify-center items-center">
      <div className="w-[90%] h-[93%]">
        <div className="flex w-full justify-between items-center">
          <div className="">
            <div className="text uppercase text-[1.3em]">order summary</div>
            <div className="">{cartItems.length} Items</div>
          </div>
          <div className="font-serif title-link h-10">Modify</div>
        </div>
        {/* Products */}
        <div className="relative w-full flex flex-col h-[31vh] overflow-y-auto mb-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <PaymentDetailsCard key={item.productID} item={item} />
            ))
          ) : (
            <div className=""></div>
          )}
        </div>

        {/* Bill info */}
        <div
          className={`w-full h-[25vh] border-black border-[0.1em] flex justify-center items-center`}
        >
          <div className="flex flex-col justify-between items-center w-[90%] h-[80%]">
            <div className="w-full h-[60%] flex flex-col justify-between border-b-black border-b-[0.1em] border-opacity-30">
              <div className="w-full flex justify-between">
                <div className="text uppercase text-[1.3em]">subtotal</div>
                <div className="text uppercase text-[1.3em]">
                  {parseFloat(subtotal).toFixed(2)}$
                </div>
              </div>

              <div className="w-full flex justify-between mb-4">
                <div className="text uppercase text-[0.9em]">
                  STANDARD DELIVERY
                </div>
                <div className="text uppercase text-[0.9em]">0.00$</div>
              </div>
            </div>

            <div className="w-full h-1 flex justify-between mt-4 mb-6">
              <div className="font-serif">Discount</div>
              <div className="">-{discount.toFixed(2)}$</div>
            </div>

            <div className="w-full flex justify-between">
              <div className="text uppercase text-[1.3em]">TOTAL</div>
              <div className="text uppercase text-[1.3em]">
                {finalPrice.toFixed(2)}$
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div
            onClick={handleClick}
            className={`uppercase text-center w-full bg-black text-white font-semibold py-1 border-black border-[0.1em]
             cursor-pointer transition-colors duration-500 hover:bg-white hover:text-black`}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}
