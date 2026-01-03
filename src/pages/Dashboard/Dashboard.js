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
        const response = await axiosInstance.get("/results/dashboard");
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
      icon: "😔",
      description: "Evaluate your mood and identify depressive symptoms",
      color: "#8B5CF6",
    },
    {
      type: "dast10",
      name: "Drug Abuse Screening",
      icon: "🚭",
      description: "Assess substance use concerns",
      color: "#EF4444",
    },
    {
      type: "anxiety",
      name: "Anxiety Assessment",
      icon: "😰",
      description: "Measure anxiety levels and symptoms",
      color: "#F59E0B",
    },
    {
      type: "wellbeing",
      name: "Psychological Well-Being",
      icon: "🌟",
      description: "Evaluate overall psychological wellness",
      color: "#10B981",
    },
    {
      type: "ybocs",
      name: "OCD Symptoms (Y-BOCS)",
      icon: "🔄",
      description: "Assess obsessive-compulsive symptoms",
      color: "#3B82F6",
    },
    {
      type: "sbqr",
      name: "Suicide Risk Assessment",
      icon: "🆘",
      description: "Evaluate suicide risk and behaviors",
      color: "#DC2626",
    },
    {
      type: "sleepQuality",
      name: "Sleep Quality Scale",
      icon: "😴",
      description: "Assess sleep quality and problems",
      color: "#6366F1",
    },
    {
      type: "phq",
      name: "Phobia Questionnaire",
      icon: "😨",
      description: "Evaluate phobic avoidance behaviors",
      color: "#EC4899",
    },
    {
      type: "ryffFull",
      name: "Well-Being (Full)",
      icon: "💫",
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
        <h1>Welcome back, {user?.name || "User"}! 👋</h1>
        <p>Track your mental wellness journey</p>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{summary?.totalAssessments || 0}</h3>
            <p>Total Assessments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{Object.keys(summary?.assessmentsByType || {}).length}</h3>
            <p>Types Completed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
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
        <Link to="/profile" className="action-btn">
          👤 View Profile
        </Link>
        <Link to="/results" className="action-btn">
          📈 View All Results
        </Link>
        <Link to="/consultations/book" className="action-btn">
          📞 Book Consultation
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
