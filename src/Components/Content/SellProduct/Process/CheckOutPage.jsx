import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PayInfo from "../Payment/PayInfo";
import ShoppingFooter from "../../../Footer/ShoppingFooter";
import PaymentDetails from "../Payment/PaymentDetails";

export default function CheckOutPage() {
  const totalBillRef = useRef(null);
  const itemsRef = useRef(null);
  const [isSticky, setIsSticky] = useState(true);
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (totalBillRef.current && itemsRef.current) {
        const totalBillRect = totalBillRef.current.getBoundingClientRect();
        const itemsRect = itemsRef.current.getBoundingClientRect();

        // Calculate the position where Total bill should stop
        const stopPosition = itemsRect.height - totalBillRect.height - 28;

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
      <div className="flex justify-center items-center bg-white">
        {/* Logo */}
        <Link to={"/"} className="w-[70%] h-[70%] mt-5 flex justify-around">
          <div className="w-[20%] text-[2.8em] logo">EterniTy</div>
        </Link>
      </div>
      {/* Payment */}
      <div className="">
        <div ref={itemsRef} className="relative w-full ml-16 mt-8">
          <div className="w-[50%] ml-2 border-b-[0.1em] border-b-black border-opacity-20 mb-8">
            <div className="text text-[1.5em]">PROCEED WITH YOUR ORDER</div>
            <div className="text ml-10 mt-8 text-[1.2em]">SHIPPING ADDRESS</div>
            <div className=" w-full h-[8vh] flex justify-start items-center bg-gray-500 bg-opacity-5 mt-14">
              <div className="font-serif text-[0.9em] ml-10">
                Please note that for security purposes, Eternity is unable to
                ship to hotels or post office boxes.
              </div>
            </div>
            <div className="font-serif text-[0.85em] w-full flex flex-col justify-center items-center">
              <div className="w-[90%] mt-8">
                {" "}
                Order placed on this site can be delivered only in the Viet Nam.
                If you would like your order to arrive elsewhere, you will need
                to change your Eternity site country.<br></br> For more
                information regarding your order, please contact us at
                84-800-ETERNITY (84-800-888-8888), where a Eternity Ambassador
                will be delighted to assist you.
              </div>
            </div>
            <div className="relative ml-8 w-1/3 h-[25vh] mt-8 border-black border-[0.1em]">
              <div className="absolute bottom-0 w-full h-[60%] flex flex-col justify-between items-center">
                <ion-icon size="large" name="airplane-outline"></ion-icon>
                <div className="font-serif">Ship to an Address</div>
                <ion-icon size="large" name="checkmark-outline"></ion-icon>
              </div>
            </div>
            {/* Shipping information */}
            <div className="">
              <PayInfo />
            </div>
          </div>
          {/* Payment Details */}
          <div
            ref={totalBillRef}
            className={`${
              isSticky
                ? "fixed top-[18vh] right-24"
                : "absolute bottom-0 right-40"
            }`}
          >
            <PaymentDetails
              title={"proceed to payment details"}
              linkto={"/ReviewOrder"}
            />
          </div>
          {/* Ship options */}
          <div className="w-[50%] ml-2 h-[25vh] flex justify-center items-center mb-5 border-b-[0.1em] border-b-black border-opacity-20">
            <div className="w-[90%] h-[85%]">
              <div className="text uppercase">Shipping method</div>
              <div className="font-serif text-[0.95em] mt-8">
                Eternity offers complimentary secure delivery on all orders. A
                signature from an adult 21+ will be required for all delivery
                methods.
              </div>
              <div className="">
                <div className="flex justify-between w-full mt-6">
                  <label htmlFor={"inputId"} className="radio-label">
                    <input
                      checked={true}
                      type="radio"
                      readOnly
                      id={"inputId"}
                      name="radio"
                      className="radio-input"
                    />
                    <div className="custom-radio"></div>
                    <p className="uppercase text hover:underline text-[0.9em] ml-2">
                      {"Ship to your address"}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <ShoppingFooter />
        <div className="w-screen h-[9vh] bg-green-800 flex items-center">
          <div className="text-white text uppercase ml-24">
            Copyright @ GiaBao
          </div>
        </div>
      </div>
    </div>
  );
}
