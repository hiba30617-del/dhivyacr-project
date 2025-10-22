import React from "react";
import { useNavigate } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to <span>CampusBuzz</span></h1>
        <p className="welcome-description">
          Your all-in-one student community platform — stay connected with classmates, find roommates, 
          post events, and never miss a campus update!
        </p>

        <div className="welcome-buttons">
          <button className="btn-join" onClick={() => navigate("/register")}>
            🎓 Join Now
          </button>
          <p className="login-text">
            Already a member?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Log in
            </span>
          </p>
        </div>
      </div>

      {/* Floating circles for playful animation */}
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
    </div>
  );
}
