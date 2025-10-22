import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./shared.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
  // Remove stored token and user info
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Redirect to login page
  navigate("/login");
};


  return (
   <div className="page-container">
      {/* Logout button at top right */}
      <div className="logout-container">
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
         <div className="dashboard-header">
        <h1>🎓 Student Community Dashboard</h1>
      </div>

      <div className="features-grid">
        <div className="feature-box">
          <h2>📢 Announcements</h2>
          <p>View or post important college announcements.</p>
          <Link to="/announcements" className="btn">Go</Link>
        </div>

        <div className="feature-box">
          <h2>🎉 Events</h2>
          <p>Stay updated on seminars, workshops, and cultural events.</p>
          <Link to="/events" className="btn">Go</Link>
        </div>

        <div className="feature-box">
          <h2>🔍 Lost & Found</h2>
          <p>Report or recover lost items on campus.</p>
          <Link to="/lostfound" className="btn">Go</Link>
        </div>

        <div className="feature-box">
          <h2>👩‍🎓 Classmates</h2>
          <p>Find and connect with your classmates.</p>
          <Link to="/classmates" className="btn">Go</Link>
        </div>

        <div className="feature-box">
          <h2>🏠 Roommates</h2>
          <p>Manage and find your hostel roommates.</p>
          <Link to="/roommates" className="btn">Go</Link>
        </div>
      </div>
    </div>
  );
}

