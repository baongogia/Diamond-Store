import React from "react";

export default function HomeCard({ bg }) {
  return (
    <div className="relative group cursor-pointer">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="w-[24vw] h-[45vh] bg-cover bg-center bg-no-repeat"
      >
        <div className="float-right mt-2 mr-2">
          <ion-icon name="logo-instagram"></ion-icon>
        </div>
      </div>
      <div
        className="absolute flex justify-center items-center top-0 w-[24vw] h-[45vh] bg-black bg-opacity-30
       group-hover:opacity-100 opacity-0 transition-opacity duration-500"
      >
        <div className="text uppercase border-white border-[0.1em] text-white px-2">
          discover
        </div>
      </div>
    </div>
  );
}
