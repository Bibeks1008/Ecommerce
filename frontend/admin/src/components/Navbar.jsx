import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import "../components/css/navbar.css";
import { adminContext } from "../Context/Context";

const Navbar = () => {
  const { isAuthenticated, setToken } = useContext(adminContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    setToken("");
    navigate("/login");
  };
  return (
    <div className="flex justify-between py-4 px-20 navbar">
      <div className="flex items-center gap-[10px]">
        <img src={logo} alt="logo"></img>
        <div>
          <p className="text-black text-4xl font-semibold">Fashionova</p>
          <p className="text-[12px]">Admin Portal</p>
        </div>
      </div>

      {!isAuthenticated ? (
        <Link to="/login">
          <button className="w-[158px] h-[58px] outline-none border border-[#7a7a7a] rounded-[75px] text-[#515151] text-[20px] font-medium bg-white">
            Login
          </button>
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="w-[158px] h-[58px] outline-none border border-[#7a7a7a] rounded-[75px] text-[#515151] text-[20px] font-medium bg-white"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
