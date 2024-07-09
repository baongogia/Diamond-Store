import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import AOS from "aos";
import Confetti from "react-confetti";
import "aos/dist/aos.css";

export default function OrderSuccess() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 2000,
    });
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url('https://wallpaperaccess.com/full/1913580.jpg')`,
      }}
      className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-fixed"
    >
      <div className="relative w-screen h-screen bg-black bg-opacity-10">
        {/* Logo */}
        <Link to={"/"} className="absolute w-full mt-5 flex justify-center">
          <div className="text-[2.8em] text-white text-shadow-lg logo">
            EterniTy
          </div>
        </Link>
        {/* Order Success */}
        <div className="w-screen h-[90vh] pt-10 text-white flex flex-col justify-center items-center">
          <div
            style={{ backdropFilter: "blur(0.4em)" }}
            className="w-1/2 h-[60%] flex flex-col justify-center items-center bg-white bg-opacity-5 rounded-lg shadow-lg shadow-white/50"
          >
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="text uppercase text-[2em] tracking-wider"
            >
              Order Successfull !!!
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="font-serif text-[1.6em] tracking-wider"
            >
              Thank you for shopping with Enternity
            </div>
            {/* Buttons */}
            <div className="flex flex-col ">
              <NavLink
                to={"/OrderDetails"}
                data-aos="fade-up"
                data-aos-duration="1800"
                className="text mt-5 p-4 text-blue-500 rounded-md bg-white bg-opacity-50 transition-all duration-300 ease-in-out
                 hover:bg-blue-500 hover:text-white border-[0.15em] flex justify-center items-center uppercase"
              >
                <div className="">View your order details</div>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </NavLink>
              <NavLink
                to={"/"}
                data-aos="fade-up"
                data-aos-duration="2000"
                className="text mt-2 p-4 border-[0.15em] rounded-md bg-white bg-opacity-50 transition-all duration-300 ease-in-out
                 text-green-500 hover:bg-green-500 hover:text-white flex justify-center items-center uppercase"
              >
                <div className="">continue shopping</div>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* Animation */}
      <Confetti
        drawShape={(ctx) => {
          ctx.beginPath();
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i;
            const x = (0.2 + 1.5 * angle) * Math.cos(angle);
            const y = (0.2 + 1.5 * angle) * Math.sin(angle);
            ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.closePath();
        }}
      />
    </div>
  );
}
