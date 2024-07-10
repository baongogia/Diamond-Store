import React, { useContext } from "react";
import CreditCard from "./CreditCard";
import { CartContext } from "../../../Header/Header/Cart/CartContext";
import Paypal from "./Paypal";
import { PaymentContext } from "./PaymentContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Header/Login/UserContext";
import { OrderContext } from "../Order/OrderContext";

export default function PaymentMethod() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { setOrder } = useContext(OrderContext);
  const { userData } = useContext(UserContext);
  const { paymentMethod, setPaymentMethod } = useContext(PaymentContext);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const deposit = subtotal / 10;

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

  const createOrder = async (paymentDetails) => {
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
      Deposits: deposit,
      PaymentDetails: paymentDetails,
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
      clearCart();
    } catch (error) {
      console.error("There was an error creating the order:", error);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentSuccess = (details) => {
    createOrder(details);
    clearCart();
    navigate("/OrderSuccess");
    console.log("Payment Successful:", details);
  };

  return (
    <div className="mt-10 font-serif">
      <div className="text uppercase">Payment method</div>
      <div className="relative w-[15vw] mt-4 mb-12 flex flex-col justify-between">
        {/* Credit Card */}
        {/* <div className="flex items-center justify-between w-[80%] mb-3">
          <div className="w-1/4">
            <input
              type="radio"
              name="pay"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={handlePaymentMethodChange}
              className=""
            />
          </div>
          <div className="w-1/4">
            <ion-icon size="large" name="card-outline"></ion-icon>
          </div>
          <div className="w-1/2">
            <label htmlFor="Card">Card</label>
          </div>
        </div> */}
        {/* Credit Card form */}
        {/* <div
          className={`${
            paymentMethod === "Card" ? "" : "hidden"
          } -translate-y-4 transition-all duration-300 ease-in-out`}
        >
          <CreditCard amount={subtotal - 0.05 * subtotal} />
        </div> */}
        {/* PayPal */}
        <div className="relative flex items-center justify-between w-[80%] mb-3">
          <div className="w-1/4">
            <input
              type="radio"
              name="pay"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={handlePaymentMethodChange}
              className=""
            />
          </div>
          {paymentMethod === "PayPal" ? (
            <div className="w-full ml-10 px-3 rounded-lg mt-8 mb-2 h-16 flex justify-center items-center cursor-pointer">
              <div className="">
                <Paypal
                  amount={subtotal - 0.05 * subtotal}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            </div>
          ) : (
            <div className="w-3/4 flex items-center justify-between">
              <div className="w-1/3">
                <ion-icon size="large" name="logo-paypal"></ion-icon>
              </div>
              <div className="w-2/3">
                <label htmlFor="PayPal">PayPal</label>
              </div>
            </div>
          )}
        </div>
        {/* When Received */}
        <div className="flex items-center justify-between w-[80%]">
          <div className="w-1/4">
            <input
              type="radio"
              value="Received"
              name="pay"
              checked={paymentMethod === "Received"}
              onChange={handlePaymentMethodChange}
              id=""
              className=""
            />
          </div>
          <div className="w-1/4">
            <ion-icon
              size="large"
              name="checkmark-done-circle-outline"
            ></ion-icon>
          </div>
          <div className="w-1/2">
            <label htmlFor="Received" className="-translate-x-4">
              Received
            </label>
          </div>
        </div>
        <div
          className={`${
            paymentMethod === "Received" ? "" : "hidden"
          } w-[40vw] h-[25vh] mt-4 flex items-center`}
        >
          <div
            style={{
              backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQKzLQdB9YfdlZXmfFGHXJPTuz849jMo9dvQU_zHVVWdlKGpa8ZMLKPY_NSWDL7Ej6oM&usqp=CAU')`,
            }}
            className="w-1/2 h-full bg-contain bg-center bg-no-repeat"
          ></div>
          <div className="w-1/2 h-full flex flex-col justify-between">
            <div className="">
              Please make a payment of 10% of the product's value in advance to
              complete the order.
            </div>
            <div className="">
              <div className="text h-[3em] overflow-y-auto">
                Product:{" "}
                {cartItems.map((item) => (
                  <div className="text-green-800" key={item.productID}>
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="text">Cost: ${deposit.toFixed(2)}</div>
            </div>
            {paymentMethod === "Received" && (
              <div className="relative w-full h-10 bg-yellow-400 cursor-pointer hover:bg-opacity-85 rounded-full flex justify-center items-center">
                <div className=" w-full text text-white uppercase">
                  <div className="absolute top-0 right-[35%] z-0">
                    <img
                      src="https://canhme.com/wp-content/uploads/2016/01/Paypal.png"
                      alt=""
                      className="w-24 -translate-y-[0.1em]"
                    />
                  </div>
                </div>
                <div className="absolute top-0 opacity-0 left-10 z-10">
                  <div className="w-full -translate-y-2 rounded-lg mt-8 mb-2 h-16 flex justify-center items-center cursor-pointer">
                    <div className="">
                      <Paypal
                        amount={subtotal * 0.1}
                        onSuccess={handlePaymentSuccess}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="">
        For further information about how we use your personal information,
        please see our Privacy Policy.
      </div>
    </div>
  );
}
