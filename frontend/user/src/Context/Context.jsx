import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product.js";

export const ShopContext = createContext(null);

const getDefaultCart = function (all_product) {
  let cart = {};
  for (let index = 1; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

export default function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(getDefaultCart(all_product));

  const addToCart = function (itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = function (itemId) {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmountAndQuantity = function () {
    let totalAmount = 0;
    let totalCartItems = 0;
    for (const [i, val] of Object.entries(cartItems)) {
      if (val > 0) {
        totalAmount += val * all_product[i].new_price;
        totalCartItems += val;
      }
    }
    return [totalAmount, totalCartItems];
  };

  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    token !== null ? true : false
  );
  
  useEffect(() => {
    setIsAuthenticated(token !== null && token !== "");
  }, [token]);

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmountAndQuantity,
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}
