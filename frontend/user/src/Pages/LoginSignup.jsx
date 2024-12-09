import React, { useState, useContext } from "react";
import "./CSS/LoginSignup.css";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";
import { ShopContext } from "../Context/Context";

export default function LoginSignup() {
  const { setToken, allProducts } = useContext(ShopContext);

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log("submitted data is ====>", data);
    if (isSignup) {
      try {
        const responseData = await axios.post(
          BASE_URL + "/auth/user/signup",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (responseData.status === 201) {
          setIsSignup(false);
          form.reset();
          return messageApi.open({
            type: "success",
            content: responseData.data.message,
          });
        } else {
          return messageApi.open({
            type: "error",
            content: responseData.data.message,
          });
        }
      } catch (err) {
        console.error("An error occurred while signing up", err);
      }
    } else {
      try {
        const responseData = await axios.post(
          BASE_URL + "/auth/user/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response from login is ====>", responseData);

        if (responseData.status === 200) {
          localStorage.setItem("userToken", responseData?.data?.token);
          localStorage.setItem("userId", responseData?.data?.adminId);
          setToken(localStorage.getItem("userToken"));
          navigate("/");
        }
      } catch (err) {
        console.error("An error occurred while logging up", err);
      }
    }
  };

  console.log("in,loginsighnup ===> ", BASE_URL + allProducts?.[0].image);
  return (
    <>
      {contextHolder}
      <form className="loginsignup" onSubmit={handleFormSubmit}>
        <div className="loginsignup-container">
          <h1>{isSignup ? "Sign Up" : "Login"}</h1>
          <div className="loginsignup-fields">
            {isSignup && (
              <input type="text" name="name" placeholder="Your name" />
            )}
            <input type="email" name="email" placeholder="Email Address" />
            <input type="password" name="password" placeholder="Password" />
          </div>

          <div className="loginsignup-btn">
            <button type="submit">{isSignup ? "Signup" : "Login"}</button>
            <button type="reset">Reset</button>
          </div>

          <p className="loginsignup-login">
            Already have an account?{" "}
            <button type="reset" onClick={() => setIsSignup((prev) => !prev)}>
              {isSignup ? "Login" : "Signup"} here
            </button>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>
              By continuing, i agree to the terms of use and privacy policy.
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
