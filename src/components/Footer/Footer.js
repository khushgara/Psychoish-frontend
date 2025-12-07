import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer footer-enhanced">
      {/* Back to Top Button */}
      <a
        href="#top"
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </a>

      <div className="footer-container footer-grid-1">
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
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook">
              <span>fb</span>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <span>tw</span>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <span>ig</span>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <span>in</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links space-y-2">
            <li>
              <a href="#" className="footer-link">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                About
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Therapies
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Success Stories
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul className="footer-links space-y-2">
            <li>
              <a href="#" className="footer-link">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Crisis Resources
              </a>
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
