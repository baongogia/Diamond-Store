import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ amount, onSuccess }) => {
  const handleApprove = (details) => {
    // Lấy danh sách giao dịch hiện tại từ LocalStorage
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    // Thêm giao dịch mới vào mảng
    const updatedTransactions = [...existingTransactions, details];

    // Lưu mảng giao dịch mới vào LocalStorage
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    console.log("Transaction details saved to LocalStorage:", details);

    onSuccess(details);
  };
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
            handleApprove(details);
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
