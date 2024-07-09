import React from "react";

export default function ShoppingFooter() {
  return (
    <div className="w-screen h-[35vh] flex justify-around items-center">
      <div className="w-[90%] h-full flex justify-between items-start border-t-[0.1em] border-t-black border-opacity-20">
        <div className="mt-10 w-[40%] mr-4">
          <div className="text mb-6 text-[1.2em]">
            COMPLIMENTARY SHIPPING & RETURNS
          </div>
          <div className="font-serif mb-4 text-[0.9em]">
            We offer you several shipping options and the possibility to return
            or exchange your purchased creations.
          </div>
          <div className="flex">
            <div className="font-serif title-link h-10">View shipping</div>
            <div className="ml-8 font-serif title-link h-10">View rerturns</div>
          </div>
        </div>

        <div className="mt-10 mr-4">
          <div className="text text-[1.2em]">100% SECURE PAYMENT</div>
          <div className="">
            <img
              src="https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw2a232f89/payment-processors.png"
              alt=""
            />
          </div>
          <div className="font-serif text-[0.9em] mt-2 mb-2">
            All transactions are safe and secure.
          </div>
          <div className="font-serif title-link h-10 w-[10em]">
            See More Information
          </div>
        </div>

        <div className="mt-10">
          <div className="text text-[1.2em] mb-6">AUTHENTIC GUARANTEE</div>
          <div className="font-serif mb-4 text-[0.9em] w-[90%]">
            Eternity guarantees the authenticity of all products purchased
            through Eternity online.
          </div>
          <div className="font-serif title-link h-10 w-[7em]">
            Discover more
          </div>
        </div>
      </div>
    </div>
  );
}
