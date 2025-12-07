import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const assessments = [
    {
      type: "mood",
      icon: "😔",
      title: "Mood Assessment",
      description: "Evaluate your mood and identify depressive symptoms",
      color: "#8B5CF6",
    },
    {
      type: "anxiety",
      icon: "😰",
      title: "Anxiety Assessment",
      description: "Measure anxiety levels and symptoms",
      color: "#F59E0B",
    },
    {
      type: "sleepQuality",
      icon: "😴",
      title: "Sleep Quality Test",
      description: "Assess your sleep patterns and improve sleep hygiene",
      color: "#6366F1",
    },
    {
      type: "wellbeing",
      icon: "🌟",
      title: "Psychological Well-Being",
      description: "Evaluate overall psychological wellness",
      color: "#10B981",
    },
    {
      type: "ybocs",
      icon: "🔄",
      title: "OCD Symptoms (Y-BOCS)",
      description: "Assess obsessive-compulsive symptoms",
      color: "#3B82F6",
    },
    {
      type: "sbqr",
      icon: "🆘",
      title: "Suicide Risk Assessment",
      description: "Evaluate suicide risk and behaviors",
      color: "#DC2626",
    },
    {
      type: "dast10",
      icon: "🚭",
      title: "Drug Abuse Screening",
      description: "Assess substance use concerns",
      color: "#EF4444",
    },
    {
      type: "phq",
      icon: "😨",
      title: "Phobia Questionnaire",
      description: "Evaluate phobic avoidance behaviors",
      color: "#EC4899",
    },
    {
      type: "ryffFull",
      icon: "💫",
      title: "Well-Being (Full)",
      description: "Comprehensive well-being assessment",
      color: "#14B8A6",
    },
  ];

  return (
    <div className="home-container">
      {/* 🟣 HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Psychoish – Your Mind, Your Space 🧠</h1>
            <p>
              Track emotions, reflect on thoughts, and improve your mental
              health — one day at a time.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">9</span>
                <span className="stat-label">Assessments</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Available</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Confidential</span>
              </div>
            </div>
            <Link to="/signup" className="hero-button">
              Get Started Free
            </Link>
          </div>
          <div className="hero-visual">
            <div className="rotating-brain">
              <div className="brain-emoji">🧠</div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 ASSESSMENT CATEGORIES */}
      <section className="assessment-section">
        <h2>Explore Our Assessments</h2>
        <p>Discover personalized mental health assessments tailored for you</p>
        <div className="assessment-grid">
          {assessments.map((assessment) => (
            <div
              key={assessment.type}
              className="assessment-card"
              style={{ borderColor: assessment.color }}
            >
              <div
                className="assessment-icon"
                style={{ background: `${assessment.color}20` }}
              >
                <span style={{ fontSize: "2.5rem" }}>{assessment.icon}</span>
              </div>
              <h3>{assessment.title}</h3>
              <p>{assessment.description}</p>
              <Link
                to={`/assessment/${assessment.type}`}
                className="assessment-btn"
                style={{ background: assessment.color }}
              >
                Take Assessment →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 🧘 WELLNESS SECTION */}
      <section className="wellness-section">
        <h2>Your Mental Wellness Journey</h2>
        <div className="wellness-grid">
          <div className="wellness-card">
            <div className="wellness-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your mental health journey with detailed analytics</p>
          </div>
          <div className="wellness-card">
            <div className="wellness-icon">💡</div>
            <h3>Get Insights</h3>
            <p>Receive personalized recommendations based on your results</p>
          </div>
          <div className="wellness-card">
            <div className="wellness-icon">🤝</div>
            <h3>Professional Support</h3>
            <p>Book consultations with licensed mental health professionals</p>
          </div>
        </div>
      </section>

      {/* 📚 RESOURCES SECTION */}
      <section className="resources-section">
        <h2>Mental Health Resources</h2>
        <div className="resources-grid">
          <Link to="/therapies" className="resource-card">
            <div className="resource-icon">🧘‍♀️</div>
            <h3>Therapy Types</h3>
            <p>Learn about different therapeutic approaches</p>
          </Link>
          <Link to="/blog" className="resource-card">
            <div className="resource-icon">📖</div>
            <h3>Blog & Articles</h3>
            <p>Read expert insights on mental wellness</p>
          </Link>
          <Link to="/faq" className="resource-card">
            <div className="resource-icon">❓</div>
            <h3>FAQ</h3>
            <p>Find answers to common questions</p>
          </Link>
        </div>
      </section>

      {/* 📞 CTA SECTION */}
      <section className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands taking control of their mental health</p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-primary">
            Sign Up Now
          </Link>
          <Link to="/contact" className="cta-secondary">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
