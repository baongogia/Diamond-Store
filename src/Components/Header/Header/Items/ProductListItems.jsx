import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductListItems({ img, title, category }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/AllItems/${category}`)}
      className="flex flex-col justify-center items-center"
    >
      <div
        style={{ backgroundImage: `url(${img})` }}
        className="w-[8em] h-[8em] bg-cover bg-center bg-no-repeat rounded-sm cursor-pointer"
      ></div>
      <div className="font-sans w-[8em] uppercase text-center mt-2 opacity-50 max-h-12 overflow-hidden">
        {title}
      </div>
    </div>
  );
}
