import React, { useContext } from "react";
import { UserContext } from "../../../Header/Login/UserContext";

export default function PayInfo() {
  const userInfor = useContext(UserContext);
  const userData = userInfor.userData;
  const Input = ({ type, label, placeholder, value }) => {
    return (
      <div className="mb-8">
        <label className="block">
          <span className="block text-sm text-zinc-700 opacity-60">
            {label}
          </span>
          <input
            type={type}
            required
            placeholder={placeholder}
            value={value}
            className="peer outline-none border-b-[0.1em] border-b-black bg-zinc-300 bg-opacity-0 w-full h-[2em]"
          />
        </label>
      </div>
    );
  };
  return (
    <div className="ml-8 mt-8 mb-10 w-[55%]">
      <div className="w-full mb-4">
        <label htmlFor="" className="text-zinc-700 opacity-60">
          Title
        </label>
        <div className="w-[70%] flex justify-between">
          <input
            type="radio"
            name="choice"
            value="option1"
            checked={userData?.Gender}
          />
          <label htmlFor="option1">Mr</label>
          <br></br>

          <input
            type="radio"
            name="choice"
            value="option2"
            checked={!userData?.Gender}
          />
          <label htmlFor="option2">Mrs</label>
          <br></br>

          <input
            type="radio"
            name="choice"
            value="option3"
            checked={!userData?.Gender}
          />
          <label htmlFor="option3">Miss</label>
          <br></br>
        </div>
      </div>
      <Input
        type="text"
        label="First Name"
        placeholder="GIA"
        value={userData?.FirstName}
      />
      <Input
        type="text"
        label="Last Name"
        placeholder="BAO"
        value={userData?.LastName}
      />
      <Input
        type="text"
        label="Address Line 1"
        placeholder="Address Line 1"
        value={userData?.Address}
      />
      <Input type="text" label="Address Line 2" placeholder="Address Line 2" />
      <div className="-mt-4 mb-2">
        <label className="font-serif text-zinc-500">Country</label>
        <input
          type="text"
          name="myDataList"
          list="myList"
          className="w-full outline-none bg-zinc-300 bg-opacity-0"
          placeholder="Viet Nam"
        />
        <datalist id="myList">
          <option value="Viet Nam"></option>
        </datalist>
      </div>
    </div>
  );
}
