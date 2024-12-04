import { createContext, useState } from "react";

export const adminContext = createContext(null);

export default function AdminContextProvider({ children }) {
  const [selectedSidebar, setSelectedSidebar] = useState("");
  const contextValue = {
    selectedSidebar,
    setSelectedSidebar,
  };
  return (
    <adminContext.Provider value={contextValue}>
      {children}
    </adminContext.Provider>
  );
}
