import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export default function CreditCard() {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div
      className="w-[45vw] h-[30vh] flex items-center justify-center"
      id="CreditCard"
    >
      {/* Card */}
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      {/* Form */}
      <form className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-[90%] py-2 border-green-700 rounded-md border-[0.1em]">
          <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            maxLength="16"
            className="indent-2 outline-none w-full h-full"
          />
        </div>
        <div className="w-[90%] mt-4 py-2 border-green-700 rounded-md border-[0.1em]">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="indent-2 outline-none w-full h-full"
          />
        </div>
        <div className="flex w-[90%] justify-between mt-4">
          <div className="w-[60%] py-2 border-green-700 rounded-md border-[0.1em]">
            <input
              type="tel"
              name="expiry"
              placeholder="Valid Thru"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="4"
              className="indent-2 outline-none w-full h-full"
            />
          </div>
          <div className="w-[30%] py-2 border-green-700 rounded-md border-[0.1em]">
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="3"
              className="indent-2 outline-none w-full h-full"
            />
          </div>
        </div>
        {/* <button className="w-[90%] bg-green-700 rounded-md" type="submit">
          Submit
        </button> */}
      </form>
    </div>
  );
}
