import React from "react";
import { useNavigate } from "react-router-dom";

export default function HistoryProductCard({
  image,
  name,
  material,
  price,
  quantity,
  size,
  status,
  code,
  OrderId,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[23vh] mt-4 flex flex-col justify-center items-center rounded-xl border">
      <div className="w-[95%] h-[90%] flex justify-between items-center">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="w-[15%] h-full bg-cover bg-center rounded-lg"
        ></div>
        <div className="font-serif -translate-x-1/2 w-[55%] h-[90%] flex flex-col justify-between">
          <div className="text uppercase text-[1.3em]">{name}</div>
          <div className="flex">
            <div className="">Material: {material}</div>
            <div className="ml-5">Size: {size}</div>
          </div>
          <div className="">Quantity: {quantity}</div>
          <div className="">Total Price: {price}$</div>
          <div className="flex justify-between w-[60%]">
            <div
              onClick={() => navigate(`/ProductPage/${code}`)}
              className="border p-2 flex items-center rounded-md hover:bg-green-700 hover:text-white cursor-pointer border-green-700"
            >
              <ion-icon name="reload-outline"></ion-icon>
              <div className="ml-2">Buy it Again</div>
            </div>
            <div
              onClick={() => navigate(`/ProductPage/${code}`)}
              className="border p-2 flex items-center rounded-md hover:bg-green-700 hover:text-white cursor-pointer border-green-700"
            >
              <div className="">View item</div>
            </div>
            <div
              onClick={() => navigate(`/HistoryOrderDetails/${OrderId}`)}
              className="border p-2 flex items-center rounded-md hover:bg-green-700 hover:text-white cursor-pointer border-green-700"
            >
              <div className="">Track package</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
