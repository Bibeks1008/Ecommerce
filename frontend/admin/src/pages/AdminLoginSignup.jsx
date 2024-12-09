import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoxContainer from "../components/BoxContainer";
import axios from "axios";
import { message } from "antd";

import "./css/admin-loginsignup.css";
import { BASE_URL } from "../../config";
import { adminContext } from "../Context/Context";

const AdminLoginSignup = () => {
  const { setToken } = useContext(adminContext);

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log("data in form is ====>", data);

    if (isSignup) {
      try {
        const responseData = await axios.post(
          BASE_URL + "/auth/admin/signup",
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
          BASE_URL + "/auth/admin/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response from login is ====>", responseData);

        if (responseData.status === 200) {
          localStorage.setItem("token", responseData?.data?.token);
          localStorage.setItem("adminId", responseData?.data?.adminId);
          setToken(localStorage.getItem("token"));
          navigate("/add-product");
        }
      } catch (err) {
        console.error("An error occurred while logging up", err);
      }
    }
  };

  return (
    <BoxContainer>
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
    </BoxContainer>
  );
};

export default AdminLoginSignup;
