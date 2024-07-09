import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Login/UserContext";

export default function MyProfile() {
  const { userData, setUserData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Birthday: "",
    PhoneNumber: "",
    Address: "",
    Gender: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userData) {
      setFormData({
        FirstName: userData.FirstName || "",
        LastName: userData.LastName || "",
        Birthday: userData.Birthday || "",
        PhoneNumber: userData.PhoneNumber || "",
        Address: userData.Address || "",
        Gender: userData.Gender || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.FirstName) newErrors.FirstName = "First Name is required";
    if (!formData.LastName) newErrors.LastName = "Last Name is required";
    if (!formData.Birthday) newErrors.Birthday = "Birthday is required";
    if (!formData.PhoneNumber || !phoneRegex.test(formData.PhoneNumber))
      newErrors.PhoneNumber = "Valid Phone Number is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://localhost:7292/api/Customers/UpdateCustomer/${userData.CustomerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      const text = await response.text();
      alert(text);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${text}`);
      }
      // Update context and localStorage
      const updatedUserData = {
        ...userData,
        ...formData,
      };
      setUserData(updatedUserData);
      console.log(updatedUserData);
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    } catch (error) {
      console.error("There was an error with the request:", error);
    }
  };

  return (
    <div className="w-[72%] flex justify-center">
      <div className="w-full">
        <div className="flex justify-center font-serif text-sm">
          {/* Form */}
          <div className="w-full">
            <div className="mb-4">
              <label className="text-zinc-700 opacity-60">Title</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="Gender"
                    value="Male"
                    onChange={handleChange}
                    checked={formData.Gender}
                    className="form-radio"
                  />
                  <span>Mr</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="Gender"
                    value="Female"
                    onChange={handleChange}
                    checked={formData.Gender === false}
                    className="form-radio"
                  />
                  <span>Mrs</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="Gender"
                    value="Female"
                    onChange={handleChange}
                    checked={formData.Gender === false}
                    className="form-radio"
                  />
                  <span>Miss</span>
                </label>
              </div>
            </div>

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-zinc-700 opacity-60 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="GIA"
                />
                {errors.FirstName && (
                  <p className="text-red-500 text-xs">{errors.FirstName}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 opacity-60 mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="BAO"
                />
                {errors.LastName && (
                  <p className="text-red-500 text-xs">{errors.LastName}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="birthday"
                  className="block text-zinc-700 opacity-60 mb-2"
                >
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="Birthday"
                  max="2023-12-31"
                  className="w-full p-2 border rounded"
                  value={formData.Birthday.slice(0, 10)}
                  onChange={handleChange}
                />
                {errors.Birthday && (
                  <p className="text-red-500 text-xs">{errors.Birthday}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 opacity-60 mb-2">
                  Email*
                </label>
                <input
                  type="text"
                  name="Email"
                  value={userData.Email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="your@gmail.com"
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 opacity-60 mb-2">
                  Phone Number*
                </label>
                <input
                  type="text"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="0123456789"
                />
                {errors.PhoneNumber && (
                  <p className="text-red-500 text-xs">{errors.PhoneNumber}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 opacity-60 mb-2">
                  Username*
                </label>
                <input
                  type="text"
                  name="Username"
                  value={userData.UserName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-gray-100"
                  placeholder="your_username"
                  disabled
                />
              </div>

              <div className="mb-4">
                <label className="block text-zinc-700 opacity-60 mb-2">
                  Address*
                </label>
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="your address"
                />
              </div>

              <div
                className={`bg-black text-center text-white w-full font-semibold px-4 py-2 hover:bg-white
                 hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500 ${
                   true ? "opacity-100" : "opacity-50 pointer-events-none"
                 }`}
                disabled={Object.keys(errors).length > 0}
                onClick={(e) => handleSubmit(e)}
              >
                Save Changes
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
