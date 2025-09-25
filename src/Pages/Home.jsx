import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="logo-animation-wrapper">
        <img src={logo} alt="Logo" className="logo-animation" />
      </div>

      <div className="home-content">
        <div className="logo-top-wrapper">
          <img src={logo} alt="Logo" className="logo-top" />
        </div>
        <h1 className="home-title">Welcome to Manodarpan Doctor Portal</h1>
        <div className="home-buttons">
          <button onClick={() => navigate("/login")} className="home-btn login-btn">
            Doctor Login
          </button>
          <button onClick={() => navigate("/register")} className="home-btn register-btn">
            Doctor Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
