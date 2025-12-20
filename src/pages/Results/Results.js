import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Results.css";

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axiosInstance, isAuthenticated } = useContext(AuthContext);
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    fetchResult();
  }, [id]);

  const fetchResult = async () => {
    try {
      const response = await axiosInstance.get(`/results/${id}`);
      setResult(response.data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching result:", error);
      alert("Failed to load results. Please try again.");
      navigate("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="results-loading">
        <div className="loader"></div>
        <p>Loading your results...</p>
      </div>
    );
  }

  if (!result) {
    return <div className="results-error">Results not found</div>;
  }

  const getSeverityColor = (severity) => {
    const colors = {
      low: "#10b981",
      mild: "#3b82f6",
      moderate: "#f59e0b",
      high: "#ef4444",
      critical: "#dc2626",
    };
    return colors[severity] || "#6b7280";
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      low: "✅",
      mild: "ℹ️",
      moderate: "⚠️",
      high: "🚨",
      critical: "🆘",
    };
    return icons[severity] || "📊";
  };

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-header">
          <h1>Assessment Results</h1>
          <p className="assessment-name">{result.assessmentType}</p>
          <p className="assessment-date">
            Completed on {new Date(result.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="score-card">
          <div className="score-circle" style={{ borderColor: getSeverityColor(result.interpretation.severity) }}>
            <div className="score-value">{result.score}</div>
            <div className="score-label">Score</div>
          </div>
          <div className="interpretation-box">
            <div className="severity-badge" style={{ background: getSeverityColor(result.interpretation.severity) }}>
              {getSeverityIcon(result.interpretation.severity)} {result.interpretation.label}
            </div>
          </div>
        </div>

        <div className="recommendations-section">
          <h2>📋 Personalized Recommendations</h2>
          <div className="recommendations-list">
            {result.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-item">
                <span className="rec-number">{index + 1}</span>
                <p>{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {(result.interpretation.severity === "high" || result.interpretation.severity === "critical") && (
          <div className="crisis-resources">
            <h3>🆘 Immediate Support Resources</h3>
            <div className="resource-links">
              <div className="resource-item">
                <strong>National Suicide Prevention Lifeline:</strong>
                <a href="tel:988">988</a>
              </div>
              <div className="resource-item">
                <strong>Crisis Text Line:</strong>
                <a href="sms:741741">Text HELLO to 741741</a>
              </div>
              <div className="resource-item">
                <strong>SAMHSA National Helpline:</strong>
                <a href="tel:1-800-662-4357">1-800-662-4357</a>
              </div>
            </div>
          </div>
        )}

        <div className="action-buttons">
          <Link to="/dashboard" className="btn-secondary">
            Back to Dashboard
          </Link>
          <Link to={`/assessment/${result.assessmentType}`} className="btn-primary">
            Retake Assessment
          </Link>
          <Link to="/consultation" className="btn-consultation">
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
