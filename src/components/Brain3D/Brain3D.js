import React, { useEffect, useRef } from "react";
import "./Brain3D.css";

// ── Neon colors per brain region (matches reference image palette) ──────────
const LOBE_COLORS = {
  frontal:    [0,   255, 140],   // neon green
  parietal:   [255, 210, 0  ],   // golden yellow
  temporal:   [255,  60, 110],   // hot pink-red
  occipital:  [30,  170, 255],   // electric blue
  cerebellum: [190,  60, 255],   // vivid violet
  brainstem:  [255, 140,   0],   // amber-orange
};

function classifyLobe(x, y, type) {
  if (type === "cerebellum") return "cerebellum";
  if (type === "brainstem")  return "brainstem";
  if (x > 0.28)              return "frontal";
  if (x < -0.28)             return "occipital";
  if (y < -0.15)             return "temporal";
  return "parietal";
}

// ── Batch draw edges grouped by lobe to minimise ctx state switches ─────────
function drawEdgeBatch(ctx, batch, lobeKey, width, height) {
  if (!batch.length) return;
  const [r, g, b] = LOBE_COLORS[lobeKey] || [200, 200, 255];

  // Wide soft outer glow
  ctx.shadowBlur   = 20;
  ctx.shadowColor  = `rgba(${r},${g},${b},0.55)`;
  ctx.strokeStyle  = `rgba(${r},${g},${b},0.28)`;
  ctx.lineWidth    = 1.8;
  ctx.beginPath();
  for (const [ax, ay, bx, by] of batch) {
    if (ax < -30 || ax > width + 30 || bx < -30 || bx > width + 30) continue;
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
  }
  ctx.stroke();

  // Sharp bright core line
  ctx.shadowBlur   = 5;
  ctx.strokeStyle  = `rgba(${r},${g},${b},0.90)`;
  ctx.lineWidth    = 0.7;
  ctx.beginPath();
  for (const [ax, ay, bx, by] of batch) {
    if (ax < -30 || ax > width + 30 || bx < -30 || bx > width + 30) continue;
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
  }
  ctx.stroke();
}

