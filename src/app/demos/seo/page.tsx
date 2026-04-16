"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const KPIS = [
  { label: "Organic Visits (30d)", value: 14820, delta: "+38%", prefix: "" },
  { label: "Keywords Ranking", value: 412, delta: "+47", prefix: "" },
  { label: "Top-3 Positions", value: 38, delta: "+12", prefix: "" },
  { label: "Health Score", value: 94, delta: "+6", prefix: "", suffix: "/100" },
];

type Keyword = {
  term: string;
  position: number;
  prev: number;
  volume: number;
  intent: "Commercial" | "Informational" | "Transactional";
};

const KEYWORDS: Keyword[] = [
  { term: "ai voice agent for med spa", position: 2, prev: 6, volume: 1900, intent: "Commercial" },
  { term: "automated lead qualification", position: 4, prev: 9, volume: 2400, intent: "Commercial" },
  { term: "ai answering service for clinics", position: 7, prev: 14, volume: 1100, intent: "Commercial" },
  { term: "what is a voice agent", position: 3, prev: 5, volume: 4400, intent: "Informational" },
  { term: "best ai automation agency", position: 1, prev: 3, volume: 880, intent: "Commercial" },
  { term: "vapi vs retell ai", position: 5, prev: 11, volume: 720, intent: "Informational" },
  { term: "build a custom crm", position: 9, prev: 7, volume: 1300, intent: "Transactional" },
  { term: "missed call text back software", position: 6, prev: 10, volume: 2900, intent: "Commercial" },
];

const TRAFFIC = [
  { d: "Wk 1", v: 2100 },
  { d: "Wk 2", v: 2480 },
  { d: "Wk 3", v: 2920 },
  { d: "Wk 4", v: 3680 },
  { d: "Wk 5", v: 4120 },
  { d: "Wk 6", v: 4840 },
  { d: "Wk 7", v: 5210 },
  { d: "Wk 8", v: 5980 },
];

const CLUSTERS = [
  { topic: "AI Voice Agents", articles: 12, traffic: 4820, dot: "bg-cyan-400" },
  { topic: "Automation Playbooks", articles: 9, traffic: 3120, dot: "bg-purple-400" },
  { topic: "Lead Systems", articles: 7, traffic: 2640, dot: "bg-emerald-400" },
  { topic: "Custom CRM Builds", articles: 5, traffic: 1480, dot: "bg-amber-400" },
  { topic: "Founder Stories", articles: 4, traffic: 980, dot: "bg-rose-400" },
];

const HEALTH = [
  { label: "Crawl errors", value: "0", ok: true },
  { label: "Mobile usability", value: "100%", ok: true },
  { label: "Core Web Vitals", value: "Pass", ok: true },
  { label: "Indexed pages", value: "162 / 164", ok: true },
];

const INTENT_STYLES: Record<Keyword["intent"], string> = {
  Commercial: "bg-cyan-500/15 text-cyan-300",
  Informational: "bg-purple-500/15 text-purple-300",
  Transactional: "bg-emerald-500/15 text-emerald-300",
};

function useCounter(target: number) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const steps = 40;
    const inc = target / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setV(Math.min(Math.round(inc * step), target));
      if (step >= steps) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return v;
}

