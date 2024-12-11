import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { BASE_URL } from "../config.js";

export const ShopContext = createContext(null);

export default function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    token !== null ? true : false
  );

  useEffect(() => {
    setIsAuthenticated(token !== null && token !== "");
  }, [token]);

  useEffect(() => {
    let decoded;
    if (isAuthenticated) {
      decoded = jwtDecode(token);
      console.log("decoded data is ===> ", decoded);
    }

    const now = Math.floor(Date.now() / 1000);

    if (decoded?.exp < now) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      setToken("");
    }
  }, [token, isAuthenticated]);

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
