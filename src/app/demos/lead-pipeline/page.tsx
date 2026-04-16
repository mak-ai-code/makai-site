"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const KPIS = [
  { label: "Spend (30d)", value: 4200, delta: "$0.83 CPC", prefix: "$" },
  { label: "Booked Calls", value: 84, delta: "+22%", prefix: "" },
  { label: "Cost / Booked Call", value: 50, delta: "−14%", prefix: "$" },
  { label: "Show-Up Rate", value: 71, delta: "+6 pts", prefix: "", suffix: "%" },
];

type Stage = {
  key: string;
  label: string;
  count: number;
  cost: number;
  channel: string;
  blurb: string;
  dot: string;
};

const STAGES: Stage[] = [
  { key: "ad", label: "Ad Impression", count: 38400, cost: 0, channel: "Meta · Google", blurb: "Targeted creative shown to in-market audiences", dot: "bg-cyan-400" },
  { key: "click", label: "Landing Page Visit", count: 1920, cost: 2.18, channel: "Next.js page", blurb: "High-intent visitors land on the offer page", dot: "bg-cyan-400" },
  { key: "form", label: "Form / Call Start", count: 412, cost: 10.19, channel: "Form · Voice agent", blurb: "Lead opts in or starts a conversation with the AI", dot: "bg-purple-400" },
  { key: "qualified", label: "AI Qualified", count: 188, cost: 22.34, channel: "GPT-4o + rules", blurb: "Agent screens budget, fit, urgency in seconds", dot: "bg-purple-400" },
  { key: "booked", label: "Booked Call", count: 84, cost: 50.0, channel: "Calendar sync", blurb: "Slot confirmed and pushed to founder's calendar", dot: "bg-emerald-400" },
  { key: "showed", label: "Showed Up", count: 60, cost: 70.0, channel: "Reminders · SMS", blurb: "Drip + reminders cut no-shows by ~30%", dot: "bg-emerald-400" },
];

const FEED = [
  { name: "Sarah M.", source: "Meta · Reel #4", stage: "Booked Call", time: "just now", value: "$8k pkg" },
  { name: "James T.", source: "Google · brand", stage: "AI Qualified", time: "3 min ago", value: "$12k pkg" },
  { name: "Megan L.", source: "Meta · Carousel", stage: "Form Start", time: "8 min ago", value: "—" },
  { name: "Chris D.", source: "Meta · Reel #2", stage: "Showed Up", time: "1 hr ago", value: "$6k pkg" },
  { name: "Amanda P.", source: "Google · long-tail", stage: "Booked Call", time: "2 hr ago", value: "$15k pkg" },
];

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

export default function LeadPipelineDemo() {
  const top = STAGES[0].count;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-[family-name:var(--font-inter)]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm text-[#a3a3a3] hover:text-white">
            <Back /> Back to MakAI
          </Link>
          <div className="hidden h-5 w-px bg-[#2a2a2a] sm:block" />
          <div className="hidden items-center gap-3 sm:flex">
            <span className="font-[family-name:var(--font-space)] text-lg font-bold tracking-tight">MakAI Pipeline</span>
            <span className="text-sm text-[#a3a3a3]">/ Lead Systems</span>
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
            Pipeline live
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {KPIS.map((k, i) => (
            <KpiCard key={k.label} kpi={k} delay={i * 0.06} />
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
        >
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Funnel</h2>
            <p className="mt-1 text-xs text-[#a3a3a3]">last 30 days · ad → showed up</p>
          </div>
          <div className="space-y-3">
            {STAGES.map((s, i) => {
              const widthPct = Math.max(8, (s.count / top) * 100);
              const prev = STAGES[i - 1];
              const conv = prev ? Math.round((s.count / prev.count) * 100) : 100;
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-4"
                >
                  <div className="hidden w-32 shrink-0 sm:block">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#a3a3a3]">{s.label}</p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">{s.channel}</p>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPct}%` }}
                        transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className="flex h-12 items-center justify-between rounded-md border border-[#2a2a2a] bg-gradient-to-r from-cyan-500/15 to-cyan-500/5 px-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                          <span className="text-sm font-medium">{s.count.toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                          {prev ? `${conv}% from above` : "100%"}
                        </span>
                      </motion.div>
                    </div>
                    <p className="mt-1 text-xs text-[#a3a3a3]">{s.blurb}</p>
                  </div>
                  <div className="hidden w-24 shrink-0 text-right sm:block">
                    <p className="font-mono text-sm">{s.cost === 0 ? "—" : `$${s.cost.toFixed(2)}`}</p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#666]">cost / lead</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Live Lead Feed</h2>
            <span className="text-xs text-[#a3a3a3]">last 2 hours</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a2a] text-left text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                  <th className="px-2 py-2 font-medium">Lead</th>
                  <th className="px-2 py-2 font-medium">Source</th>
                  <th className="px-2 py-2 font-medium">Stage</th>
                  <th className="px-2 py-2 font-medium">Est. value</th>
                  <th className="px-2 py-2 font-medium text-right">When</th>
                </tr>
              </thead>
              <tbody>
                {FEED.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                    className="border-b border-[#1a1a1a] last:border-0"
                  >
                    <td className="px-2 py-2.5">{row.name}</td>
                    <td className="px-2 py-2.5 text-[#a3a3a3]">{row.source}</td>
                    <td className="px-2 py-2.5">
                      <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 text-[11px] text-cyan-300">
                        {row.stage}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 font-mono text-emerald-400">{row.value}</td>
                    <td className="px-2 py-2.5 text-right text-xs text-[#666]">{row.time}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-[#555]">
          Preview of MakAI Pipeline · ads in, booked calls out
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
