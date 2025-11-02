// src/pages/Events.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./shared.css";

export default function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch existing events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://campusbuzz-vpsf.onrender.com/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const handleLogout = () => navigate("/login");

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.description || !newEvent.date) return;

    try {
      const res = await axios.post("https://campusbuzz-vpsf.onrender.com/api/events", newEvent);
      setEvents([res.data, ...events]); // add the new event to the list
      setNewEvent({ title: "", description: "", date: "" });
      setSuccessMsg("Event added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error adding event:", err);
      alert("Failed to add event.");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`https://campusbuzz-vpsf.onrender.com/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event.");
    }
  };
  return (
    <div className="page-container">
      {/* Logout button */}
      <div className="logout-container">
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1 className="page-title">🎉 Events</h1>

      {/* Back link */}
      <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>

      {/* Add new event form */}
      <div className="feature-box">
        <h2>Add New Event</h2>
        <form onSubmit={handleAdd} className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn">Add Event</button>
        </form>
        {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}
      </div>


      {/* Display events */}
      <div className="features-grid">
        {events.map((event) => (
          <div key={event._id} className="feature-box shadow-card">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><b>Date:</b> {event.date}</p>
            <button
  className="btn delete-btn"
  style={{ background: "pink", color: "white", marginTop: "10px" }}
  onClick={() => handleDelete(event._id)}
>
  ❌ Delete
</button>
          </div>
        ))}
      </div>
    </div>
  );
}
