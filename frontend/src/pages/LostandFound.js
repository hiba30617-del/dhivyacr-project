// src/pages/LostAndFound.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./shared.css";

export default function LostAndFound() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", description: "", location: "" });
  const [newImage, setNewImage] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch all items
  const fetchItems = async () => {
    try {
      const res = await axios.get("https://campusbuzz-vpsf.onrender.com/api/lostfound");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleLogout = () => navigate("/welcome");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!newItem.title || !newItem.description || !newItem.location) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", newItem.title);
    formData.append("description", newItem.description);
    formData.append("location", newItem.location);
    if (newImage) formData.append("image", newImage);

    try {
      const res = await axios.post("https://campusbuzz-vpsf.onrender.com/api/lostfound", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Only add to state if backend successfully saved it
      setItems([res.data, ...items]);
      setNewItem({ title: "", description: "", location: "" });
      setNewImage(null);
      setSuccessMsg("Item added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item. Check backend console.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`https://campusbuzz-vpsf.onrender.com/api/lostfound/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="page-container">
      <div className="logout-container">
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h1 className="page-title">🔍 Lost & Found</h1>

      <Link to="/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>

      {/* Add Item Form */}
      <div className="feature-box form-box">
        <h2>Add New Item</h2>
        <form onSubmit={handleAdd} className="form-group">
          <input
            type="text"
            placeholder="Item Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newItem.location}
            onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
            required
          />
          <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
          <button type="submit" className="btn">
            Add Item
          </button>
        </form>
        {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}
      </div>

      {/* Display Items */}
      <div className="features-grid">
        {items.map((item) => (
          <div key={item._id} className="feature-box shadow-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>
              <strong>📍 Location:</strong> {item.location}
            </p>
            {item.image && (
              <img
                src={`https://campusbuzz-vpsf.onrender.com/uploads/${item.image}`}
                alt={item.title}
                style={{
                  maxWidth: "250px",
                  borderRadius: "8px",
                  marginTop: "10px",
                  border: "1px solid #ddd",
                }}
              />
            )}
            <div style={{ marginTop: "10px" }}>
              <button
                className="btn delete-btn"
                style={{ background: "#ff4d4d", color: "white" }}
                onClick={() => handleDelete(item._id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
