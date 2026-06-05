import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

/* ── Password strength helper ──────────────────────────────────── */
function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8)              score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))   score++;
  const map = [
    { label: "Too short",  color: "#ef4444" },
    { label: "Weak",       color: "#ef4444" },
    { label: "Fair",       color: "#f59e0b" },
    { label: "Good",       color: "#3b82f6" },
    { label: "Strong",     color: "#10b981" },
  ];
  return { score, ...map[score] };
}

const Signup = () => {
  const { signup, isAuthenticated } = useContext(AuthContext);
  const navigate   = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    phone: "", dateOfBirth: "", gender: "",
  });
  const [message,     setMessage]     = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading,     setLoading]     = useState(false);
  const [showPassword,        setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focused, setFocused] = useState({
    name: false, email: false, password: false, confirmPassword: false,
    phone: false, dateOfBirth: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) { setMessage(""); setMessageType(""); }
  };

  const handleFocus = (f) => setFocused((p) => ({ ...p, [f]: true }));
  const handleBlur  = (f) => setFocused((p) => ({ ...p, [f]: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      setLoading(false);
      return;
    }

    const result = await signup(
      formData.name, formData.email,
      formData.password, formData.confirmPassword,
      { phone: formData.phone, dateOfBirth: formData.dateOfBirth, gender: formData.gender }
    );

    if (result.success) {
      setMessage("Account created! Redirecting…");
      setMessageType("success");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setMessage(result.message || "Signup failed");
      setMessageType("error");
    }
    setLoading(false);
  };

  const strength = getStrength(formData.password);

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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <div>
              <h2 className="auth-card-title">Create account</h2>
              <p className="auth-card-sub">Start your wellness journey today</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* ── Section 1: Account Info ── */}
            <div className="form-section-label">
              <span className="form-section-badge">1</span>
              Account Information
            </div>
            <div className="form-grid">

            {/* Full Name */}
            <div className={`field-group ${focused.name || formData.name ? "field-active" : ""}`}>
              <label className="field-label">Full name</label>
              <div className="field-wrap">
                <div className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <input
                  id="signup-name"
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                  required
                  disabled={loading}
                  className="field-input"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className={`field-group ${focused.email || formData.email ? "field-active" : ""}`}>
              <label className="field-label">Email address</label>
              <div className="field-wrap">
                <div className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <input
                  id="signup-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
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
            <div className={`field-group ${focused.password || formData.password ? "field-active" : ""}`}>
              <label className="field-label">Password</label>
              <div className="field-wrap">
                <div className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  required
                  disabled={loading}
                  className="field-input"
                  autoComplete="new-password"
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

              {/* Strength bar */}
              {formData.password && (
                <div className="strength-bar-wrap">
                  <div className="strength-track">
                    <div className="strength-fill"
                      style={{ width: `${(strength.score / 4) * 100}%`, background: strength.color }} />
                  </div>
                  <span className="strength-label" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className={`field-group ${focused.confirmPassword || formData.confirmPassword ? "field-active" : ""}`}>
              <label className="field-label">Confirm password</label>
              <div className="field-wrap">
                <div className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 12l2 2 4-4"/>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus("confirmPassword")}
                  onBlur={() => handleBlur("confirmPassword")}
                  required
                  disabled={loading}
                  className={`field-input ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? "field-input-error" : ""
                  }`}
                  autoComplete="new-password"
                />
                <button type="button" className="eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex="-1"
                  aria-label="Toggle confirm password visibility">
                  {showConfirmPassword ? (
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
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <span className="match-hint">Passwords don't match</span>
              )}
            </div>

            </div> {/* /form-grid */}

            {/* ── Section 2: Profile Info ── */}
            <div className="form-section-label">
              <span className="form-section-badge">2</span>
              Profile Details <span className="optional-tag">Optional</span>
            </div>
            <div className="form-grid">

            {/* Phone */}
            <div className={`field-group ${focused.phone || formData.phone ? "field-active" : ""}`}>
              <label className="field-label">Phone number</label>
              <div className="field-wrap">
                <div className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <input
                  id="signup-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus("phone")}
                  onBlur={() => handleBlur("phone")}
                  disabled={loading}
                  className="field-input"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className={`field-group ${focused.dateOfBirth || formData.dateOfBirth ? "field-active" : ""}`}>
              <label className="field-label">Date of birth</label>
              <div className="field-wrap">
                <div className="field-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <input
                  id="signup-dob"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onFocus={() => handleFocus("dateOfBirth")}
                  onBlur={() => handleBlur("dateOfBirth")}
                  disabled={loading}
                  className="field-input field-input-date"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="field-group field-group-full">
              <label className="field-label">Gender</label>
              <div className="gender-options">
                {[
                  { value: "male",              label: "Male" },
                  { value: "female",            label: "Female" },
                  { value: "other",             label: "Other" },
                  { value: "prefer_not_to_say", label: "Prefer not to say" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`gender-option ${formData.gender === opt.value ? "gender-option-active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={opt.value}
                      checked={formData.gender === opt.value}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            </div> {/* /form-grid profile */}

            {/* Submit */}
            <button
              id="signup-submit-btn"
              type="submit"
              disabled={
                !formData.name || !formData.email ||
                !formData.password || !formData.confirmPassword || loading
              }
              className={`auth-btn ${loading ? "btn-loading" : ""}`}
            >
              {loading ? (
                <span className="btn-spinner-wrap">
                  <span className="btn-spinner" />
                  Creating account…
                </span>
              ) : (
                <span className="btn-text-wrap">
                  Create account
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
              Already have an account?{" "}
              <Link to="/login" className="auth-redirect-link">Sign in →</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
