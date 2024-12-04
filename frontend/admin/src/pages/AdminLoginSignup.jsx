import React, { useState } from "react";
import BoxContainer from "../components/BoxContainer";

import "./css/admin-loginsignup.css";

const AdminLoginSignup = () => {
  const [isSignup, setIsSignup] = useState(true);
  return (
    <BoxContainer>
      <form className="loginsignup">
        <div className="loginsignup-container">
          <h1>{isSignup ? "Sign Up" : "Login"}</h1>
          <div className="loginsignup-fields">
            {isSignup && <input type="text" placeholder="Your name" />}
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
          </div>

          <div className="loginsignup-btn">
            <button>{isSignup ? "Signup" : "Login"}</button>
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
