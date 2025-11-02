// src/pages/Roommates.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./shared.css";

export default function Roommates() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    block: "",
    roomNo: "",
    bedCount: "",
    name: "",
    gender: "",
  });
  const [filter, setFilter] = useState({ block: "", roomNo: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [filteredRoommates, setFilteredRoommates] = useState([]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle filter input change
  const handleFilterChange = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });

  // Add roommate to MongoDB
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.block || !form.roomNo || !form.bedCount || !form.name || !form.gender) return;

    try {
      await axios.post("https://campusbuzz-vpsf.onrender.com/api/roommates", form);
      setForm({ block: "", roomNo: "", bedCount: "", name: "", gender: "" });
      setSuccessMsg("✅ Roommate added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error adding roommate:", err);
      alert("Failed to add roommate");
    }
  };

  // Get roommates by block + roomNo
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    if (!filter.block || !filter.roomNo) return;

    try {
      const res = await axios.get(`https://campusbuzz-vpsf.onrender.com/api/roommates?block=${filter.block}&roomNo=${filter.roomNo}`);
      setFilteredRoommates(res.data);
    } catch (err) {
      console.error("Error fetching roommates:", err);
      alert("Failed to fetch roommates");
    }
  };

  return (
    <div className="page-container">
      {/* Logout */}
      <div className="logout-container">
        <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <h1 className="page-title">🏠 Roommates</h1>

      {/* Back to Dashboard */}
      <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>

      {/* Add Roommate Form */}
      <div className="feature-box form-box">
        <h2>Add New Roommate</h2>
        <form onSubmit={handleAdd} className="form-group">
          <input type="text" name="block" placeholder="Block" value={form.block} onChange={handleChange} required />
          <input type="text" name="roomNo" placeholder="Room Number" value={form.roomNo} onChange={handleChange} required />
          <input type="number" name="bedCount" placeholder="Bed Count" value={form.bedCount} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" className="btn">Add Roommate</button>
        </form>
        {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}
      </div>

      {/* Filter Form */}
      <div className="feature-box form-box">
        <h2>Find Roommates in Same Room</h2>
        <form onSubmit={handleFilterSubmit} className="form-group">
          <input type="text" name="block" placeholder="Block" value={filter.block} onChange={handleFilterChange} required />
          <input type="text" name="roomNo" placeholder="Room Number" value={filter.roomNo} onChange={handleFilterChange} required />
          <button type="submit" className="btn">Search</button>
        </form>
      </div>

      {/* Display Filtered Roommates */}
      <div className="features-grid">
        {filteredRoommates.map((r) => (
          <div key={r._id} className="feature-box shadow-card">
            <h3>{r.name}</h3>
            <p>Block: {r.block}</p>
            <p>Room: {r.roomNo} | Beds: {r.bedCount}</p>
            <p>Gender: {r.gender}</p>
          </div>
        ))}
        {filteredRoommates.length === 0 && <p style={{ marginTop: "10px" }}>No roommates found for this room.</p>}
      </div>
    </div>
  );
}

