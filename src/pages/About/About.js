import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Psychoish</h1>
        <p>Empowering mental wellness through accessible, evidence-based assessments</p>
      </div>

      <div className="about-container">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At Psychoish, we believe that mental health care should be accessible to everyone.
            Our platform provides scientifically-validated assessments that help individuals
            understand their mental health and take proactive steps toward wellness.
          </p>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Take an Assessment</h3>
              <p>Choose from 9 clinically-validated mental health assessments</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Get Your Results</h3>
              <p>Receive instant, personalized feedback and recommendations</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Take Action</h3>
              <p>Book consultations with licensed professionals or explore resources</p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Privacy First</h3>
              <p>Your data is encrypted and never shared without your consent</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Evidence-Based</h3>
              <p>All assessments are based on validated clinical tools</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Accessible</h3>
              <p>Mental health support available 24/7, wherever you are</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Empowering</h3>
              <p>Tools and insights to take control of your mental wellness</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Assessments Completed</p>
            </div>
            <div className="stat-item">
              <h3>5,000+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h3>9</h3>
              <p>Clinical Assessments</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Available Support</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands taking control of their mental health</p>
          <Link to="/signup" className="cta-button">
            Get Started Free
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
