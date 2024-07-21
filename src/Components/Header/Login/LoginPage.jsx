import React, { useContext, useEffect, useState } from "react";
import RegisterForm, { Input } from "./RegisterForm";
import GGLogin from "./GGLogin";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [register, setRegister] = useState(false);
  const [active, setActive] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { login } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const navigate = useNavigate();
  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        "https://diamondstoreapi.azurewebsites.net/api/Accounts/login",
        {
          username,
          password,
        }
      );
      const userData = response.data.CustomerInfo;
      const token = response.data.Token;
      console.log(response.data);
      // Update local storage
      localStorage.setItem("userData", JSON.stringify({ data: userData }));
      localStorage.setItem("token", token);
      if (userData.Status) {
        localStorage.setItem("isLoggedIn", "true");
      } else {
        localStorage.setItem("isLoggedIn", "false");
      }
      // Update context state
      login(userData);
      navigate("/UserProfile");

      console.log("Login successful!");
      console.log(response.data);
    } catch (error) {
      setErrors("Wrong username or password");
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const toggleForgotPass = () => {
    setForgotPass(!forgotPass);
    setOverlay(!overlay);
  };

  return (
    <div className="relative z-[0] pointer-events-auto w-[100vw] mt-16">
      <div className="w-full flex justify-center mb-8">
        <div className="w-1/2 flex justify-between">
          <div
            onClick={() => {
              setRegister(false);
              setActive(false);
            }}
            className={`font-bold ${
              active ? "" : "underline"
            } hover:underline uppercase cursor-pointer text-[1.6em]`}
          >
            Already registed?
          </div>
          <div
            onClick={() => {
              setRegister(true);
              setActive(true);
            }}
            className={`font-bold ${
              active ? "underline" : ""
            } hover:underline uppercase cursor-pointer text-[1.6em]`}
          >
            Create your account
          </div>
        </div>
      </div>
      {/* Login form */}
      <div
        className={`relative w-full flex justify-center ${
          register ? "" : "h-[70vh]"
        }`}
      >
        <div
          className={`bg-zinc-300 bg-opacity-15 w-2/3 ${
            register ? "" : ""
          } flex justify-center`}
        >
          {/* Note */}
          <div className={`font-serif mt-10 text-start w-[37.5%]`}>
            {register
              ? "This space allows you to manage your personal information, e-Boutique orders, news updates and newsletter subscriptions."
              : "If you are already registed with Eternity, login here:"}
          </div>
          <div
            className={`absolute top-28 font-serif flex items-center flex-col w-full ${
              register ? "hidden" : ""
            }`}
          >
            {/* Form login */}
            <form onSubmit={handleSubmit} className="w-1/4">
              <label className="block mb-8">
                <span className="block text-sm text-zinc-700 opacity-60">
                  Username
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="your_username"
                  className="peer ... outline-none border-b-[0.1em] border-b-black bg-zinc-300 bg-opacity-0 w-full"
                />
                {errors && <p className="text-red-500 text-xs">{errors}</p>}
              </label>

              <label className="block">
                <span className="block text-sm text-zinc-700 opacity-60">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="*******"
                  className="peer ... outline-none border-b-[0.1em] border-b-black bg-zinc-300 bg-opacity-0 w-full"
                />
                {errors && <p className="text-red-500 text-xs">{errors}</p>}
              </label>
              <div
                onClick={toggleForgotPass}
                className="underline mt-8 cursor-pointer"
              >
                Forgot your password?
              </div>
              <div className="mt-3">
                Read the Privacy Policy for further information
              </div>
              <div className="w-full mt-14 flex flex-col justify-center items-center">
                <button
                  type="submit"
                  className="bg-black text-center text-white w-[63%] font-semibold px-4 py-2
                 hover:bg-white hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500"
                >
                  Login
                </button>
                <div className="mt-2">Or</div>
                <div className="mt-2">
                  <GGLogin />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Register form */}
      <div className={`${register ? "" : "hidden"}`}>
        <RegisterForm />
      </div>
      {/* Forgot password form */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[45vh] bg-white border-t-green-700 border-t-[0.5em] ${
          forgotPass ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } transition-all duration-500 flex flex-col items-center`}
      >
        <div className="relative w-full h-1/6 border-b-[0.1em] border-b-black border-opacity-15">
          <div className="flex h-full justify-center items-center text uppercase text-center text-[1.5em]">
            forgot your password
          </div>
          <div
            onClick={toggleForgotPass}
            className="absolute top-3 right-3 cursor-pointer opacity-50"
          >
            <ion-icon size="large" name="close-outline"></ion-icon>
          </div>
        </div>

        <div className="h-[70%] w-[64%] flex flex-col justify-around items-center">
          <div className="font-serif">
            Provide your account email address to receive an email to reset your
            password.
          </div>
          <div className="w-full">{Input("text", "", "Email address*")}</div>
          <div
            className="bg-black text-center text-white w-[63%] font-semibold px-4 py-2 uppercase text
                 hover:bg-white hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500"
          >
            submit request
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div
        className={`w-screen h-screen z-[-1] transition-opacity duration-500 ${
          overlay ? "opacity-100" : "opacity-0"
        } pointer-events-none bg-black bg-opacity-20 fixed top-0 left-0`}
      ></div>
    </div>
  );
}
