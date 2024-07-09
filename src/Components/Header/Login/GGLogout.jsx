import React, { useEffect } from "react";
import { gapi } from "gapi-script";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { clientID } from "./GGLogin";

function GGLogout() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }
    gapi.load("client: auth2", start);
  }, []);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const logOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userData");
    googleLogout();
    goToHome();
    window.location.reload();
  };

  return (
    <div
      className="bg-black text-center text-white w-[8vw] font-semibold px-4 py-2 uppercase
    hover:bg-white hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500"
      onClick={() => logOut()}
    >
      <div className="">Log out</div>
    </div>
  );
}

export default GGLogout;
