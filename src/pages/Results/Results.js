import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Results.css";

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const SEVERITY_ORDER = ["low", "mild", "moderate", "high", "critical"];
const SEVERITY_COLORS = {
  low:      "#10b981",
  mild:     "#3b82f6",
  moderate: "#f59e0b",
  high:     "#ef4444",
  critical: "#dc2626",
};
const SEVERITY_BG = {
  low:      "rgba(16,185,129,.15)",
  mild:     "rgba(59,130,246,.15)",
  moderate: "rgba(245,158,11,.15)",
  high:     "rgba(239,68,68,.15)",
  critical: "rgba(220,38,38,.15)",
};

const getSeverityColor = (s) => SEVERITY_COLORS[s] || "#6b7280";

/* ─── Animated Radial Gauge ──────────────────────────────────────────────── */
function RadialGauge({ score, maxScore, severity }) {
  const [animPct, setAnimPct] = useState(0);
  const pct = Math.min(score / maxScore, 1);
  const color = getSeverityColor(severity);

  useEffect(() => {
    let raf;
    let start = null;
    const duration = 1400;
    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimPct(eased * pct);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  const R = 90;
  const cx = 110, cy = 110;
  const circumference = 2 * Math.PI * R;
  // we use 270° arc (from 135° to 405°)
  const arcLen = circumference * 0.75;
  const dashOffset = arcLen * (1 - animPct);

  return (
    <div className="gauge-wrapper">
      <svg width="220" height="220" viewBox="0 0 220 220">
        {/* Background track */}
        <circle
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="16"
          strokeDasharray={`${arcLen} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
        />
        {/* Coloured progress */}
        <circle
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeDasharray={`${arcLen} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 8px ${color})`, transition: "stroke 0.5s" }}
        />
        {/* Glow dot at tip */}
        {(() => {
          const angle = (135 + animPct * 270) * (Math.PI / 180);
          const x = cx + R * Math.cos(angle);
          const y = cy + R * Math.sin(angle);
          return (
            <circle cx={x} cy={y} r="9" fill={color}
              style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
          );
        })()}
        {/* Score text */}
        <text x={cx} y={cy - 10} textAnchor="middle"
          fontSize="38" fontWeight="800" fill="white">
          {score}
        </text>
        <text x={cx} y={cy + 18} textAnchor="middle"
          fontSize="13" fill="rgba(255,255,255,0.5)" letterSpacing="2">
          / {maxScore}
        </text>
        <text x={cx} y={cy + 44} textAnchor="middle"
          fontSize="11" fill="rgba(255,255,255,0.35)" letterSpacing="3">
          SCORE
        </text>
      </svg>
    </div>
  );
}

/* ─── Score Spectrum Bar ─────────────────────────────────────────────────── */
function SpectrumBar({ score, maxScore, severity }) {
  const [width, setWidth] = useState(0);
  const pct = Math.min((score / maxScore) * 100, 100);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 200);
    return () => clearTimeout(t);
  }, [pct]);

  const zones = [
    { label: "Low", color: "#10b981", end: 20 },
    { label: "Mild", color: "#3b82f6", end: 40 },
    { label: "Moderate", color: "#f59e0b", end: 60 },
    { label: "High", color: "#ef4444", end: 80 },
    { label: "Critical", color: "#dc2626", end: 100 },
  ];

  return (
    <div className="spectrum-section">
      <h3 className="chart-title">Score Spectrum</h3>
      <div className="spectrum-bar-wrap">
        <div className="spectrum-track">
          {zones.map((z, i) => (
            <div key={z.label}
              style={{ flex: 1, background: z.color, opacity: 0.25,
                borderRadius: i === 0 ? "8px 0 0 8px" : i === zones.length - 1 ? "0 8px 8px 0" : 0 }} />
          ))}
          {/* indicator */}
          <div className="spectrum-needle" style={{ left: `${width}%` }} />
        </div>
        <div className="spectrum-labels">
          {zones.map((z) => (
            <span key={z.label} style={{ color: z.color, flex: 1, textAlign: "center" }}>{z.label}</span>
          ))}
        </div>
        <div className="spectrum-marker" style={{ left: `${width}%` }}>
          <span>{score}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Severity Scale Bars ─────────────────────────────────────────────────── */
function SeverityBars({ score, maxScore, severity }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 400); return () => clearTimeout(t); }, []);

  const currentIdx = SEVERITY_ORDER.indexOf(severity);
  const ranges = [
    { label: "Low",      key: "low",      pct: 20 },
    { label: "Mild",     key: "mild",     pct: 20 },
    { label: "Moderate", key: "moderate", pct: 20 },
    { label: "High",     key: "high",     pct: 20 },
    { label: "Critical", key: "critical", pct: 20 },
  ];

  return (
    <div className="severity-bars-section">
      <h3 className="chart-title">Severity Breakdown</h3>
      <div className="severity-bars">
        {ranges.map((r, i) => {
          const isActive = r.key === severity;
          const barH = isActive ? 100 : 40 + i * 12;
          return (
            <div key={r.key} className="sev-bar-col">
              <div className="sev-bar-outer"
                style={{ height: "120px", display: "flex", alignItems: "flex-end" }}>
                <div
                  className="sev-bar-inner"
                  style={{
                    width: "100%",
                    height: animated ? `${barH}%` : "0%",
                    background: SEVERITY_COLORS[r.key],
                    borderRadius: "6px 6px 0 0",
                    opacity: isActive ? 1 : 0.35,
                    transition: "height 0.8s cubic-bezier(0.34,1.56,0.64,1)",
                    boxShadow: isActive ? `0 0 16px ${SEVERITY_COLORS[r.key]}` : "none",
                  }}
                />
              </div>
              <span className="sev-bar-label" style={{ color: isActive ? SEVERITY_COLORS[r.key] : "rgba(255,255,255,0.4)", fontWeight: isActive ? 700 : 400 }}>
                {r.label}
              </span>
              {isActive && <div className="sev-active-dot" style={{ background: SEVERITY_COLORS[r.key] }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Score Donut Mini Chart ─────────────────────────────────────────────── */
function ScoreDonut({ score, maxScore, severity }) {
  const [animPct, setAnimPct] = useState(0);
  const pct = Math.min(score / maxScore, 1);
  const color = getSeverityColor(severity);

  useEffect(() => {
    let raf, start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setAnimPct((1 - Math.pow(1 - p, 3)) * pct);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  const R = 44, C = 50;
  const circ = 2 * Math.PI * R;
  const dash = circ * animPct;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle cx={C} cy={C} r={R} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${C} ${C})`}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      <text x={C} y={C + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="white">
        {Math.round(animPct * 100)}%
      </text>
    </svg>
  );
}

/* ─── Recommendations Radial Badges ─────────────────────────────────────── */
function RecBadge({ number, color }) {
  return (
    <div className="rec-badge" style={{ background: `linear-gradient(135deg, ${color}, ${color}aa)` }}>
      {number}
    </div>
  );
}

/* ─── Severity icons ─────────────────────────────────────────────────────── */
const getSeverityIcon = (severity) => {
  const s = { width: "18px", height: "18px", marginRight: "6px", display: "inline-block", verticalAlign: "middle" };
  if (["high", "moderate", "critical"].includes(severity))
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={s}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
  if (severity === "low")
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={s}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={s}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
};

/* ─── Wellness Meter ──────────────────────────────────────────────────────── */
function WellnessMeter({ severity }) {
  const idx = SEVERITY_ORDER.indexOf(severity);
  const wellnessScore = Math.max(0, 100 - idx * 22); // inverse of severity
  const [val, setVal] = useState(0);
  useEffect(() => { const t = setTimeout(() => setVal(wellnessScore), 600); return () => clearTimeout(t); }, [wellnessScore]);

  const segments = [
    { color: "#dc2626", label: "Critical" },
    { color: "#ef4444", label: "High" },
    { color: "#f59e0b", label: "Moderate" },
    { color: "#3b82f6", label: "Mild" },
    { color: "#10b981", label: "Low / Good" },
  ];

  return (
    <div className="wellness-meter-section">
      <h3 className="chart-title">Wellness Indicator</h3>
      <div className="wellness-track">
        {segments.map((seg, i) => (
          <div key={i} style={{
            flex: 1, background: seg.color,
            opacity: val >= (i + 1) * 20 ? 1 : 0.2,
            borderRadius: i === 0 ? "8px 0 0 8px" : i === 4 ? "0 8px 8px 0" : 0,
            height: "24px",
            transition: `opacity ${0.3 + i * 0.1}s ease`,
          }} />
        ))}
      </div>
      <div className="wellness-legend">
        <span style={{ color: "#dc2626" }}>Critical</span>
        <span style={{ color: "#10b981" }}>Healthy</span>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axiosInstance, isAuthenticated } = useContext(AuthContext);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) { navigate("/login"); return; }
    const fetchResult = async () => {
      try {
        const response = await axiosInstance.get(`/api/results/${id}`);
        setResult(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching result:", error);
        alert("Failed to load results. Please try again.");
        navigate("/dashboard");
      }
    };
    fetchResult();
  }, [id, isAuthenticated, navigate, axiosInstance]);

  if (loading) {
    return (
      <div className="results-loading">
        <div className="loader" />
        <p>Loading your results…</p>
      </div>
    );
  }

  if (!result) return <div className="results-error">Results not found</div>;

  const severity = result.interpretation.severity;
  const color = getSeverityColor(severity);
  // Determine a sensible max score based on assessment type or fall back to a sane default
  const maxScoreMap = {
    mood: 27, anxiety: 21, dast10: 10, wellbeing: 35,
    ybocs: 40, sbqr: 18, sleepQuality: 21, phq: 80, ryffFull: 216,
  };
  const maxScore = maxScoreMap[result.assessmentType] || Math.max(result.score * 2, 100);

  return (
    <div className="results-page">
      <div className="results-container">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="results-header">
          <div className="results-header-badge" style={{ background: SEVERITY_BG[severity], borderColor: color }}>
            {getSeverityIcon(severity)}
            <span style={{ color }}>{result.interpretation.label}</span>
          </div>
          <h1>Assessment Results</h1>
          <p className="assessment-name">{result.assessmentType?.toUpperCase()} Assessment</p>
          <p className="assessment-date">
            Completed on {new Date(result.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* ── Gauge + Donut row ───────────────────────────────────────────── */}
        <div className="viz-row">
          <div className="viz-card gauge-card">
            <h3 className="chart-title">Your Score</h3>
            <RadialGauge score={result.score} maxScore={maxScore} severity={severity} />
          </div>
          <div className="viz-card donut-card">
            <h3 className="chart-title">Percentile Used</h3>
            <ScoreDonut score={result.score} maxScore={maxScore} severity={severity} />
            <p className="donut-label" style={{ color }}>
              {result.interpretation.label}
            </p>
          </div>
          <div className="viz-card sev-card">
            <SeverityBars score={result.score} maxScore={maxScore} severity={severity} />
          </div>
        </div>

        {/* ── Spectrum Bar ───────────────────────────────────────────────── */}
        <div className="viz-card full-card">
          <SpectrumBar score={result.score} maxScore={maxScore} severity={severity} />
        </div>

        {/* ── Wellness Meter ─────────────────────────────────────────────── */}
        <div className="viz-card full-card">
          <WellnessMeter severity={severity} />
        </div>

        {/* ── Severity Scale reference ────────────────────────────────────── */}
        <div className="viz-card full-card">
          <h3 className="chart-title">Severity Reference Scale</h3>
          <div className="ref-scale">
            {SEVERITY_ORDER.map((s, i) => {
              const isActive = s === severity;
              return (
                <div key={s} className={`ref-segment ${isActive ? "ref-active" : ""}`}
                  style={{ borderColor: isActive ? SEVERITY_COLORS[s] : "transparent",
                           boxShadow: isActive ? `0 0 20px ${SEVERITY_COLORS[s]}55` : "none" }}>
                  <div className="ref-dot" style={{ background: SEVERITY_COLORS[s] }} />
                  <div className="ref-name" style={{ color: isActive ? SEVERITY_COLORS[s] : "rgba(255,255,255,0.45)" }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </div>
                  <div className="ref-range" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {["0–20%", "21–40%", "41–60%", "61–80%", "81–100%"][i]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Recommendations ────────────────────────────────────────────── */}
        <div className="recommendations-section">
          <h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              style={{ width: "24px", height: "24px", display: "inline-block", verticalAlign: "middle", marginRight: "8px", color: "var(--primary)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Personalized Recommendations
          </h2>
          <div className="recommendations-list">
            {result.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-item">
                <RecBadge number={index + 1} color={color} />
                <p>{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Crisis resources ───────────────────────────────────────────── */}
        {(severity === "high" || severity === "critical") && (
          <div className="crisis-resources">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                style={{ width: "22px", height: "22px", display: "inline-block", verticalAlign: "middle", marginRight: "8px", color: "#ef4444" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Immediate Support Resources
            </h3>
            <div className="resource-links">
              <div className="resource-item"><strong>National Suicide Prevention Lifeline:</strong><a href="tel:988">988</a></div>
              <div className="resource-item"><strong>Crisis Text Line:</strong><a href="sms:741741">Text HELLO to 741741</a></div>
              <div className="resource-item"><strong>SAMHSA National Helpline:</strong><a href="tel:1-800-662-4357">1-800-662-4357</a></div>
            </div>
          </div>
        )}

        {/* ── Action buttons ─────────────────────────────────────────────── */}
        <div className="action-buttons">
          <Link to="/dashboard" className="btn-secondary">Back to Dashboard</Link>
          <Link to={`/assessment/${result.assessmentType}`} className="btn-primary">Retake Assessment</Link>
          <Link to="/consultation" className="btn-consultation">Book Consultation</Link>
        </div>

      </div>
    </div>
  );
};

export default Results;
