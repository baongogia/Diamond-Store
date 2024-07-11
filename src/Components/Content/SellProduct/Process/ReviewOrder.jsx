import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import PaymentDetails from "../Payment/PaymentDetails";
import PaymentMethod from "../Payment/PaymentMethod";
import ShoppingFooter from "../../../Footer/ShoppingFooter";
import { UserContext } from "../../../Header/Login/UserContext";
export default function ReviewOrder() {
  const totalBillRef = useRef(null);
  const itemsRef = useRef(null);
  const [isSticky, setIsSticky] = useState(true);
  const userInfor = useContext(UserContext);
  const userData = userInfor.userData;

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (totalBillRef.current && itemsRef.current) {
        const totalBillRect = totalBillRef.current.getBoundingClientRect();
        const itemsRect = itemsRef.current.getBoundingClientRect();
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
  // Scroll to top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="">
      <div className="flex justify-center items-center bg-white">
        <Link to={"/"} className="w-[70%] h-[70%] mt-5 flex justify-around">
          <div className="w-[20%] text-[2.8em] logo">EterniTy</div>
        </Link>
      </div>
      <div className="">
        <div ref={itemsRef} className="relative w-full ml-16 mt-8">
          <div className="w-[50%] ml-2 mb-8">
            <div className="text text-[1.5em] mb-10">
              PROCEED WITH YOUR ORDER
            </div>
            {/* User address */}
            <div className="w-full h-[45vh] flex justify-center items-center bg-black bg-opacity-5">
              <div className="w-[90%] h-[90%] font-serif flex flex-col justify-around">
                <div className="w-full h-[60%] flex flex-col justify-between">
                  <div className="text uppercase underline mb-4">
                    shipping details
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col justify-between h-14">
                      <div className="text uppercase">shipping address</div>
                      <div className="">
                        {userData?.Gender ? "Mr." : "Mrs."}
                        {userData?.FirstName} {userData?.LastName}
                      </div>
                    </div>
                    <div className="h-10 title-link">Enternity</div>
                  </div>
                  <div className="">{userData?.Address}</div>
                  <div className="">{userData?.Email}</div>
                  <div className="">Ho Chi Minh city | Viet Nam</div>
                  <div className="">
                    {" "}
                    {`<`}+84{`>`} {userData?.PhoneNumber}
                  </div>
                </div>
                <div className="w-full h-[25%] flex flex-col justify-between font-serif">
                  <div className="text uppercase">shipping method</div>
                  <div className="">Standard Delivery</div>
                  <div className="">
                    Order time: {currentTime.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-6">
              <div className="w-[90%] h-[90%] font-serif">
                <div className="text uppercase underline">payment details</div>
                <div className="mt-8 text uppercase">billing details</div>
                <div className="w-[80%] pointer-events-none mt-5">
                  <div className="opacity-60">Billing Address</div>
                  <Select
                    placeholder={`${userData?.Gender ? "Mr." : "Mrs."} ${
                      userData?.FirstName
                    } ${userData?.LastName} ${userData?.Address}`}
                    className="text"
                  />
                </div>
                <div className="flex font-serif mt-4 mb-3">
                  <Link to={`/UserProfile`} className="title-link h-10">
                    Update Address
                  </Link>
                  <Link to={`/UserProfile`} className="title-link h-10 ml-8">
                    Add New
                  </Link>
                </div>
                <div className="">
                  <input
                    type="checkbox"
                    checked={true}
                    className="pointer-events-none"
                    name=""
                    id=""
                  />
                  <label htmlFor="" className="ml-3 underline">
                    I acknowledge that I have read and accepted Eternity’s
                    Conditions of Sale and Privacy Policy
                  </label>
                </div>
                <PaymentMethod />
              </div>
            </div>
          </div>
          <div
            ref={totalBillRef}
            className={`${
              isSticky
                ? "fixed top-[18vh] right-24"
                : "absolute bottom-0 right-40"
            }`}
          >
            <PaymentDetails
              title={"place your order"}
              linkto={"/OrderSuccess"}
            />
          </div>
        </div>
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
