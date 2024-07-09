import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderItem({ details }) {
  const navigate = useNavigate();
  return (
    <div className="w-full flex items-center mt-5">
      <div
        style={{
          backgroundImage: `url(${details.Image})`,
        }}
        onClick={() => navigate(`/ProductPage/${details.ProductID}`)}
        className="w-36 h-36 rounded-xl bg-cover bg-center cursor-pointer"
      ></div>
      <div className="Mfont ml-6">
        <div className="text uppercase">{details.ProductName}</div>
        <div className="">Size: {details.CustomizedSize}</div>
        <div className="">Material: {details.Material}</div>
        <div className="">Quantity: {details.Quantity}</div>
      </div>
    </div>
  );
}
