import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataFil, setDataFil] = useState([]);
  const [apiUrl, setApiUrl] = useState("");

  return (
    <DataContext.Provider value={{ dataFil, setDataFil, apiUrl, setApiUrl }}>
      {children}
    </DataContext.Provider>
  );
};
