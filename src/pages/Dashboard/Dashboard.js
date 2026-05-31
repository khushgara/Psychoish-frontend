import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user, axiosInstance } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/api/results/dashboard");
        if (response.data.success) {
          setSummary(response.data.summary);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosInstance]);

  const assessmentTypes = [
    {
      type: "mood",
      name: "Mood Assessment",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      description: "Evaluate your mood and identify depressive symptoms",
      color: "#8B5CF6",
    },
    {
      type: "dast10",
      name: "Drug Abuse Screening",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      description: "Assess substance use concerns",
      color: "#EF4444",
    },
    {
      type: "anxiety",
      name: "Anxiety Assessment",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      ),
      description: "Measure anxiety levels and symptoms",
      color: "#F59E0B",
    },
    {
      type: "wellbeing",
      name: "Psychological Well-Being",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499c.172-.375.694-.375.866 0l2.054 4.148 4.561.663c.414.06.58.567.28.857l-3.3 3.217.779 4.542c.07.41-.36.72-.73.528l-4.08-2.147-4.08 2.147c-.37.192-.8-.119-.73-.528l.78-4.542-3.3-3.217c-.29-.29-.124-.8.28-.857l4.56-.663 2.054-4.148Z" />
        </svg>
      ),
      description: "Evaluate overall psychological wellness",
      color: "#10B981",
    },
    {
      type: "ybocs",
      name: "OCD Symptoms (Y-BOCS)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      description: "Assess obsessive-compulsive symptoms",
      color: "#3B82F6",
    },
    {
      type: "sbqr",
      name: "Suicide Risk Assessment",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
        </svg>
      ),
      description: "Evaluate suicide risk and behaviors",
      color: "#DC2626",
    },
    {
      type: "sleepQuality",
      name: "Sleep Quality Scale",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      ),
      description: "Assess sleep quality and problems",
      color: "#6366F1",
    },
    {
      type: "phq",
      name: "Phobia Questionnaire",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      ),
      description: "Evaluate phobic avoidance behaviors",
      color: "#EC4899",
    },
    {
      type: "ryffFull",
      name: "Well-Being (Full)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.813 15.904 9 21l-.813-5.096L3.096 15.09 8.192 14.28 9 9.187l.813 5.093 5.096.813-5.096.811ZM19.5 6.077l-1.62.272-.27 1.62-.272-1.62L15.72 6.08l1.62-.27.27-1.62.272 1.62 1.62.27ZM14.25 21.077l-1.08.18-.18 1.08-.182-1.08-1.08-.18 1.08-.18.18-1.08.182 1.08 1.08.18Z" />
        </svg>
      ),
      description: "Comprehensive well-being assessment",
      color: "#14B8A6",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || "User"}!</h1>
        <p>Track your mental wellness journey</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{summary?.totalAssessments || 0}</h3>
            <p>Total Assessments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{Object.keys(summary?.assessmentsByType || {}).length}</h3>
            <p>Types Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '28px', height: '28px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          <div className="stat-content">
            <h3>{summary?.recentAssessments?.length || 0}</h3>
            <p>Recent Tests</p>
          </div>
        </div>
      </div>

      {/* Recent Assessments */}
      {summary?.recentAssessments && summary.recentAssessments.length > 0 && (
        <div className="recent-section">
          <div className="section-header-flex">
            <h2>Recent Assessments</h2>
            <Link to="/results/history" className="see-all-link">
              See All →
            </Link>
          </div>
          <div className="recent-list">
            {summary.recentAssessments.slice(0, 3).map((assessment) => (
              <div key={assessment.id} className="recent-item">
                <div className="recent-info">
                  <h4>{assessment.type.toUpperCase()}</h4>
                  <p>{assessment.interpretation}</p>
                  <span className="recent-date">
                    {new Date(assessment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="recent-score">
                  Score: {assessment.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assessment Cards */}
      <div className="assessments-section">
        <h2>Available Assessments</h2>
        <div className="assessment-grid">
          {assessmentTypes.map((assessment) => {
            const completed = summary?.assessmentsByType?.[assessment.type];
            return (
              <div
                key={assessment.type}
                className="assessment-card"
                style={{ borderColor: assessment.color }}
              >
                <div className="assessment-icon" style={{ backgroundColor: assessment.color }}>
                  {assessment.icon}
                </div>
                <h3>{assessment.name}</h3>
                <p>{assessment.description}</p>
                {completed && (
                  <div className="completed-badge">
                    ✓ Completed {completed.count} time{completed.count > 1 ? "s" : ""}
                  </div>
                )}
                <Link
                  to={`/assessment/${assessment.type}`}
                  className="take-assessment-btn"
                  style={{ backgroundColor: assessment.color }}
                >
                  {completed ? "Retake Assessment" : "Take Assessment"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/profile" className="action-btn" style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '18px', height: '18px'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          View Profile
        </Link>
        <Link to="/results" className="action-btn" style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '18px', height: '18px'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>
          View All Results
        </Link>
        <Link to="/consultation" className="action-btn" style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{width: '18px', height: '18px'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.194-4.176-7-7l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          Book Consultation
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
