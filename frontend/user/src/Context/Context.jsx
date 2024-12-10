import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import all_product from "../Components/Assets/all_product.js";
import { BASE_URL } from "../config.js";

export const ShopContext = createContext(null);

const getDefaultCart = function (all_product) {
  let cart = {};
  for (let index = 1; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

export default function ShopContextProvider({ children }) {
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

  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    token !== null ? true : false
  );

  useEffect(() => {
    setIsAuthenticated(token !== null && token !== "");
  }, [token]);

  const getCartItems = async () => {
    let responseData;
    try {
      responseData = await axios.get(BASE_URL + "/cart", {
        headers: {
          Authorization: token,
        },
      });
      console.log("in Cartitems ===> ", responseData);
      if (responseData.status === 200) {
        setCartItems(responseData.data.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const getAllProducts = async () => {
    let responseData;
    try {
      responseData = await axios.get(BASE_URL + "/product");
    } catch (err) {
      console.error("Failed to fetch all products data.", err);
    }

    console.log("in getAllProducts ====>", responseData);
    if (responseData?.status === 200) {
      setAllProducts(responseData?.data?.data);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log("all products are ===>", allProducts);

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
    allProducts,
    cartItems,
    getCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
}
