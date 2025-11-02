import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./auth.css";
// keep this if you want to switch easily to cloud URL later

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // OPTION 1: use axios directly for local
      const res = await axios.post("https://campusbuzz-vpsf.onrender.com/api/auth/login", {
        email,
        password,
      });

      // OR OPTION 2: use your API helper (uncomment when backend deployed)
      // const res = await API.post("/api/auth/login", { email, password });

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
