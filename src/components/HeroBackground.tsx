"use client";

import { useEffect, useRef, useMemo } from "react";

/* ═══════════════════════════════════════════════════════
   LAYER 6 Blueprint Decorations (SVG)
   ═══════════════════════════════════════════════════════ */
function BlueprintDecorations() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 6 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="deco-fade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Top-left corner bracket */}
      <g opacity="0.15">
        <path
          d="M 40 80 L 40 40 L 80 40"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <line
          x1="40"
          y1="40"
          x2="55"
          y2="40"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="40"
          y1="40"
          x2="40"
          y2="55"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="40"
          y1="60"
          x2="46"
          y2="60"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="40"
          y1="100"
          x2="46"
          y2="100"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="40"
          y1="140"
          x2="44"
          y2="140"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="60"
          y1="40"
          x2="60"
          y2="46"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="100"
          y1="40"
          x2="100"
          y2="46"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="140"
          y1="40"
          x2="140"
          y2="44"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
      </g>

      {/* Top-right corner bracket */}
      <g opacity="0.12">
        <path
          d="M 100% 80 L 100% 40 L calc(100% - 40) 40"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <line
          x1="100%"
          y1="60"
          x2="calc(100% - 6)"
          y2="60"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="100%"
          y1="100"
          x2="calc(100% - 6)"
          y2="100"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="calc(100% - 20)"
          y1="40"
          x2="calc(100% - 20)"
          y2="46"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        <line
          x1="calc(100% - 60)"
          y1="40"
          x2="calc(100% - 60)"
          y2="46"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
      </g>

      {/* Top edge: horizontal measurement line */}
      <g opacity="0.08">
        <line
          x1="20%"
          y1="30"
          x2="80%"
          y2="30"
          stroke="url(#deco-fade)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
      </g>

      {/* Left edge: vertical measurement line */}
      <g opacity="0.06">
        <line
          x1="30"
          y1="20%"
          x2="30"
          y2="80%"
          stroke="url(#deco-fade)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
      </g>

      {/* Scattered tiny crosses */}
      <g opacity="0.07" stroke="#ffffff" strokeWidth="0.5">
        <line x1="12%" y1="18%" x2="12.3%" y2="18%" />
        <line x1="12.15%" y1="17.7%" x2="12.15%" y2="18.3%" />
        <line x1="88%" y1="22%" x2="88.3%" y2="22%" />
        <line x1="88.15%" y1="21.7%" x2="88.15%" y2="22.3%" />
        <line x1="15%" y1="78%" x2="15.3%" y2="78%" />
        <line x1="15.15%" y1="77.7%" x2="15.15%" y2="78.3%" />
        <line x1="85%" y1="82%" x2="85.3%" y2="82%" />
        <line x1="85.15%" y1="81.7%" x2="85.15%" y2="82.3%" />
        <line x1="50%" y1="12%" x2="50.3%" y2="12%" />
        <line x1="50.15%" y1="11.7%" x2="50.15%" y2="12.3%" />
        <line x1="75%" y1="88%" x2="75.3%" y2="88%" />
        <line x1="75.15%" y1="87.7%" x2="75.15%" y2="88.3%" />
      </g>

      {/* Wireframe squares top-right area */}
      <g opacity="0.06" stroke="#ffffff" strokeWidth="0.5" fill="none">
        <rect x="80%" y="15%" width="40" height="40" />
        <rect x="81.5%" y="16.5%" width="25" height="25" />
      </g>

      {/* Wireframe squares bottom-left area */}
      <g opacity="0.05" stroke="#ffffff" strokeWidth="0.5" fill="none">
        <rect x="8%" y="75%" width="50" height="50" />
        <rect x="9.5%" y="76.5%" width="30" height="30" />
      </g>

      {/* Technical dots scattered */}
      <g fill="rgba(255,255,255,0.1)">
        <circle cx="20%" cy="30%" r="1.5" />
        <circle cx="78%" cy="25%" r="1" />
        <circle cx="25%" cy="72%" r="1" />
        <circle cx="82%" cy="70%" r="1.5" />
        <circle cx="45%" cy="15%" r="1" />
        <circle cx="55%" cy="85%" r="1" />
        <circle cx="10%" cy="50%" r="1" />
        <circle cx="90%" cy="45%" r="1" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   LAYER 7 SVG Waves
   ═══════════════════════════════════════════════════════ */
