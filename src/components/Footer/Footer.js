import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      {/* Back to Top Button */}
      <button
        type="button"
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>

      <div className="footer-content">
        {/* Logo & Description */}
        <div className="footer-section">
          <div className="footer-brand">
            <h2>Psychoish</h2>
            <p>
              A mental wellness platform built to help you heal, grow, and find
              balance through personalized therapies and expert guidance.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="social-links">
            <button className="social-icon" aria-label="Facebook">
              <span>f</span>
            </button>
            <button className="social-icon" aria-label="Twitter">
              <span>𝕏</span>
            </button>
            <button className="social-icon" aria-label="Instagram">
              <span>📸</span>
            </button>
            <button className="social-icon" aria-label="LinkedIn">
              <span>in</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links space-y-2">
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/therapies" className="footer-link">
                Therapies
              </Link>
            </li>
            <li>
              <Link to="/blog" className="footer-link">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/stories" className="footer-link">
                Success Stories
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul className="footer-links space-y-2">
            <li>
              <Link to="/faq" className="footer-link">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="footer-link">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/crisis" className="footer-link">
                Crisis Resources
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Contact */}
        <div className="footer-section">
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe for wellness tips and therapy updates.</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="footer-contact">
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <span>support@psychoish.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>1-800-HELP-NOW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {currentYear} Psychoish. All rights reserved. | Made with ❤️ for
        mental wellness
      </div>
    </footer>
  );
};

export default Footer;
