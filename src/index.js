import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./Components/Header/Login/UserContext";
import { CartProvider } from "./Components/Header/Header/Cart/CartContext";
import { OrderProvider } from "./Components/Content/SellProduct/Order/OrderContext";
import { PaymentProvider } from "./Components/Content/SellProduct/Payment/PaymentContext";
import { SortingProvider } from "./Components/Content/SellProduct/Sort/SortingContext";
import { DataProvider } from "./Components/Content/SellProduct/Sort/DataContext";
import { WishlistProvider } from "./Components/Header/SileProfileBar/WishlistContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="955907912121-cgm3012jtev9j9382l4beh4bjiotlr4t.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <CartProvider>
          <OrderProvider>
            <PaymentProvider>
              <UserProvider>
                <SortingProvider>
                  <DataProvider>
                    <WishlistProvider>
                      <App />
                    </WishlistProvider>
                  </DataProvider>
                </SortingProvider>
              </UserProvider>
            </PaymentProvider>
          </OrderProvider>
        </CartProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
