import { createContext, useState, useEffect } from "react";

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
