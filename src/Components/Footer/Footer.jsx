import React from "react";
import FooterList from "./FooterList";

export default function Footer() {
  return (
    <div className="">
      {/* Sub */}
      <div className="w-screen h-[12em] mt-16 border-t-[0.1em] border-t-zinc-300 font-serif">
        <div className="flex h-full flex-col justify-center items-center">
          <div className="text">SUBSCRIBE TO OUR NEWSLETTER</div>
          <div className="flex mt-5">
            <input
              type="email"
              name=""
              placeholder="Email"
              className="outline-none w-[18em] border-b-[0.1em] border-b-black"
            />
            <div
              className="bg-black text-center text-white w-[60%] font-semibold px-4 py-1
                 hover:bg-white hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500"
            >
              SUBSCRIBE
            </div>
          </div>
        </div>
      </div>
      {/* List */}
      <FooterList />
      {/* Logo */}
      <div className="w-screen h-[6em] flex justify-center items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfQKzLQdB9YfdlZXmfFGHXJPTuz849jMo9dvQU_zHVVWdlKGpa8ZMLKPY_NSWDL7Ej6oM&usqp=CAU"
          alt=""
          className="w-[8%] mr-12 mt-4 relative -z-50"
        />
        <img
          src="https://www.the-infinity-group.com/wp-content/uploads/2015/09/logo_black_nav.png"
          alt=""
          className="w-[8%] mr-16"
        />
        <img
          src="https://iconape.com/wp-content/png_logo_vector/eternity.png"
          alt=""
          className="w-[8%]"
        />
      </div>
      {/* Copyright */}
      <div className="w-screen h-[4em] flex justify-center items-center bg-green-900">
        <div className="flex justify-between text-white w-[80%] items-center">
          <div className="uppercase">Shop in: VIET NAM</div>
          <div className="text-white uppercase">Copyright @ 2024 GiaBao</div>
        </div>
      </div>
    </div>
  );
}
