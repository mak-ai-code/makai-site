"use client";
import { motion } from "framer-motion";

/**
 * One animated monochrome SVG diagram per service.
 * Each loops forever — hover-agnostic so clients see the capability on scroll.
 */

export function VoiceAgentViz() {
  // Concentric pulsing rings + oscillating bars (voice waveform)
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="va-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5f5f5" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f5f5f5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#va-g)" />
      {[30, 50, 70].map((r, i) => (
        <motion.circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="#f5f5f5"
          strokeOpacity="0.3"
          strokeWidth="1"
          animate={{ r: [r, r + 8, r], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
      {Array.from({ length: 11 }).map((_, i) => {
        const x = 60 + i * 8;
        return (
          <motion.rect
            key={i}
            x={x}
            y="95"
            width="2"
            height="10"
            fill="#f5f5f5"
            animate={{
              height: [6, 24, 10, 30, 8],
              y: [97, 88, 95, 85, 96],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </svg>
  );
}

export function AutomationViz() {
  // Nodes + flowing lines (data pipeline)
  const nodes = [
    { x: 30, y: 50 },
    { x: 90, y: 30 },
    { x: 90, y: 70 },
    { x: 150, y: 30 },
    { x: 150, y: 70 },
    { x: 170, y: 100 },
  ];
  return (
    <svg viewBox="0 0 200 130" className="w-full h-full" aria-hidden>
      {/* connecting lines */}
      {[
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 5],
        [4, 5],
      ].map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#f5f5f5"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* traveling dots */}
      {[
        [0, 1],
        [1, 3],
        [2, 4],
        [4, 5],
      ].map(([a, b], i) => (
        <motion.circle
          key={i}
          r="2.5"
          fill="#f5f5f5"
          animate={{
            cx: [nodes[a].x, nodes[b].x],
            cy: [nodes[a].y, nodes[b].y],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="6" fill="#0a0a0a" stroke="#f5f5f5" strokeWidth="1" />
          <circle cx={n.x} cy={n.y} r="2" fill="#f5f5f5" />
        </g>
      ))}
    </svg>
  );
}

export function BrainViz() {
  // Rotating rings + spinning core (custom AI)
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <ellipse cx="100" cy="100" rx="70" ry="28" fill="none" stroke="#f5f5f5" strokeOpacity="0.4" />
      </motion.g>
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="70"
          ry="28"
          fill="none"
          stroke="#f5f5f5"
          strokeOpacity="0.3"
          transform="rotate(60 100 100)"
        />
      </motion.g>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 100px" }}
      >
        <ellipse
          cx="100"
          cy="100"
          rx="70"
          ry="28"
          fill="none"
          stroke="#f5f5f5"
          strokeOpacity="0.3"
          transform="rotate(120 100 100)"
        />
      </motion.g>
      {/* core */}
      <motion.circle
        cx="100"
        cy="100"
        r="16"
        fill="#f5f5f5"
        animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 100px" }}
      />
      <circle cx="100" cy="100" r="8" fill="#0a0a0a" />
    </svg>
  );
}

export function LeadFunnelViz() {
  // Funnel filling with particles
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" aria-hidden>
      <path
        d="M20 20 L180 20 L120 90 L120 140 L80 140 L80 90 Z"
        fill="none"
        stroke="#f5f5f5"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      {/* particles falling through */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.circle
          key={i}
          r="2"
          fill="#f5f5f5"
          animate={{
            cy: [10, 140],
            cx: [30 + (i * 20) % 140, 100],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeIn",
          }}
        />
      ))}
    </svg>
  );
}

export function AdsViz() {
  // Rising bar chart + arrow
  return (
    <svg viewBox="0 0 200 130" className="w-full h-full" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 30 + i * 28;
        const targetH = 20 + i * 18;
        return (
          <motion.rect
            key={i}
            x={x}
            y={120 - targetH}
            width="16"
            height={targetH}
            fill="#f5f5f5"
            fillOpacity="0.85"
            animate={{
              height: [targetH * 0.4, targetH, targetH * 0.7, targetH],
              y: [
                120 - targetH * 0.4,
                120 - targetH,
                120 - targetH * 0.7,
                120 - targetH,
              ],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        );
      })}
      {/* trend arrow */}
      <motion.path
        d="M30 100 L70 80 L110 60 L150 40 L175 25"
        fill="none"
        stroke="#f5f5f5"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.polygon
        points="175,25 168,28 172,34"
        fill="#f5f5f5"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function SeoViz() {
  // Search ranking bars climbing + magnifier
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.g key={i}>
          <motion.rect
            x="40"
            y={30 + (i - 1) * 20}
            width="120"
            height="6"
            fill="#f5f5f5"
            fillOpacity={i === 1 ? 0.9 : 0.2}
            animate={{
              width: i === 1 ? [40, 120, 40] : 120,
              fillOpacity: i === 1 ? [0.2, 0.9, 0.2] : 0.2,
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x="28" y={36 + (i - 1) * 20} fontSize="8" fill="#a3a3a3" fontFamily="monospace">
            {i}
          </text>
        </motion.g>
      ))}
      {/* magnifier */}
      <motion.g
        animate={{ x: [0, 20, 0], y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="150" cy="120" r="14" fill="none" stroke="#f5f5f5" strokeWidth="1.5" />
        <line x1="160" y1="130" x2="172" y2="142" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

export function SoftwareViz() {
  // Browser window with code lines being written
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" aria-hidden>
      {/* browser frame */}
      <rect x="20" y="15" width="160" height="130" rx="4" fill="none" stroke="#f5f5f5" strokeOpacity="0.4" strokeWidth="1" />
      {/* title bar */}
      <line x1="20" y1="32" x2="180" y2="32" stroke="#f5f5f5" strokeOpacity="0.3" />
      <circle cx="32" cy="24" r="2" fill="#f5f5f5" fillOpacity="0.3" />
      <circle cx="40" cy="24" r="2" fill="#f5f5f5" fillOpacity="0.3" />
      <circle cx="48" cy="24" r="2" fill="#f5f5f5" fillOpacity="0.3" />
      {/* sidebar */}
      <line x1="55" y1="32" x2="55" y2="145" stroke="#f5f5f5" strokeOpacity="0.15" />
      {/* sidebar items */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`sb${i}`} x="26" y={40 + i * 14} width="22" height="4" rx="1" fill="#f5f5f5" fillOpacity={i === 0 ? 0.5 : 0.15} />
      ))}
      {/* code lines typing in */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const indent = [0, 1, 2, 2, 1, 2, 0][i];
        const width = [80, 60, 45, 70, 30, 55, 50][i];
        return (
          <motion.rect
            key={`cl${i}`}
            x={64 + indent * 10}
            y={42 + i * 13}
            width={width}
            height="4"
            rx="1"
            fill="#f5f5f5"
            fillOpacity="0.7"
            initial={{ width: 0 }}
            animate={{ width: [0, width, width, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          />
        );
      })}
      {/* cursor blink */}
      <motion.rect
        x="64"
        y="133"
        width="6"
        height="8"
        fill="#f5f5f5"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

export const serviceVisuals = {
  "01": VoiceAgentViz,
  "02": AutomationViz,
  "03": BrainViz,
  "04": LeadFunnelViz,
  "05": AdsViz,
  "06": SeoViz,
  "07": SoftwareViz,
} as const;
