import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AllResults.css";

const AllResults = () => {
  const { axiosInstance, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    const fetchAllResults = async () => {
      try {
        const response = await axiosInstance.get("/api/results/all");
        if (response.data.success) {
          setResults(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllResults();
  }, [isAuthenticated, navigate, axiosInstance]);

  const getSeverityColor = (severity) => {
    const colors = {
      low: "var(--success)",
      mild: "var(--info)",
      moderate: "var(--warning)",
      high: "var(--error)",
      critical: "#dc2626",
    };
    return colors[severity] || "var(--text-secondary)";
  };

  if (loading) {
    return (
      <div className="all-results-page">
        <div className="loader"></div>
        <p className="loading-text">Loading your history...</p>
      </div>
    );
  }

  return (
    <div className="all-results-page">
      <div className="all-results-container">
        <div className="page-header">
          <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
          <h1>Assessment History 📜</h1>
          <p>View all your past mental wellness assessments</p>
        </div>

        {results.length === 0 ? (
          <div className="no-results">
            <p>You haven't taken any assessments yet.</p>
            <Link to="/dashboard" className="btn-primary">Take an Assessment</Link>
          </div>
        ) : (
          <div className="history-list">
            {results.map((result) => (
              <div key={result.id} className="history-item">
                <div className="history-main">
                  <div className="history-info">
                    <span className="history-type">{result.type.toUpperCase()}</span>
                    <span className="history-date">
                      {new Date(result.date).toLocaleDateString()} at {new Date(result.date).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="history-outcome">
                    <div className="score-badge">
                      Score: {result.score}
                    </div>
                    <div 
                      className="severity-tag"
                      style={{ 
                        color: getSeverityColor(result.interpretation.severity),
                        borderColor: getSeverityColor(result.interpretation.severity)
                      }}
                    >
                      {result.interpretation.label}
                    </div>
                  </div>
                </div>
                <Link to={`/results/${result.id}`} className="view-details-btn">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllResults;
