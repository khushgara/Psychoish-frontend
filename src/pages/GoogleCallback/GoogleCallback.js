import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      console.error("Google OAuth error:", error);
      navigate(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (code) {
      // Redirect the browser to the backend callback handler to complete the OAuth exchange
      window.location.href = `${API_BASE_URL}/api/auth/google/callback?code=${code}`;
    } else {
      navigate("/login?error=No authorization code found");
    }
  }, [location, navigate]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "70vh",
      color: "var(--text)"
    }}>
      <div className="btn-spinner" style={{ 
        width: "40px", 
        height: "40px", 
        border: "4px solid rgba(255, 255, 255, 0.1)", 
        borderTop: "4px solid var(--primary)", 
        borderRadius: "50%", 
        animation: "spin 1s linear infinite", 
        marginBottom: "1rem" 
      }} />
      <h3>Completing Google Sign In...</h3>
      <p style={{ color: "var(--text-secondary)" }}>Please wait while we connect your account.</p>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GoogleCallback;
