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
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '40px', height: '40px', margin: '0 auto', color: '#ff79c6'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h3>Privacy First</h3>
              <p>Your data is encrypted and never shared without your consent</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '40px', height: '40px', margin: '0 auto', color: '#ffb86c'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m-9-9h18M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                </svg>
              </div>
              <h3>Evidence-Based</h3>
              <p>All assessments are based on validated clinical tools</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '40px', height: '40px', margin: '0 auto', color: '#50fa7b'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.75-2.985m-.958-3.198a3.007 3.007 0 0 0-3.453-.268m.94 3.198A5.978 5.978 0 0 1 12 18.72a5.978 5.978 0 0 1-3.25-1.025m-.94-3.197A3.007 3.007 0 0 0 4.3 14.23m.94 3.197a5.97 5.97 0 0 0-.75-2.985m0 0a3 3 0 0 1-4.682-2.72A9.094 9.094 0 0 1 3.5 16.2c.226-.223.479-.413.75-.566M12 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.5 0a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM4.5 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
                </svg>
              </div>
              <h3>Accessible</h3>
              <p>Mental health support available 24/7, wherever you are</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '40px', height: '40px', margin: '0 auto', color: '#f1fa8c'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18v3m0 0h.01m-3.01 0h6m-3-15a9 9 0 0 1 9 9c0 2.378-1.54 4.397-3.69 5.093A3 3 0 0 0 12 18a3 3 0 0 0-2.32-3.907C7.54 13.397 6 11.378 6 9a9 9 0 0 1 9-9Z" />
                </svg>
              </div>
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
