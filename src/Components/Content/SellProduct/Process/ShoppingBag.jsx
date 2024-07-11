import React, { useContext, useEffect, useRef, useState } from "react";
import ShopingBagItems from "../Items/ShopingBagItems";
import ShoppingFooter from "../../../Footer/ShoppingFooter";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Header/Header/Cart/CartContext";
import Navbar from "../../../Header/Header/Navbar/Navbar";
import { UserContext } from "../../../Header/Login/UserContext";

export default function ShoppingBag() {
  const totalBillRef = useRef(null);
  const itemsRef = useRef(null);
  const [isSticky, setIsSticky] = useState(true);
  const { cartItems } = useContext(CartContext);
  const { userData } = useContext(UserContext);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = userData?.DiscountRate * subtotal;

  useEffect(() => {
    const handleScroll = () => {
      if (totalBillRef.current && itemsRef.current) {
        const totalBillRect = totalBillRef.current.getBoundingClientRect();
        const itemsRect = itemsRef.current.getBoundingClientRect();

        // Calculate the position where Total bill should stop
        const stopPosition = itemsRect.height - totalBillRect.height + 15;

        if (window.scrollY >= stopPosition) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <Navbar />
      <div className="relative ml-16">
        {/* Title */}
        <div className="mt-12 w-full h-[20vh]">
          <div className="w-full h-full flex flex-col justify-between items-start">
            <img
              src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-eternal-love-symbol-heart-infinity-sign-calligraphy-for-declarations-vector-png-image_37918768.png"
              alt=""
              className="w-1/6"
            />
            <div className="text uppercase text-[1.6em] tracking-wider">
              shopping bag
            </div>
          </div>
        </div>
        {/* Information */}
        <div ref={itemsRef} className="w-full">
          <div className="w-[64%]">
            <div className="relative w-full h-[12vh] bg-gray-500 bg-opacity-5 mt-14">
              <div className="font-serif absolute top-10 left-8">
                Complimentary exchange or return within 30 days. Read our
                conditions of sales.
              </div>
            </div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <ShopingBagItems id={item.id} item={item} />
              ))
            ) : (
              <div className=""></div>
            )}
          </div>
        </div>
        {/* Total bill */}
        <div
          ref={totalBillRef}
          className={`${
            isSticky ? "fixed top-[50vh]" : "absolute bottom-[52vh]"
          } right-8 w-[30vw] h-[25vh] border-black border-[0.1em] flex justify-center items-center`}
        >
          <div className="flex flex-col justify-between items-center w-[90%] h-[70%]">
            <div className="w-full h-[1%] flex justify-between">
              <div className="text uppercase text-[1.3em]">subtotal</div>
              <div className="text uppercase text-[1.3em]">
                {parseFloat(subtotal).toFixed(2)}$
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="font-serif">Discount</div>
              <div className="">-{discount.toFixed(2)}$</div>
            </div>
            <Link
              to={`/CheckOutPage`}
              className="bg-black uppercase text-center text-white w-full font-semibold py-1 border-green-700 border-[0.1em] cursor-pointer transition-colors duration-500 hover:bg-white hover:text-black"
            >
              proceed to checkout
            </Link>
          </div>
        </div>
        {/* Footer */}
        <div className="-ml-16 mt-16">
          <ShoppingFooter />
        </div>
        <div className="-ml-16 w-screen h-[9vh] bg-green-800 flex items-center">
          <div className="text-white text uppercase ml-24">
            Copyright @ GiaBao
          </div>
        </div>
      </div>
    </div>
  );
}
