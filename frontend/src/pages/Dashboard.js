import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./shared.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ Redirect unauthenticated users to login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    // Remove token from storage
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to CampusBuzz 🎓</h1>
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
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

