import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import CartItems from "./CartItems";

export default function Cart({ setShowCart, setOverlay }) {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [navigateTo, setNavigateTo] = useState(null);

  const subtotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleShow = () => {
    setShowCart(false);
    setOverlay(false);
  };

  const handleLinkClick = (path) => {
    setShowCart(false);
    setOverlay(false);
    setNavigateTo(path);
  };

  useEffect(() => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  }, [navigateTo, navigate]);

  return (
    <div
      className={`relative w-[33vw] border-l-[0.1em] border-l-green-700 h-screen flex flex-col justify-center items-center`}
    >
      {/* Title */}
      <div className="w-full max-h-[6em] py-3 border-b-[0.1em] border-t-green-700 border-opacity-40 flex justify-around items-center">
        <div className="w-full flex justify-around items-center">
          <div className="uppercase font-semibold text-[2em] tracking-wide">
            Shopping cart
          </div>
          {/* Close Cart */}
          <div
            onClick={handleShow}
            className={`absolute right-5 top-3 text-[2.5em] cursor-pointer hover:opacity-50`}
          >
            <ion-icon name="close-outline"></ion-icon>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="w-[90%] h-[70vh] overflow-y-auto mt-8">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItems id={item.id} product={item} key={index} />
          ))
        ) : (
          <div className=""></div>
        )}
      </div>
      {/* Check out */}
      {cartItems.length > 0 ? (
        <div className="mb-8 w-[85%] h-[20vh] flex flex-col justify-evenly border-t-[0.1em] border-t-green-900 border-opacity-10">
          <div className="text text-[1.3em] uppercase flex w-full justify-between">
            <div className="">subtotal</div>
            <div className="">${subtotal}</div>
          </div>
          <div className="font-serif">
            Shipping and taxes calculated at checkout.
          </div>
          <div
            onClick={() => handleLinkClick("/ShoppingBag")}
            className="bg-black text uppercase text-center text-white w-full font-semibold px-4 py-2 border-black border-[0.1em] cursor-pointer transition-colors duration-500 hover:bg-white hover:text-black"
          >
            View my shopping bag
          </div>
        </div>
      ) : (
        <div className="w-full h-full -translate-y-1/2 flex justify-center items-center">
          Your shopping cart is empty {`:<`}
        </div>
      )}
    </div>
  );
}
