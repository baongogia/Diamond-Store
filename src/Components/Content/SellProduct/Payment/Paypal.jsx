import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AZLMH3ZZYT0NUzZ2Bg1laTRJguXcbXUCWiwhh61sjvjZH2aBM-95cxEUgobuIIZrH_kR4lLYzi7PbaSW",
        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
            // Xử lý logic sau khi thanh toán thành công ở đây
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
