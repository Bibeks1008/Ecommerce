import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminContextProvider from "./Context/Context";
import AdminLoginSignup from "./pages/AdminLoginSignup";

function App() {
  return (
    <>
      <AdminContextProvider>
        <BrowserRouter>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/login" element={<AdminLoginSignup />}></Route>
            {/* <Route path="/" element={<AddProduct />}></Route> */}
          </Routes>
        </BrowserRouter>
      </AdminContextProvider>
    </>
  );
}

export default App;
