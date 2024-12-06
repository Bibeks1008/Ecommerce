import React, { useState } from "react";
import BoxContainer from "../components/BoxContainer";
import axios from "axios";

import "./css/admin-loginsignup.css";
import { BASE_URL } from "../../config";

const AdminLoginSignup = () => {
  const [isSignup, setIsSignup] = useState(true);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log("data in form is ====>", data);

    if (isSignup) {
      try {
        const responseData = await axios.post(
          BASE_URL + "/admin/auth/signup",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.error("An error occurred while signing up", err);
      }
    } else {
      try {
        const responseData = await axios.post(
          BASE_URL + "/admin/auth/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.error("An error occurred while logging up", err);
      }
    }
  };

  return (
    <BoxContainer>
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
            <span onClick={() => setIsSignup((prev) => !prev)}>
              {isSignup ? "Login" : "Signup"} here
            </span>
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
