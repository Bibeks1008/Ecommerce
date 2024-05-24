import React, { createContext } from "react";
import all_product from "../Components/Assets/all_product.js";

export const ShopContext = createContext({ all_product});

export default function ShopContextProvider({ children }) {
  const contextValue = { all_product };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}
