import React, { useContext } from "react";

import { adminContext } from "../Context/Context";

import "./css/sidebar.css";

const Sidebar = () => {
  const { selectedSidebar, setSelectedSidebar } = useContext(adminContext);

  console.log(selectedSidebar);

  return (
    <div className="fixed left-0 bottom-0 top-[97px] px-5 pt-6 sidebar flex flex-col gap-4 ">
      <div
        className={`cursor-pointer px-3 py-2 rounded-[8px] ${
          selectedSidebar === "Add Product" ? "bg-slate-300" : ""
        }`}
        onClick={() => setSelectedSidebar("Add Product")}
      >
        Add Product
      </div>
      <div
        className={`cursor-pointer px-3 py-2 rounded-[8px] ${
          selectedSidebar === "All Products" ? "bg-slate-300" : ""
        }`}
        onClick={() => setSelectedSidebar("All Products")}
      >
        All Products
      </div>
      <div
        className={`cursor-pointer px-3 py-2 rounded-[8px] ${
          selectedSidebar === "Orders" ? "bg-slate-300" : ""
        }`}
        onClick={() => setSelectedSidebar("Orders")}
      >
        Orders
      </div>
    </div>
  );
};

export default Sidebar;
