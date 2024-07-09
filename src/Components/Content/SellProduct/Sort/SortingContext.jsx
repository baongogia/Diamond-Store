import React, { createContext, useState } from "react";

export const SortingContext = createContext();

export const SortingProvider = ({ children }) => {
  const [sortOption, setSortOption] = useState("");

  return (
    <SortingContext.Provider value={{ sortOption, setSortOption }}>
      {children}
    </SortingContext.Provider>
  );
};
