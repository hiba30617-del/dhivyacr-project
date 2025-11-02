import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Announcements from "./pages/announcements";
import Events from "./pages/events";
import LostandFound from "./pages/LostandFound";
import Roommates from "./pages/roommates";
import Classmates from "./pages/classmates";

// Shared/global styles
import "./pages/shared.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Feature Routes */}
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/events" element={<Events />} />
        <Route path="/lostfound" element={<LostandFound />} />
        <Route path="/roommates" element={<Roommates />} />
        <Route path="/classmates" element={<Classmates />} />

        {/* Fallback for invalid routes */}
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontSize: "1.5rem",
                color: "#555",
              }}
            >
              404 – Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

