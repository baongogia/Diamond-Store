import React, { useContext, useState } from "react";
import { UserContext } from "../Login/UserContext";

export default function MyPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { userData } = useContext(UserContext);

  const validate = () => {
    const newErrors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;

    if (!currentPassword) {
      newErrors.currentPassword = "Current Password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New Password is required";
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 5 characters long, contain at least one uppercase letter, and one number";
    }
    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Add password change logic here
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm New Password:", confirmNewPassword);
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setErrors({});
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7292/api/Accounts/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: userData.UserName,
            OldPassword: currentPassword,
            NewPassword: newPassword,
          }),
        }
      );

      const text = await response.text();
      alert(text);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${text}`);
      }
      const result = JSON.parse(text);
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("There was an error with the request:", error);
    }
  };
  return (
    <div className="w-[72%]">
      <div className="w-full bg-zinc-100 ">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <img
            src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-eternal-love-symbol-heart-infinity-sign-calligraphy-for-declarations-vector-png-image_37918768.png"
            alt=""
            className="w-1/6"
          />
          <div className="text uppercase">My password</div>
          <div className="font-serif">
            Manage your password and security preferences.
          </div>
        </div>
      </div>
      <div className="w-full mt-6 flex items-center">
        <form
          onSubmit={handlePasswordChange}
          className="w-2/3 bg-white p-6 rounded-lg"
        >
          {/* Current Password */}
          <div className="mb-8 relative">
            <input
              type="password"
              value={currentPassword}
              placeholder="Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`appearance-none rounded w-full py-2 indent-0 text-gray-700 leading-tight outline-none border-b font-serif ${
                errors.currentPassword ? "border-b-red-500" : "border-b-black"
              }`}
              required
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.currentPassword}
              </p>
            )}
          </div>
          {/* Rule */}
          <div className="font-serif mb-8">
            <div className="">Password requirements</div>
            <ul className="grid grid-cols-2 gap-3 mt-4 list-disc text-zinc-500">
              <li className="translate-x-5">
                No repetition of more than two characters
              </li>
              <li className="translate-x-5">One number</li>
              <li className="translate-x-5">One lowercase character</li>
              <li className="translate-x-5">One uppercase character</li>
              <li className="translate-x-5">5 characters minimum</li>
            </ul>
          </div>
          {/* New Password */}
          <div className="mb-8 relative">
            <input
              type="password"
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className={`appearance-none rounded w-full py-2 indent-0 text-gray-700 leading-tight outline-none border-b font-serif ${
                errors.newPassword ? "border-b-red-500" : "border-b-black"
              }`}
              required
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.newPassword}
              </p>
            )}
          </div>
          {/* Confirm New Password */}
          <div className="mb-8 relative">
            <input
              type="password"
              value={confirmNewPassword}
              placeholder="Confirm New Password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className={`appearance-none rounded w-full py-2 indent-0 text-gray-700 leading-tight outline-none border-b font-serif ${
                errors.confirmNewPassword
                  ? "border-b-red-500"
                  : "border-b-black"
              }`}
              required
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={(e) => updatePassword(e)}
              className="bg-green-700 hover:bg-white hover:text-green-700 px-12 transition-all duration-300 border border-green-700 text-white text-uppercase py-2 rounded-md focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