function Back() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SeoDemo() {
  const max = Math.max(...TRAFFIC.map((d) => d.v));
  const points = TRAFFIC.map((d, i) => {
    const x = (i / (TRAFFIC.length - 1)) * 100;
    const y = 100 - (d.v / max) * 90;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-[family-name:var(--font-inter)]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm text-[#a3a3a3] hover:text-white">
            <Back /> Back to MakAI
          </Link>
          <div className="hidden h-5 w-px bg-[#2a2a2a] sm:block" />
          <div className="hidden items-center gap-3 sm:flex">
            <span className="font-[family-name:var(--font-space)] text-lg font-bold tracking-tight">MakAI SEO</span>
            <span className="text-sm text-[#a3a3a3]">/ Organic Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full border border-[#2a2a2a] px-2.5 py-1 uppercase tracking-[0.18em] text-[#a3a3a3]">
            Preview
          </span>
          <div className="flex items-center gap-1.5 text-[#a3a3a3]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Crawl healthy
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {KPIS.map((k, i) => (
            <KpiCard key={k.label} kpi={k} delay={i * 0.06} />
          ))}
        </div>

        {/* Traffic chart */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Organic Traffic</h2>
              <p className="mt-1 text-xs text-[#a3a3a3]">8-week trend · weekly visits</p>
            </div>
            <span className="text-xs text-emerald-400">+184% over period</span>
          </div>
          <div className="relative h-44">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="seo-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.polygon
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                points={`0,100 ${points} 100,100`}
                fill="url(#seo-fill)"
              />
              <motion.polyline
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                points={points}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-[#666]">
            {TRAFFIC.map((d) => (
              <span key={d.d}>{d.d}</span>
            ))}
          </div>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Keywords */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">Keyword Movement</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a] text-left text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                    <th className="px-2 py-2 font-medium">Keyword</th>
                    <th className="px-2 py-2 font-medium">Intent</th>
                    <th className="px-2 py-2 font-medium text-right">Position</th>
                    <th className="px-2 py-2 font-medium text-right">Δ</th>
                    <th className="px-2 py-2 font-medium text-right">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {KEYWORDS.map((k, i) => {
                    const delta = k.prev - k.position;
                    const up = delta > 0;
                    return (
                      <motion.tr
                        key={k.term}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.04 * i }}
                        className="border-b border-[#1a1a1a] last:border-0 hover:bg-[#161616]"
                      >
                        <td className="px-2 py-2.5">{k.term}</td>
                        <td className="px-2 py-2.5">
                          <span className={`rounded px-1.5 py-0.5 text-[11px] uppercase tracking-[0.12em] ${INTENT_STYLES[k.intent]}`}>
                            {k.intent}
                          </span>
                        </td>
                        <td className="px-2 py-2.5 text-right font-mono">#{k.position}</td>
                        <td className={`px-2 py-2.5 text-right font-mono ${up ? "text-emerald-400" : delta < 0 ? "text-rose-400" : "text-[#666]"}`}>
                          {delta === 0 ? "—" : up ? `+${delta}` : delta}
                        </td>
                        <td className="px-2 py-2.5 text-right text-[#a3a3a3]">{k.volume.toLocaleString()}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Right column */}
          <div className="space-y-6">
            {/* Content clusters */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">Content Clusters</h2>
              <ul className="space-y-3">
                {CLUSTERS.map((c, i) => (
                  <motion.li
                    key={c.topic}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                        {c.topic}
                      </span>
                      <span className="font-mono text-[#a3a3a3]">{c.traffic.toLocaleString()}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">
                      {c.articles} articles
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Health */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">Tech Health</h2>
              <ul className="space-y-2.5 text-sm">
                {HEALTH.map((h) => (
                  <li key={h.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[#cfcfcf]">
                      <span className={`h-1.5 w-1.5 rounded-full ${h.ok ? "bg-emerald-400" : "bg-rose-400"}`} />
                      {h.label}
                    </span>
                    <span className="font-mono text-[#e5e5e5]">{h.value}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-[#555]">
          Preview of MakAI SEO · ranking the right intents on autopilot
        </p>
      </main>
    </div>
  );
}

function KpiCard({
  kpi,
  delay,
}: {
  kpi: { label: string; value: number; delta: string; prefix: string; suffix?: string };
  delay: number;
}) {
  const v = useCounter(kpi.value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-lg border border-[#2a2a2a] bg-[#141414] p-4"
    >
      <p className="mb-1 text-xs uppercase tracking-widest text-[#a3a3a3]">{kpi.label}</p>
      <div className="flex items-end justify-between">
        <span className="font-mono text-2xl font-semibold tracking-tight text-white">
          {kpi.prefix}
          {v.toLocaleString()}
          {kpi.suffix}
        </span>
        <span className="text-xs text-emerald-400">{kpi.delta}</span>
      </div>
    </motion.div>
  );
}
