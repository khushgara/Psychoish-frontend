import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [themeName, setThemeName] = useState("light");
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setThemeName(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeName === "light" ? "dark" : "light";
    setThemeName(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-main">
          <Link to="/" className="navbar-logo">
            Psychoish
          </Link>

          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
            )}
            <Link to="/about" className="navbar-link">
              About
            </Link>
            <Link to="/therapies" className="navbar-link">
              Therapies
            </Link>
            <Link to="/blog" className="navbar-link">
              Blog
            </Link>
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
          </div>

          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {themeName === "light" ? "🌙" : "☀️"}
          </button>

          <div className="navbar-login">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">Hi, {user?.name}</span>
                <button onClick={handleLogout} className="navbar-logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="navbar-login-btn">
                Login
              </Link>
            )}
          </div>

          <button
            className={`navbar-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="toggle-icon"></span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <Link
            to="/"
            className="mobile-navbar-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="mobile-navbar-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/about"
            className="mobile-navbar-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/therapies"
            className="mobile-navbar-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Therapies
          </Link>
          <Link
            to="/blog"
            className="mobile-navbar-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="mobile-navbar-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="mobile-navbar-link mobile-logout-btn"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="mobile-navbar-link mobile-login-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

