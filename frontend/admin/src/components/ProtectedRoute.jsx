import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { adminContext } from "../Context/Context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(adminContext);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
