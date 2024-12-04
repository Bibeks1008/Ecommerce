import React from "react";

import logo from "../assets/logo.png";
import "../components/css/navbar.css";

const Navbar = () => {
  return (
    <div className="flex justify-between py-4 px-20 navbar">
      <div className="flex items-center gap-[10px]">
        <img src={logo} alt="logo"></img>
        <div>
          <p className="text-black text-4xl font-semibold">Fashionova</p>
          <p className="text-[12px]">Admin Portal</p>
        </div>
      </div>

      <button className="w-[158px] h-[58px] outline-none border border-[#7a7a7a] rounded-[75px] text-[#515151] text-[20px] font-medium bg-white">
        Login
      </button>
    </div>
  );
};

export default Navbar;
