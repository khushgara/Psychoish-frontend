import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AllResults.css";

const SEVERITY_COLORS = {
  low:      "#10b981",
  mild:     "#3b82f6",
  moderate: "#f59e0b",
  high:     "#ef4444",
  critical: "#dc2626",
};

const getSeverityColor = (s) => SEVERITY_COLORS[s] || "#6b7280";

/* ─── Mini Sparkline ────────────────────────────────────────── */
function Sparkline({ scores, color = "#667eea" }) {
  if (!scores || scores.length < 2) return null;
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  const range = max - min || 1;
  const W = 120, H = 40;
  const pts = scores.map((s, i) => {
    const x = (i / (scores.length - 1)) * W;
    const y = H - ((s - min) / range) * (H - 6) - 3;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="sparkline">
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      {scores.map((s, i) => {
        const [x, y] = pts[i].split(",");
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

/* ─── Score Mini Bar ─────────────────────────────────────────── */
function ScoreMiniBar({ score, maxScore = 100, severity }) {
  const [w, setW] = useState(0);
  const pct = Math.min((score / maxScore) * 100, 100);
  useEffect(() => { const t = setTimeout(() => setW(pct), 150); return () => clearTimeout(t); }, [pct]);
  const color = getSeverityColor(severity);
  return (
    <div className="mini-bar-wrap">
      <div className="mini-bar-track">
        <div className="mini-bar-fill"
          style={{ width: `${w}%`, background: color, boxShadow: `0 0 8px ${color}88`, transition: "width 0.9s ease" }} />
      </div>
      <span className="mini-bar-score" style={{ color }}>{score}</span>
    </div>
  );
}

/* ─── Icon Components ────────────────────────────────────────── */
const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const IconBrain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.14Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.14Z"/>
  </svg>
);

const IconAlert = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

/* ─── Summary Stats ──────────────────────────────────────────── */
function SummaryStats({ results }) {
  const total = results.length;
  const types = new Set(results.map(r => r.type)).size;
  const severities = results.map(r => r.interpretation?.severity).filter(Boolean);
  const highRisk = severities.filter(s => s === "high" || s === "critical").length;

  const stats = [
    { label: "Total Assessments", value: total, icon: <IconChart />, color: "#8b5cf6" },
    { label: "Types Completed",   value: types, icon: <IconBrain />, color: "#3b82f6" },
    { label: "High Risk Flags",   value: highRisk, icon: <IconAlert />, color: "#ef4444" },
  ];

  return (
    <div className="summary-stats">
      {stats.map(s => (
        <div key={s.label} className="summary-stat-card" style={{ borderColor: s.color + "44" }}>
          <span className="stat-icon" style={{ color: s.color }}>{s.icon}</span>
          <div>
            <div className="stat-val" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Assessment Type Chart ──────────────────────────────────── */
function TypeBarChart({ results }) {
  const byType = {};
  results.forEach(r => { byType[r.type] = (byType[r.type] || 0) + 1; });
  const entries = Object.entries(byType).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(e => e[1]), 1);
  const colors = ["#8b5cf6","#3b82f6","#10b981","#f59e0b","#ef4444","#ec4899","#6366f1","#14b8a6","#f97316"];

  if (entries.length === 0) return null;
  return (
    <div className="type-chart-section">
      <h3 className="chart-section-title">Assessments by Type</h3>
      <div className="type-bars">
        {entries.map(([type, count], i) => {
          const pct = (count / max) * 100;
          return (
            <div key={type} className="type-bar-row">
              <span className="type-bar-label">{type.toUpperCase()}</span>
              <div className="type-bar-track">
                <div className="type-bar-fill"
                  style={{ width: `${pct}%`, background: colors[i % colors.length], boxShadow: `0 0 8px ${colors[i % colors.length]}66` }} />
              </div>
              <span className="type-bar-count" style={{ color: colors[i % colors.length] }}>{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Severity Donut ─────────────────────────────────────────── */
function SeverityDonut({ results }) {
  const counts = {};
  results.forEach(r => {
    const s = r.interpretation?.severity || "unknown";
    counts[s] = (counts[s] || 0) + 1;
  });

  const slices = Object.entries(counts).map(([s, c]) => ({ s, c, color: getSeverityColor(s) }));
  const total = slices.reduce((a, b) => a + b.c, 0);

  const R = 54, CX = 70, CY = 70;
  const circ = 2 * Math.PI * R;
  let cumulative = 0;

  return (
    <div className="donut-chart-section">
      <h3 className="chart-section-title">Severity Distribution</h3>
      <div className="donut-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {slices.map(({ s, c, color }) => {
            const pct = c / total;
            const dash = circ * pct;
            const offset = circ * (1 - cumulative);
            cumulative += pct;
            return (
              <circle key={s} cx={CX} cy={CY} r={R}
                fill="none" stroke={color} strokeWidth="18"
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${CX} ${CY})`}
                style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
              />
            );
          })}
          <text x={CX} y={CY + 5} textAnchor="middle" fontSize="18"
            fontWeight="800" fill="var(--text)">{total}</text>
        </svg>
        <div className="donut-legend">
          {slices.map(({ s, c, color }) => (
            <div key={s} className="donut-legend-item">
              <div className="donut-legend-dot" style={{ background: color }} />
              <span style={{ color }}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
              <span className="donut-legend-count">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
const AllResults = () => {
  const { axiosInstance, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!isAuthenticated) { navigate("/login"); return; }
    const fetchAllResults = async () => {
      try {
        const response = await axiosInstance.get("/api/results/all");
        if (response.data.success) setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllResults();
  }, [isAuthenticated, navigate, axiosInstance]);

  if (loading) {
    return (
      <div className="all-results-page">
        <div className="loader" />
        <p className="loading-text">Loading your history…</p>
      </div>
    );
  }

  const types = ["all", ...new Set(results.map(r => r.type))];
  const filtered = filter === "all" ? results : results.filter(r => r.type === filter);

  // Sparkline per type
  const sparkByType = {};
  results.forEach(r => {
    if (!sparkByType[r.type]) sparkByType[r.type] = [];
    sparkByType[r.type].push(r.score);
  });

  return (
    <div className="all-results-page">
      <div className="all-results-container">

        {/* Header */}
        <div className="page-header">
          <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
          <h1>Assessment History
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              style={{ width: "28px", height: "28px", display: "inline-block", verticalAlign: "middle", marginLeft: "8px", color: "#8b5cf6" }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </h1>
          <p>View all your past mental wellness assessments</p>
        </div>

        {results.length === 0 ? (
          <div className="no-results">
            <p>You haven't taken any assessments yet.</p>
            <Link to="/dashboard" className="btn-primary-ar">Take an Assessment</Link>
          </div>
        ) : (
          <>
            {/* Summary stats */}
            <SummaryStats results={results} />

            {/* Charts row */}
            <div className="charts-row">
              <div className="chart-glass-card">
                <TypeBarChart results={results} />
              </div>
              <div className="chart-glass-card">
                <SeverityDonut results={results} />
              </div>
            </div>

            {/* Filter chips */}
            <div className="filter-chips">
              {types.map(t => (
                <button key={t} className={`chip ${filter === t ? "chip-active" : ""}`}
                  onClick={() => setFilter(t)}>
                  {t === "all" ? "All Types" : t.toUpperCase()}
                </button>
              ))}
            </div>

            {/* History list */}
            <div className="history-list">
              {filtered.map((result) => {
                const color = getSeverityColor(result.interpretation?.severity);
                const sparkScores = sparkByType[result.type] || [];
                return (
                  <div key={result.id} className="history-item">
                    <div className="history-main">
                      <div className="history-info">
                        <span className="history-type">{result.type.toUpperCase()}</span>
                        <span className="history-date">
                          {new Date(result.date).toLocaleDateString()} at {new Date(result.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <ScoreMiniBar score={result.score} severity={result.interpretation?.severity} />
                      <div className="history-outcome">
                        <div className="severity-tag"
                          style={{ color, borderColor: color, background: color + "18" }}>
                          {result.interpretation?.label || "—"}
                        </div>
                      </div>
                    </div>
                    <div className="history-right">
                      <Sparkline scores={sparkScores.slice(-5)} color={color} />
                      <Link to={`/results/${result.id}`} className="view-details-btn">
                        View Details →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllResults;
