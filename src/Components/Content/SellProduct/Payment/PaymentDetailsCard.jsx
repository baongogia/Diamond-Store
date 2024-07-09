import React from "react";

export default function PaymentDetailsCard({ item }) {
  return (
    <div className="relative w-full mt-8 flex flex-col sm:flex-row items-start sm:items-center">
      <div
        style={{
          backgroundImage: `url(${item.image})`,
        }}
        className="w-full sm:w-[43%] h-[250px] sm:h-full bg-cover bg-center bg-no-repeat"
      ></div>
      <div className="w-full sm:w-[55%] text-[0.8em] h-full mt-4 sm:mt-0 sm:ml-4">
        <div className="w-full flex justify-between">
          <div className="text uppercase text-[1.2em]">{item.name}</div>
        </div>
        <div className="grid grid-cols-2 gap-0">
          <div className="font-serif mt-3">Color: {item.color}</div>
          <div className="mt-3">Size: {item.size}</div>
          <div className="font-serif mt-3">{item.carat} Carat</div>
          <div className="mt-3">Weight: {item.weight}g</div>
        </div>
        <div className="flex font-serif mt-3"></div>
        <div className="text uppercase text-[1.2em] mb-7">
          {item.price.toLocaleString("en-US")}$
        </div>
        <div className="flex items-center border-y-[0.1em] border-x-black w-full h-14">
          <input
            type="checkbox"
            name="wrap"
            className="pointer-events-none"
            id=""
            checked={true}
          />
          <label htmlFor="wrap" className="ml-5 flex items-center">
            <div className="text mr-2">Select for {item.gender}</div>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </label>
        </div>
      </div>
    </div>
  );
}
