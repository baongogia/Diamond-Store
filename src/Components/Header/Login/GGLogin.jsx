import React, { useEffect, useContext } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const clientID =
  "955907912121-a20eup8a861i31euts7sdp2nqq6dgmot.apps.googleusercontent.com";

function GGLogin() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userData = response.data;
        // Update local storage
        localStorage.setItem("userData", JSON.stringify({ data: userData }));
        localStorage.setItem("isLoggedIn", "true");

        // Update context state
        login(userData);
        navigate("/UserProfile");
      } catch (error) {
        console.error("Failed to fetch user data: ", error);
      }
    },
  });

  return (
    <div
      onClick={() => googleLogin()}
      className="bg-black text-center text-white w-[16vw] font-semibold px-4 py-2 hover:bg-white hover:text-black border-black border-solid border-[0.1em] cursor-pointer transition-colors duration-500"
    >
      <div className="font-serif">Login With Google</div>
    </div>
  );
}

export default GGLogin;
