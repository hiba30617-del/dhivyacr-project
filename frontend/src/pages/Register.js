import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./auth.css";

export default function Register() {
  const navigate = useNavigate();

  // ✅ Define all state variables
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    year: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Update input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!/^\d{10}$/.test(formData.phone)) {
      return setError("Phone number must be exactly 10 digits");
    }
    if (!/^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/.test(formData.email)) {
      return setError("Email must be in the format name@vitstudent.ac.in");
    }

    try {
      const res = await axios.post(
        "https://campusbuzz-vpsf.onrender.com/api/auth/register", // Change to your deployed backend URL when hosting
        formData
      );

      if (res.data.message === "User registered successfully") {
        setSuccess("🎉 Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department (e.g., CSE)"
            value={formData.department}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="year"
            placeholder="Year (e.g., 1st)"
            value={formData.year}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">Register</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
