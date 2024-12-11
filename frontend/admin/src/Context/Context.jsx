import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const adminContext = createContext(null);

export default function AdminContextProvider({ children }) {
  const [selectedSidebar, setSelectedSidebar] = useState("Add Product");
  const [token, setToken] = useState(localStorage.getItem("token") ?? null);
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
    }

    const now = Math.floor(Date.now() / 1000);

    if (decoded?.exp < now) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminId");
      setToken("");
    }
    console.log("decoded data is ===> ", decoded);
  }, [token, isAuthenticated]);

  const contextValue = {
    selectedSidebar,
    setSelectedSidebar,
    isAuthenticated,
    token,
    setToken,
  };
  return (
    <adminContext.Provider value={contextValue}>
      {children}
    </adminContext.Provider>
  );
}
