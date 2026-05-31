import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

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

          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {themeMode === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '20px', height: '20px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '20px', height: '20px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.58 1.58m12.42 12.42l1.58 1.58M3 12h2.25m13.5 0H21M6.78 17.22l-1.58 1.58m12.42-12.42l-1.58 1.58M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
              </svg>
            )}
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

