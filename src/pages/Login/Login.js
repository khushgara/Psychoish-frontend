import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

function Login() {
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState({ email: false, password: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (message) { setMessage(""); setMessageType(""); }
  };

  const handleFocus = (field) => setFocused((f) => ({ ...f, [field]: true }));
  const handleBlur  = (field) => setFocused((f) => ({ ...f, [field]: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const result = await login(form.email.trim(), form.password.trim());
    if (result.success) {
      setMessage("Login successful! Redirecting…");
      setMessageType("success");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setMessage(result.message || "Login failed");
      setMessageType("error");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Animated background */}
      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* Centered card */}
      <div className="auth-card-wrap">
        <div className="auth-card">

          {/* Header */}
          <div className="auth-card-header">
            <div className="auth-card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <h2 className="auth-card-title">Welcome back</h2>
              <p className="auth-card-sub">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className={`field-group ${focused.email || form.email ? "field-active" : ""}`}>
              <label className="field-label">Email address</label>
              <div className="field-wrap">
                <div className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  required
                  disabled={loading}
                  className="field-input"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className={`field-group ${focused.password || form.password ? "field-active" : ""}`}>
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <div className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  required
                  disabled={loading}
                  className="field-input"
                  autoComplete="current-password"
                />
                <button type="button" className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)} tabIndex="-1"
                  aria-label="Toggle password visibility">
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="form-meta">
              <span />
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={!form.email || !form.password || loading}
              className={`auth-btn ${loading ? "btn-loading" : ""}`}
            >
              {loading ? (
                <span className="btn-spinner-wrap">
                  <span className="btn-spinner" />
                  Signing in…
                </span>
              ) : (
                <span className="btn-text-wrap">
                  Sign in
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              )}
            </button>

            {/* Message */}
            {message && (
              <div className={`form-message ${messageType}`}>
                {messageType === "success" ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                )}
                {message}
              </div>
            )}

            {/* Google Sign In */}
            <a href={`${API_BASE_URL}/api/auth/google`} className="google-auth-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: "10px" }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </a>

            {/* Divider + redirect */}
            <div className="auth-divider"><span>or</span></div>
            <p className="auth-redirect">
              New to Psychoish?{" "}
              <Link to="/signup" className="auth-redirect-link">Create a free account →</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