const Brain3D = () => {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const mouseRef     = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let width  = (canvas.width  = 600);
    let height = (canvas.height = 600);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        width  = canvas.width  = w || 600;
        height = canvas.height = h || 600;
      }
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // ── 1. Generate Brain Points ─────────────────────────────────────────
    const generateBrainPoints = () => {
      const pts = [];
      const N   = 1600;

      for (let i = 0; i < N; i++) {
        const rand = Math.random();

        /* ── Cerebrum (74 %) ──────────────────────────────────────── */
        if (rand < 0.74) {
          const theta = Math.acos(2 * Math.random() - 1);
          const phi   = Math.random() * Math.PI * 2;
          const r     = 0.86 + 0.14 * Math.random();

          // Base ellipsoid
          let x = 1.32 * r * Math.sin(theta) * Math.cos(phi);
          let y = 1.02 * r * Math.cos(theta);
          let z = 0.90 * r * Math.sin(theta) * Math.sin(phi);

          // Frontal bulge / occipital taper
          if (x > 0) { y += 0.06 * Math.sin(x * 2.8); x *= 1.04; }
          else        { y *= 0.80; x *= 0.88; }

          // Temporal lobe protrusion (downward-lateral)
          if (x > -0.30 && x < 0.60 && y < 0 && y > -0.50) {
            z *= 1.20; y -= 0.10;
          }

          // Sagittal fissure
          const fw = 0.13;
          if (Math.abs(z) < fw) {
            y -= (fw - Math.abs(z)) * 0.60;
            z  = Math.sign(z) * Math.max(0.04, Math.abs(z));
          } else {
            z += Math.sign(z) * 0.04;
          }

          // Gyri / Sulci surface wrinkles
          const fv =
            Math.sin(x * 6.8) * Math.cos(y * 6.2) * Math.sin(z * 7.0);
          const sf = 0.13;
          x += fv * (x / 1.32) * sf;
          y += fv * (y / 1.02) * sf;
          z += fv * (z / 0.90) * sf;

          const lobe = classifyLobe(x, y, "cerebrum");
          pts.push({ x, y, z, size: Math.random() * 1.3 + 0.55, fv, type: "cerebrum", lobe });

        /* ── Cerebellum (16 %) ─────────────────────────────────────── */
        } else if (rand < 0.90) {
          const r     = 0.30 + 0.10 * Math.random();
          const theta = Math.random() * Math.PI;
          const phi   = Math.random() * Math.PI * 2;

          let x = -0.70 + r * Math.sin(theta) * Math.cos(phi);
          let y = -0.50 + r * Math.cos(theta) - 0.07;
          let z =          r * Math.sin(theta) * Math.sin(phi);

          // Horizontal foliation sheets
          y = Math.round(y * 24) / 24;
          const foil = Math.sin(y * 44) * 0.022;
          x += foil; z += foil;

          pts.push({ x, y, z, size: Math.random() * 0.9 + 0.4, fv: 0, type: "cerebellum", lobe: "cerebellum" });

        /* ── Brainstem (10 %) ──────────────────────────────────────── */
        } else {
          const angle = Math.random() * Math.PI * 2;
          const r     = 0.092 * (0.8 + 0.2 * Math.random());
          let   y     = -0.50 - 0.55 * Math.random();
          let   x     = -0.18 + r * Math.cos(angle) - (y + 0.50) * 0.10;
          let   z     = r * Math.sin(angle);

          pts.push({ x, y, z, size: Math.random() * 1.2 + 0.55, fv: 0.5, type: "brainstem", lobe: "brainstem" });
        }
      }
      return pts;
    };

    const points = generateBrainPoints();

    // ── 2. Generate Connection Edges ────────────────────────────────────
    const generateEdges = (pts) => {
      const list      = [];
      const MAX_CONN  = 4;
      const THRESHOLD = 0.22;

      for (let i = 0; i < pts.length; i++) {
        const cands = [];
        for (let j = i + 1; j < pts.length; j++) {
          if (pts[i].type !== pts[j].type) continue;
          if (pts[i].type === "cerebrum" && Math.sign(pts[i].z) !== Math.sign(pts[j].z)) continue;

          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          const d  = dx * dx + dy * dy + dz * dz;
          if (d < THRESHOLD * THRESHOLD) cands.push({ j, d });
        }
        cands.sort((a, b) => a.d - b.d);
        const take = Math.min(cands.length, MAX_CONN);
        for (let k = 0; k < take; k++) {
          list.push([i, cands[k].j, pts[i].lobe]);
        }
      }
      return list;
    };

    const edges = generateEdges(points);

    // ── 3. Animation Setup ──────────────────────────────────────────────
    let angleY   = 0;
    let angleX   = 0.22;
    let scanLine = 0;
    const DISTANCE  = 4.2;
    const BASE_SCALE = 530;

    const onMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width  - 0.5,
        y: (e.clientY - rect.top)  / rect.height - 0.5,
        active: true,
      };
    };
    const onMouseLeave = () => { mouseRef.current = { x: 0, y: 0, active: false }; };

    const container = containerRef.current;
    container.addEventListener("mousemove",  onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // ── 4. Render Loop ──────────────────────────────────────────────────
    const render = () => {
      // Slight trail (motion-blur / persistence)
      ctx.fillStyle = "rgba(4, 3, 20, 0.82)";
      ctx.fillRect(0, 0, width, height);

      // Advance auto rotation & scan line
      angleY    += 0.0038;
      scanLine   = (scanLine + 1.4) % height;

      // Mouse-guided tilt
      const m = mouseRef.current;
      const targetX = 0.22 + (m.active ? m.y * 0.75 : 0);
      const targetY = angleY + (m.active ? m.x * 0.75 : 0);
      angleX = angleX + (targetX - angleX) * 0.10;

      const cosY = Math.cos(targetY), sinY = Math.sin(targetY);
      const cosX = Math.cos(angleX),  sinX = Math.sin(angleX);
      const scale = BASE_SCALE * (Math.min(width, height) / 500);

      // Project all points to screen space
      const proj = points.map((p) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const d  = z2 + DISTANCE;
        return {
          sx: (x1 * scale) / d + width  / 2,
          sy: (-y2 * scale) / d + height / 2,
          depth: z2,
          size: p.size,
          fv:   p.fv,
          lobe: p.lobe,
        };
      });

      // ── Draw Edges (grouped by lobe, back→front) ─────────────────────
      const lobeBatches = {};
      for (const lk of Object.keys(LOBE_COLORS)) lobeBatches[lk] = [];

      // Sort edges back-to-front
      const sortedEdges = edges
        .map(([a, b, lobe]) => ({
          a: proj[a], b: proj[b], lobe,
          avg: (proj[a].depth + proj[b].depth) / 2,
        }))
        .sort((x, y) => x.avg - y.avg);

      for (const { a, b, lobe, avg } of sortedEdges) {
        const opacity = Math.max(0.04, Math.min(1.0, (avg + 1.6) / 3.0));
        // Only draw edges at reasonable depth-based opacity
        if (opacity < 0.06) continue;
        lobeBatches[lobe]?.push([a.sx, a.sy, b.sx, b.sy, opacity]);
      }

      for (const [lobeKey, batch] of Object.entries(lobeBatches)) {
        drawEdgeBatch(ctx, batch, lobeKey, width, height);
      }

      // ── Draw Nodes (particles) ────────────────────────────────────────
      ctx.shadowBlur = 0;
      // Sort nodes front to back for correct overdraw
      const sortedPts = proj.map((p, i) => ({ ...p, i })).sort((a, b) => a.depth - b.depth);

      for (const pt of sortedPts) {
        if (pt.sx < -20 || pt.sx > width + 20 || pt.sy < -20 || pt.sy > height + 20) continue;
        const [r, g, b2] = LOBE_COLORS[pt.lobe] || [200, 200, 255];
        const df   = Math.max(0, (pt.depth + 1.6) / 3.2);
        const fsh  = pt.fv !== undefined ? 0.6 + 0.4 * pt.fv : 1;
        const op   = Math.max(0.15, Math.min(1, df * fsh));
        const sz   = Math.max(0.4, pt.size * (0.5 + 0.7 * df));

        ctx.shadowBlur  = 9;
        ctx.shadowColor = `rgba(${r},${g},${b2},0.85)`;
        ctx.fillStyle   = `rgba(${r},${g},${b2},${op})`;
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, sz, 0, Math.PI * 2);
        ctx.fill();

        // Bright core dot for foreground nodes
        if (pt.depth > 0.5) {
          ctx.fillStyle = `rgba(255,255,255,${op * 0.55})`;
          ctx.beginPath();
          ctx.arc(pt.sx, pt.sy, sz * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;

      // ── Holographic Scan Line ─────────────────────────────────────────
      const sl = ctx.createLinearGradient(0, scanLine - 25, 0, scanLine + 25);
      sl.addColorStop(0,   "rgba(120, 220, 255, 0)");
      sl.addColorStop(0.5, "rgba(120, 220, 255, 0.055)");
      sl.addColorStop(1,   "rgba(120, 220, 255, 0)");
      ctx.fillStyle = sl;
      ctx.fillRect(0, scanLine - 25, width, 50);

      // ── Subtle vignette to focus attention on centre ──────────────────
      const vig = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.28,
        width / 2, height / 2, height * 0.72,
      );
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      if (container) {
        container.removeEventListener("mousemove",  onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []); // runs ONCE – mouse uses ref, no re-mount flicker

  return (
    <div className="brain-3d-container" ref={containerRef}>
      <div className="brain-glow-overlay" />
      <canvas ref={canvasRef} className="brain-canvas" />
      {/* Corner bracket decorations for the holographic HUD look */}
      <span className="brain-corner brain-corner--tl" />
      <span className="brain-corner brain-corner--tr" />
      <span className="brain-corner brain-corner--bl" />
      <span className="brain-corner brain-corner--br" />
    </div>
  );
};

export default Brain3D;
