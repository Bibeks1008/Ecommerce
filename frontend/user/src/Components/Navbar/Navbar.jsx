import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/Context";

import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

export default function Navbar() {
  const { getTotalCartAmountAndQuantity, isAuthenticated, setToken } =
    useContext(ShopContext);



  const [menu, setMenu] = useState("shop");
  const [, totalCartItems] = getTotalCartAmountAndQuantity();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setToken("");
  };
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="" />
        <p>Fashionova</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            {" "}
            Shop{" "}
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link style={{ textDecoration: "none" }} to="/mens">
            {" "}
            Men{" "}
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            {" "}
            Women{" "}
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            {" "}
            Kids{" "}
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {!isAuthenticated ? (
          <Link to="/login">
            <button>Login</button>
          </Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{totalCartItems}</div>
      </div>
    </div>
  );
}
