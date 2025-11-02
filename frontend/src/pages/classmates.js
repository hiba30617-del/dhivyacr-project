import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./shared.css";

export default function Classmates() {
  const navigate = useNavigate();

  // Form for adding a new classmate
  const [newMate, setNewMate] = useState({
    name: "",
    registerNumber: "",
    department: "",
    classroomNumber: "",
  });

  // Success message
  const [successMsg, setSuccessMsg] = useState("");

  // Form for searching classmates
  const [search, setSearch] = useState({ department: "", classroomNumber: "" });
  const [matchingClassmates, setMatchingClassmates] = useState([]);

  // Add classmate
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://campusbuzz-vpsf.onrender.com/api/classmates", newMate);
      setNewMate({ name: "", registerNumber: "", department: "", classroomNumber: "" });
      setSuccessMsg("Classmate added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000); // hide message after 3 seconds
    } catch (err) {
      console.error("Error adding classmate:", err);
      alert("Failed to add classmate.");
    }
  };

  // Search classmates by department & classroom
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.department || !search.classroomNumber) return;

    try {
      const res = await axios.get("https://campusbuzz-vpsf.onrender.com/api/classmates/filter", {
        params: {
          department: search.department,
          classroomNumber: search.classroomNumber,
        },
      });
      setMatchingClassmates(res.data);
    } catch (err) {
      console.error("Error fetching classmates:", err);
    }
  };

  return (
    <div className="page-container">
      <div className="logout-container">
        <button className="btn logout-btn" onClick={() => navigate("/login")}>
          Logout
        </button>
      </div>

      <h1 className="page-title">👩‍🎓 Classmates Dashboard</h1>
        {/* Back to Dashboard Link */}
      <Link to="/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>
      {/* Add Classmate Form */}
      <div className="feature-box">
        <h2>Add Classmate</h2>
        <form onSubmit={handleAdd} className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={newMate.name}
            onChange={(e) => setNewMate({ ...newMate, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Register Number"
            value={newMate.registerNumber}
            onChange={(e) => setNewMate({ ...newMate, registerNumber: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={newMate.department}
            onChange={(e) => setNewMate({ ...newMate, department: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Classroom Number"
            value={newMate.classroomNumber}
            onChange={(e) => setNewMate({ ...newMate, classroomNumber: e.target.value })}
            required
          />
          <button type="submit" className="btn">Add</button>
        </form>
        {successMsg && <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>}
      </div>

      {/* Search Classmates Form */}
      <div className="feature-box">
        <h2>Find Classmates in Same Classroom</h2>
        <form onSubmit={handleSearch} className="form-group">
          <input
            type="text"
            placeholder="Department"
            value={search.department}
            onChange={(e) => setSearch({ ...search, department: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Classroom Number"
            value={search.classroomNumber}
            onChange={(e) => setSearch({ ...search, classroomNumber: e.target.value })}
            required
          />
          <button type="submit" className="btn">Search</button>
        </form>
      </div>

   {/* Filtered Results */}
      {matchingClassmates.length > 0 && (
        <div className="features-grid">
          
          {matchingClassmates.map((mate) => (
            <div key={mate._id} className="feature-box shadow-card">
              <h4>{mate.name}</h4>
              <p><strong>Reg No:</strong> {mate.registerNumber}</p>
              <p><strong>Dept:</strong> {mate.department}</p>
              <p><strong>Classroom:</strong> {mate.classroomNumber}</p>
            </div>
          ))}
        </div>
      )}

      {matchingClassmates.length === 0 && (
        <p style={{ marginTop: "10px" }}>No matching classmates found.</p>
      )}
    </div>
  );
}


      

