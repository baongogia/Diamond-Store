import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  img,
  hovimg,
  name,
  material,
  price,
  mini,
}) {
  const [onhover, setOnHover] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className={`group ${
        mini ? "w-[16vw] h-[50vh]" : "w-[21vw] h-[55vh]"
      }  flex flex-col items-center
    hover:border-x-[0.1em] hover:border-b-[0.1em] hover:border-green-900 hover:border-opacity-25 pt-2`}
    >
      {/* Background */}
      <div
        onClick={() => navigate(`/ProductPage/${id}`)}
        className={`relative overflow-hidden cursor-pointer w-11/12 ${
          mini ? "h-1/2" : "h-[65%]"
        }`}
        onMouseEnter={() => setOnHover(true)}
      >
        <div
          style={{
            backgroundImage: `url(${img})`,
          }}
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
            onhover ? "opacity-0" : "opacity-100"
          } `}
        ></div>
        <div
          style={{ backgroundImage: `url(${hovimg})` }}
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 ${
            onhover ? "opacity-100 scale-125" : "opacity-0"
          }`}
        ></div>
      </div>

      {/* Name */}
      <div
        className={`text-center uppercase overflow-hidden ${
          mini ? "w-[70%]" : "w-[90%]"
        } leading-5 mt-2`}
      >
        <p className="text">{name}</p>
      </div>
      {/* Material */}
      <div className="mt-2 max-h-12 font-serif w-[80%] overflow-hidden text-center">
        {material}
      </div>
      {/* Price */}
      <div className="mt-2 mb-2 text uppercase text-[1.1em]">{`${price}$`}</div>
      {/* Select */}
      <div
        className={`text bg-black text-white text-center uppercase py-1 w-[90%] border-black border-[0.1em]
     hover:bg-white hover:text-black ${
       onhover ? "opacity-100" : "opacity-0"
     } cursor-pointer transition-all duration-500 mb-3`}
      >
        select size
      </div>
    </div>
  );
}
