// src/pages/Announcements.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./shared.css";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  // Fetch announcements from backend
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("https://campusbuzz-vpsf.onrender.com/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    try {
      await axios.post("https://campusbuzz-vpsf.onrender.com/api/announcements", form);
      setForm({ title: "", description: "" });
      fetchAnnouncements(); // Refresh list
    } catch (err) {
      console.error("Error posting announcement:", err);
    }
  };

  // Optional: handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://campusbuzz-vpsf.onrender.com//api/announcements/${id}`);
      fetchAnnouncements();
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>📢 Announcements</h1>
      </div>

      <Link to="/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>

      {/* Form box */}
      <div className="feature-box">
        <h2>Add New Announcement</h2>
        <form onSubmit={handleSubmit} className="form-box">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Write your announcement..."
            value={form.description}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">
            Post Announcement
          </button>
        </form>
      </div>

      {/* Announcements list */}
      <div className="features-grid">
        {announcements.map((a) => (
          <div key={a._id} className="feature-box">
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <span className="date">{new Date(a.date).toLocaleString()}</span>
            <button
              className="btn delete-btn"
              style={{ background: "pink", color: "white", marginTop: "10px" }}
              onClick={() => handleDelete(a._id)}
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
