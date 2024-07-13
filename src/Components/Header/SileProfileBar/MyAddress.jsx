import React, { useContext } from "react";
import { UserContext } from "../Login/UserContext";

export default function MyAddress() {
  const { userData } = useContext(UserContext);
  return (
    <div className="w-[72%] h-[60vh] flex justify-center">
      <div className="w-full h-10 flex justify-center items-center Mfont text-white rounded-lg bg-green-700">
        Your address:{" "}
        {userData.Address !== ""
          ? userData.Address
          : "Please edit your address at My Profile"}
      </div>
    </div>
  );
}
