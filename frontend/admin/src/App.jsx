import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminLoginSignup from "./pages/AdminLoginSignup";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { adminContext } from "./Context/Context";

function App() {
  const { isAuthenticated } = useContext(adminContext);
  console.log("isAuthrnticated value is ====>", isAuthenticated);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<AdminLoginSignup />} />
          <Route
            path="*"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" replace />
              ) : (
                <Navigate to="/add-product" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
