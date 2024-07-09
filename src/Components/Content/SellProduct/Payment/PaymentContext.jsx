import React, { createContext, useState } from "react";

// Tạo context
export const PaymentContext = createContext();

// Tạo provider để bao bọc ứng dụng
export const PaymentProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <PaymentContext.Provider value={{ paymentMethod, setPaymentMethod }}>
      {children}
    </PaymentContext.Provider>
  );
};
