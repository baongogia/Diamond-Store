import React from "react";

export default function ProductServices() {
  return (
    <div className="w-full mt-10 flex justify-between">
      <div className="w-[55%] h-[45vh] flex justify-between">
        <div
          style={{
            backgroundImage: `url('https://www.cartier.com/on/demandware.static/-/Library-Sites-CartierSharedLibrary-BGTJ/default/dw1af055b2/w750.jpeg')`,
          }}
          className="w-[50%] h-full bg-cover bg-center"
        ></div>
        <div className="w-[50%] h-full flex justify-center bg-black bg-opacity-5">
          <div className="flex flex-col justify-center items-start w-5/6">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="uppercase text-[1.4em] text tracking-wide mb-3"
            >
              Gift Wrapping
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1300"
              className="tracking-wide mb-3 text-start font-serif"
            >
              Send your presents in our signature packaging with a personalised
              greetings card included.
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="title-link h-10 mb-3 cursor-pointer font-serif"
            >
              Read More
            </div>
          </div>
        </div>
      </div>
      <div className="w-[43%] h-[45vh] bg-black bg-opacity-5 flex justify-center items-center">
        <div className="flex flex-col justify-center items-start w-[87%]">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="uppercase text-[1.4em] text tracking-wide mb-3"
          >
            shipping / return
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1300"
            className="tracking-wide mb-3 text-start font-serif"
          >
            We offer different delivery options. Choose the one you prefer at
            the checkout. You may return or exchange your Eternity creation
            within 30 days.
          </div>
          <div className="flex justify-between w-[40%]">
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="title-link h-10 mb-3 cursor-pointer font-serif"
            >
              View Shiping
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="title-link h-10 mb-3 cursor-pointer font-serif"
            >
              View Return
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
