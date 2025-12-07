import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { theme, themeMode } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const result = await login(form.email, form.password);

    if (result.success) {
      setMessage("Login successful! Redirecting...");
      setMessageType("success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setMessage(result.message || "Login failed");
      setMessageType("error");
    }

    setLoading(false);
  };

  return (
    <div className={`login-container ${themeMode}`}>
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back 👋</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          disabled={loading}
          className="login-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={loading}
          className="login-input"
        />

        <button
          type="submit"
          disabled={!form.email || !form.password || loading}
          className={`login-button ${loading ? "loading" : ""}`}
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        {message && <p className={`login-message ${messageType}`}>{message}</p>}

        <p className="login-redirect">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

