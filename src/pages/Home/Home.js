import React from "react";
import { Link } from "react-router-dom";
import PixelTransition from "../../components/PixelTransition/PixelTransition";
import brainHero from "../../assets/images/brain_hero.png";
import "./Home.css";

function Home() {
  const assessments = [
    {
      type: "mood",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      title: "Mood Assessment",
      description: "Evaluate your mood and identify depressive symptoms.",
      color: "#3B82F6",
    },
    {
      type: "anxiety",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      ),
      title: "Anxiety Assessment",
      description: "Measure anxiety levels and common triggers.",
      color: "#F97316",
    },
    {
      type: "sleepQuality",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      ),
      title: "Sleep Quality Test",
      description: "Assess your sleep patterns and improve sleep hygiene.",
      color: "#6366F1",
    },
    {
      type: "wellbeing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499c.172-.375.694-.375.866 0l2.054 4.148 4.561.663c.414.06.58.567.28.857l-3.3 3.217.779 4.542c.07.41-.36.72-.73.528l-4.08-2.147-4.08 2.147c-.37.192-.8-.119-.73-.528l.78-4.542-3.3-3.217c-.29-.29-.124-.8.28-.857l4.56-.663 2.054-4.148Z" />
        </svg>
      ),
      title: "Psychological Well-Being",
      description: "Evaluate overall psychological health and happiness.",
      color: "#14B8A6",
    },
  ];

  return (
    <div className="home-container">
      {/* 🟣 HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-pill">Personalized Mental Wellness</div>
            <h1>
              Your Mind.<br />
              <span className="gradient-text">Your Space.</span>
            </h1>
            <p>
              Track emotions, reflect on thoughts, and improve your mental
              health — one day at a time with professional tools.
            </p>
            
            <div className="hero-buttons">
              <Link to="/signup" className="btn-primary">
                Start Free Assessment
              </Link>
              <Link to="/therapies" className="btn-secondary">
                Explore Tests
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat-pill">
                <span className="stat-number">9+</span>
                <span className="stat-label">ASSESSMENTS</span>
              </div>
              <div className="stat-pill">
                <span className="stat-number">24/7</span>
                <span className="stat-label">AVAILABLE</span>
              </div>
              <div className="stat-pill">
                <span className="stat-number">100%</span>
                <span className="stat-label">CONFIDENTIAL</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-brain-img-wrap">
              <img
                src={brainHero}
                alt="Neural network brain illustration"
                className="hero-brain-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 ASSESSMENT CATEGORIES */}
      <section className="assessment-section">
        <h2>Explore Our Assessments</h2>
        <p>Discover personalized mental health assessments tailored for you. Scientifically backed and easy to complete.</p>
        
        <div className="assessment-grid">
          {assessments.map((assessment) => (
            <PixelTransition
              key={assessment.type}
              gridSize={8}
              pixelColor={assessment.color}
              once={false}
              animationStepDuration={0.4}
              aspectRatio="100%"
              className="assessment-transition-card"
              firstContent={
                <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'var(--card-bg)', textAlign: 'center' }}>
                  <div className="assessment-icon" style={{ background: assessment.color, width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: '#ffffff', boxShadow: `0 4px 12px ${assessment.color}40` }}>
                    <span style={{ fontSize: "1.6rem", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{assessment.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text)', margin: '0 0 0.5rem 0' }}>{assessment.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem' }}>Hover to Start &rarr;</span>
                </div>
              }
              secondContent={
                <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'var(--card-bg)', textAlign: 'center', border: `2px solid ${assessment.color}`, borderRadius: '24px' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.25rem', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{assessment.description}</p>
                  <Link
                    to={`/assessment/${assessment.type}`}
                    className="assessment-btn"
                    style={{ background: assessment.color, width: '100%', display: 'block', textAlign: 'center', padding: '0.75rem', color: '#ffffff', borderRadius: '12px', fontWeight: '600', textDecoration: 'none', boxShadow: `0 4px 10px ${assessment.color}30` }}
                  >
                    Take Assessment
                  </Link>
                </div>
              }
            />
          ))}
        </div>
        
        <div className="view-all-container">
          <Link to="/therapies" className="view-all-link">
            View All Assessments &rarr;
          </Link>
        </div>
      </section>

      {/* WELLNESS SECTION */}
      <section className="wellness-section">
        <h2>Your Mental Wellness Journey</h2>
        <p className="section-subtitle">A simple three-step approach to better mental health.</p>
        
        <div className="wellness-grid">
          <div className="wellness-card">
            <div className="wellness-icon-container">
              <span className="wellness-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </span>
            </div>
            <h3>Take Assessment</h3>
            <p>Quick, private assessments to understand your current state.</p>
          </div>
          <div className="wellness-card">
            <div className="wellness-icon-container">
              <span className="wellness-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>
              </span>
            </div>
            <h3>Get Insights</h3>
            <p>Personalized data and analytics to help you see patterns.</p>
          </div>
          <div className="wellness-card">
            <div className="wellness-icon-container">
              <span className="wellness-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.75-2.985m-.958-3.198a3.007 3.007 0 0 0-3.453-.268m.94 3.198A5.978 5.978 0 0 1 12 18.72a5.978 5.978 0 0 1-3.25-1.025m-.94-3.197A3.007 3.007 0 0 0 4.3 14.23m.94 3.197a5.97 5.97 0 0 0-.75-2.985m0 0a3 3 0 0 1-4.682-2.72A9.094 9.094 0 0 1 3.5 16.2c.226-.223.479-.413.75-.566M12 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.5 0a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM4.5 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
                </svg>
              </span>
            </div>
            <h3>Connect & Grow</h3>
            <p>Talk to experts or join therapy groups for lasting change.</p>
          </div>
        </div>
      </section>

      {/* RESOURCES SECTION */}
      <section className="resources-section">
        <h2>Mental Health Resources</h2>
        <div className="resources-grid">
          <PixelTransition
            gridSize={8}
            pixelColor="var(--primary)"
            once={false}
            animationStepDuration={0.4}
            aspectRatio="100%"
            className="resource-transition-card"
            firstContent={
              <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'var(--card-bg)', textAlign: 'center' }}>
                <div className="resource-icon-container" style={{ width: '60px', height: '60px', background: 'var(--hover-bg)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--primary)' }}>
                  <span className="resource-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text)', margin: '0 0 0.5rem 0' }}>Therapy Types</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem' }}>Hover to Explore &rarr;</span>
              </div>
            }
            secondContent={
              <Link to="/therapies" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'var(--card-bg)', textAlign: 'center', textDecoration: 'none', border: '2px solid var(--primary)', borderRadius: '24px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Learn about different evidence-based therapeutic approaches used today.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                  <span>View Details</span>
                  <div className="card-arrow" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>&rarr;</div>
                </div>
              </Link>
            }
          />

          <PixelTransition
            gridSize={8}
            pixelColor="var(--primary)"
            once={false}
            animationStepDuration={0.4}
            aspectRatio="100%"
            className="resource-transition-card"
            firstContent={
              <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'var(--card-bg)', textAlign: 'center' }}>
                <div className="resource-icon-container" style={{ width: '60px', height: '60px', background: 'var(--hover-bg)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--primary)' }}>
                  <span className="resource-icon" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text)', margin: '0 0 0.5rem 0' }}>Support FAQ</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem' }}>Hover to View &rarr;</span>
              </div>
            }
            secondContent={
              <Link to="/faq" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: 'var(--card-bg)', textAlign: 'center', textDecoration: 'none', border: '2px solid var(--primary)', borderRadius: '24px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Commonly asked questions about our process and mental health tools.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600' }}>
                  <span>View FAQs</span>
                  <div className="card-arrow" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>&rarr;</div>
                </div>
              </Link>
            }
          />

        </div>
      </section>

      {/* 📞 CTA SECTION */}
      <section className="home-cta-section">
        <div className="home-cta-container">
          <h2>Ready to Prioritize Your Mental Health?</h2>
          <p>Join thousands taking control of their mental wellness today. It starts with one small step.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn-primary-white">
              Sign Up Free
            </Link>
            <Link to="/contact" className="btn-outline-white">
              Talk to a Therapist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
