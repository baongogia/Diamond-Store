import React from "react";
import Menu from "./Menu";
import Feature from "./Feature";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="w-full h-[20vh] z-10">
        <div className="relative z-20 flex justify-between bg-white ">
          {/* Service */}
          <div className="w-[25%] pt-5 pl-8 Mfont">
            <ul className="flex justify-between uppercase tracking-wide">
              <li className="li-link h-10 vn">viet nam</li>
              <li className="li-link h-10">contacts us</li>
              <li className="li-link h-10">services</li>
            </ul>
          </div>
          {/* Logo */}
          <Link
            to={"/"}
            className="w-[70%] h-[70%] mt-5 flex justify-around logo"
          >
            <div className="w-[20%]  mr-44 text-[2.9em]">EterniTy</div>
          </Link>
          {/* Feature */}
          <Feature />
        </div>
        <Menu />
      </div>
    </div>
  );
}
