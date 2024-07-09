import React from "react";

export default function ShopingBagItems({ item }) {
  return (
    <div className="relative w-full mt-8 h-[50vh] bg-gray-500 bg-opacity-5 overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${item.image})`,
        }}
        className="absolute top-8 left-6 w-1/3 h-[60%] bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="absolute top-8 right-14 w-[55%] h-full">
        <div className="w-full flex justify-between">
          <div className="text uppercase text-[1.2em]">{item.name}</div>
          <div className="text uppercase text-[1.2em]">
            {parseFloat(item.price).toFixed(2)}$
          </div>
        </div>
        <div className="font-serif mt-3">Yellow gold</div>
        <div className="mt-3">Size: {item.size}</div>
        <div className="flex font-serif mt-3">
          <div className="title-link h-10">Add Another Items</div>
          <div className="ml-8 title-link h-10">Move to Wishlist</div>
        </div>
        <div className="text uppercase mt-5">Add gift message</div>
        <div className="text uppercase mt-3 mb-6">Add Engraving</div>
        <div className="flex items-center border-y-[0.1em] border-x-black border-opacity-20 w-full h-16">
          <input type="checkbox" name="wrap" id="" />
          <label htmlFor="wrap" className="ml-5 flex items-center">
            <div className="text mr-2">Add Gift Wrapping</div>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </label>
        </div>
      </div>
      <div className="absolute top-7 text-gray-500 opacity-75 hover:opacity-90 cursor-pointer right-2">
        <ion-icon size="large" name="close-circle-outline"></ion-icon>
      </div>
    </div>
  );
}