function SVGWaves() {
  return (
    <>
      {/* Wave 1 lower third */}
      <svg
        className="absolute w-full pointer-events-none svg-wave-1"
        style={{ zIndex: 7, bottom: "28%", opacity: 0.06 }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
        />
        <path
          d="M0,65 C200,30 400,95 720,55 C1040,15 1240,90 1440,65"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Wave 2 upper area */}
      <svg
        className="absolute w-full pointer-events-none svg-wave-2"
        style={{ zIndex: 7, top: "22%", opacity: 0.05 }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
        />
        <path
          d="M0,75 C180,50 540,95 900,55 C1100,35 1300,85 1440,75"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.5"
        />
      </svg>
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   LAYER 8 Floating Geometric Shapes
   ═══════════════════════════════════════════════════════ */
function FloatingShapes() {
  const shapes = useMemo(
    () => [
      {
        type: "square",
        x: "8%",
        y: "20%",
        size: 14,
        anim: "float-drift-1",
        dur: "18s",
        delay: "0s",
      },
      {
        type: "diamond",
        x: "92%",
        y: "25%",
        size: 10,
        anim: "float-drift-2",
        dur: "20s",
        delay: "2s",
      },
      {
        type: "cross",
        x: "15%",
        y: "75%",
        size: 12,
        anim: "float-drift-3",
        dur: "22s",
        delay: "1s",
      },
      {
        type: "hexagon",
        x: "85%",
        y: "70%",
        size: 11,
        anim: "float-drift-1",
        dur: "19s",
        delay: "3s",
      },
      {
        type: "square",
        x: "70%",
        y: "15%",
        size: 9,
        anim: "float-drift-2",
        dur: "21s",
        delay: "0.5s",
      },
      {
        type: "cross",
        x: "30%",
        y: "85%",
        size: 10,
        anim: "float-drift-3",
        dur: "17s",
        delay: "2.5s",
      },
      {
        type: "diamond",
        x: "50%",
        y: "10%",
        size: 8,
        anim: "float-drift-1",
        dur: "23s",
        delay: "1.5s",
      },
      {
        type: "hexagon",
        x: "60%",
        y: "88%",
        size: 12,
        anim: "float-drift-2",
        dur: "20s",
        delay: "4s",
      },
      {
        type: "square",
        x: "42%",
        y: "92%",
        size: 10,
        anim: "float-drift-3",
        dur: "16s",
        delay: "0.8s",
      },
      {
        type: "cross",
        x: "95%",
        y: "50%",
        size: 9,
        anim: "float-drift-1",
        dur: "24s",
        delay: "3.5s",
      },
      {
        type: "diamond",
        x: "5%",
        y: "55%",
        size: 11,
        anim: "float-drift-2",
        dur: "18s",
        delay: "2.2s",
      },
      {
        type: "hexagon",
        x: "35%",
        y: "12%",
        size: 8,
        anim: "float-drift-3",
        dur: "22s",
        delay: "1.2s",
      },
    ],
    [],
  );

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 8 }}
      aria-hidden="true"
    >
      {shapes.map((s, i) => {
        const style: React.CSSProperties = {
          position: "absolute",
          left: s.x,
          top: s.y,
          animation: `${s.anim} ${s.dur} ease-in-out infinite`,
          animationDelay: s.delay,
        };

        if (s.type === "square") {
          return (
            <rect
              key={i}
              x={-s.size / 2}
              y={-s.size / 2}
              width={s.size}
              height={s.size}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
              style={style}
            />
          );
        }
        if (s.type === "diamond") {
          const h = s.size * 0.7;
          return (
            <polygon
              key={i}
              points={`0,${-h / 2} ${s.size / 2},0 0,${h / 2} ${-s.size / 2},0`}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.5"
              style={style}
            />
          );
        }
        if (s.type === "cross") {
          const c = s.size / 2;
          return (
            <g key={i} style={style}>
              <line
                x1={-c}
                y1={0}
                x2={c}
                y2={0}
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="0.5"
              />
              <line
                x1={0}
                y1={-c}
                x2={0}
                y2={c}
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="0.5"
              />
            </g>
          );
        }
        /* hexagon */
        const r = s.size / 2;
        const pts = Array.from({ length: 6 }, (_, j) => {
          const angle = (Math.PI / 3) * j - Math.PI / 6;
          return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
        }).join(" ");
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
            style={style}
          />
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   LAYER 9 Cursor Spotlight
   ═══════════════════════════════════════════════════════ */
function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !spotlight) return;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.left = `${x}px`;
      spotlight.style.top = `${y}px`;
    };

    container.addEventListener("mousemove", onMove, { passive: true });
    return () => container.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 9 }}
    >
      <div
        ref={spotlightRef}
        className="cursor-spotlight"
        style={{ left: "-999px", top: "-999px" }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN HeroBackground (composes all 10 layers)
   ═══════════════════════════════════════════════════════ */
export default function HeroBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Aurora band (CSS-only) */}
      <div className="aurora-band" />

      {/* Blueprint decorations */}
      <BlueprintDecorations />

      {/* SVG waves */}
      <SVGWaves />

      {/* Floating geometric shapes */}
      <FloatingShapes />

      {/* Cursor spotlight */}
      <CursorSpotlight />

      {/* Depth: vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 10,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.6) 100%)",
        }}
      />
    </div>
  );
}
