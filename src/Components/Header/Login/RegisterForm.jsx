import React, { useState } from "react";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "./firebaseConfig";

export const Input = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  name,
  error,
}) => {
  return (
    <div className="">
      <label className="block mb-8">
        <span className="block text-sm text-zinc-700 opacity-60">{label}</span>
        <input
          type={type}
          required
          placeholder={placeholder}
          className="peer ... outline-none border-b-[0.1em] border-b-black bg-zinc-300 bg-opacity-0 w-full h-[2em]"
          value={value}
          onChange={onChange}
          name={name}
        />
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </label>
    </div>
  );
};

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    FirstName: "",
    LastName: "",
    Gender: "",
    Birthday: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "PreferredLanguage") {
      setPreferredLanguage(value);
    } else if (name === "marketingConsent") {
      setMarketingConsent(!marketingConsent);
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.FirstName) newErrors.FirstName = "First Name is required";
    if (!formData.LastName) newErrors.LastName = "Last Name is required";
    if (!formData.Username) newErrors.Username = "Username is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.Email) {
      newErrors.Email = "Email is required";
    } else if (!emailRegex.test(formData.Email)) {
      newErrors.Email = "Invalid email address";
    }

    // Phone number validation
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.PhoneNumber) {
      newErrors.PhoneNumber = "Phone Number is required";
    } else if (!phoneRegex.test(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "Invalid phone number";
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!formData.Password) {
      newErrors.Password = "Password is required";
    } else if (!passwordRegex.test(formData.Password)) {
      newErrors.Password =
        "Password must be at least 5 characters long, contain at least one uppercase letter, and one number";
    }
    if (formData.Password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // On submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      // Kiểm tra URL và endpoint API
      const response = await axios.post(
        "https://diamondstoreapi.azurewebsites.net/api/Accounts/register",
        formData
      );
      console.log("Registration successful!", response.data);

      // Tạo người dùng trên Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.Email,
        formData.Password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      alert("Verification email sent. Please check your inbox.");

      // Chuyển hướng sau khi đăng ký thành công
      window.location.reload();
    } catch (error) {
      console.error("Registration failed:", error);
      // Hiển thị thông báo lỗi cụ thể từ API
      if (error.response && error.response.data) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="w-2/3 h-full bg-zinc-300 bg-opacity-15">
      <div className="flex justify-center font-serif text-sm">
        <div className="absolute top-10 font-serif flex items-center flex-col w-full">
          <div className="w-1/4 mb-4">
            <label htmlFor="" className="text-zinc-700 opacity-60">
              Title
            </label>
            <div className="w-[70%] flex justify-between">
              <input
                type="radio"
                name="Gender"
                value="Male"
                onChange={handleChange}
              />
              <label htmlFor="Mr">Mr</label>
              <input
                type="radio"
                name="Gender"
                value="Female"
                onChange={handleChange}
              />
              <label htmlFor="Mrs">Mrs</label>
              <input
                type="radio"
                name="Gender"
                value="Female"
                onChange={handleChange}
              />
              <label htmlFor="Miss">Miss</label>
            </div>
          </div>

          <form className="w-1/4" onSubmit={handleSubmit}>
            <Input
              type="text"
              label="First Name*"
              placeholder="GIA"
              value={formData.FirstName}
              onChange={handleChange}
              name="FirstName"
              error={errors.FirstName}
            />
            <Input
              type="text"
              label="Last Name*"
              placeholder="BAO"
              value={formData.LastName}
              onChange={handleChange}
              name="LastName"
              error={errors.LastName}
            />

            <div className="flex flex-col mb-3">
              <label
                htmlFor="birthday"
                className="text-zinc-700 opacity-60 mb-2"
              >
                Date Of Birth
              </label>
              <input
                type="date"
                id="birthday"
                name="Birthday"
                max="2023-12-31"
                className="w-full outline-none bg-zinc-300 bg-opacity-0"
                value={formData.Birthday}
                onChange={handleChange}
              />
              {errors.Birthday && (
                <span className="text-red-500 text-xs">{errors.Birthday}</span>
              )}
            </div>

            <Input
              type="text"
              label="Email*"
              placeholder="your@gmail.com"
              value={formData.Email}
              onChange={handleChange}
              name="Email"
              error={errors.Email}
            />

            <Input
              type="text"
              label="Phone Number*"
              placeholder="0123456789"
              value={formData.PhoneNumber}
              onChange={handleChange}
              name="PhoneNumber"
              error={errors.PhoneNumber}
            />

            <Input
              type="text"
              label="Username*"
              placeholder="your_username"
              value={formData.Username}
              onChange={handleChange}
              name="Username"
              error={errors.Username}
            />

            <Input
              type="password"
              label="Password*"
              placeholder="*****"
              value={formData.Password}
              onChange={handleChange}
              name="Password"
              error={errors.Password}
            />
            <Input
              type="password"
              label="Confirm Password*"
              placeholder="*****"
              value={confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              error={errors.confirmPassword}
            />

            <label className="">Preferred Language</label>
            <input
              type="text"
              list="myList"
              className="w-full outline-none bg-zinc-300 bg-opacity-0"
              placeholder="English"
              value={preferredLanguage}
              onChange={handleChange}
              name="PreferredLanguage"
            />
            <datalist id="myList">
              <option value="English"></option>
            </datalist>

            <div className="mt-4 mb-4">
              For further information about how we use your personal
              information, please see our Privacy Policy
            </div>

            <div className="">
              <input
                type="checkbox"
                id="marketingConsent"
                name="marketingConsent"
                onChange={handleChange}
                value={marketingConsent}
              />
              <label htmlFor="marketingConsent" className="ml-3">
                I would also like to receive marketing information about
                Eternity’s products or services.
              </label>
            </div>

            <div className="w-full mt-10 flex justify-center items-center">
              <button
                type="submit"
                className={`bg-black text-center text-white w-full font-semibold px-4 py-2 hover:bg-white
                 hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500 ${
                   marketingConsent
                     ? "opacity-100"
                     : "opacity-50 pointer-events-none"
                 }`}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
