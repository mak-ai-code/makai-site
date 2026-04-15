"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const KPIS = [
  { label: "Pipeline Value", value: 184500, delta: "+12%", prefix: "$" },
  { label: "Closed This Month", value: 42000, delta: "+28%", prefix: "$" },
  { label: "Activities / Day", value: 87, delta: "+14%", prefix: "" },
  { label: "Win Rate", value: 34, delta: "+4 pts", prefix: "", suffix: "%" },
];

type Rep = {
  id: string;
  name: string;
  initials: string;
  closed: number;
  activities: number;
  pipeline: number;
};

const REPS: Rep[] = [
  { id: "r1", name: "Alex Moreno", initials: "AM", closed: 18400, activities: 142, pipeline: 62000 },
  { id: "r2", name: "Jordan Patel", initials: "JP", closed: 12800, activities: 118, pipeline: 48000 },
  { id: "r3", name: "Riley Chen", initials: "RC", closed: 6400, activities: 94, pipeline: 31500 },
  { id: "r4", name: "Sam Okafor", initials: "SO", closed: 4400, activities: 71, pipeline: 43000 },
];

type Card = {
  id: string;
  company: string;
  contact: string;
  value: number;
  rep: string;
  age: string;
  tag?: string;
  tagColor?: string;
};

const PIPELINE: { title: string; subtitle: string; cards: Card[] }[] = [
  {
    title: "Prospecting",
    subtitle: "6 · $48k",
    cards: [
      { id: "p1", company: "Elite Home Services", contact: "Kevin S.", value: 8400, rep: "AM", age: "2 days", tag: "Inbound", tagColor: "bg-cyan-500/15 text-cyan-300" },
      { id: "p2", company: "Naples Pool Co.", contact: "Maya R.", value: 12000, rep: "JP", age: "4 days", tag: "Ads", tagColor: "bg-purple-500/15 text-purple-300" },
      { id: "p3", company: "Ocean View Dental", contact: "Dr. Lee", value: 6200, rep: "RC", age: "1 day", tag: "Referral", tagColor: "bg-amber-500/15 text-amber-300" },
    ],
  },
  {
    title: "Qualified",
    subtitle: "4 · $42k",
    cards: [
      { id: "q1", company: "Blue Water Roofing", contact: "Travis D.", value: 14000, rep: "AM", age: "6 days", tag: "Warm", tagColor: "bg-emerald-500/15 text-emerald-300" },
      { id: "q2", company: "Copper + Ivy Spa", contact: "Selena M.", value: 9800, rep: "JP", age: "3 days" },
      { id: "q3", company: "Palm Pros Pool", contact: "Omar B.", value: 7500, rep: "SO", age: "5 days" },
    ],
  },
  {
    title: "Proposal",
    subtitle: "3 · $54k",
    cards: [
      { id: "pr1", company: "South FL Hair Studio", contact: "Morgan L.", value: 18000, rep: "AM", age: "9 days", tag: "Hot", tagColor: "bg-rose-500/15 text-rose-300" },
      { id: "pr2", company: "IVMD Naples", contact: "Dr. R.", value: 22000, rep: "JP", age: "11 days", tag: "Upsell", tagColor: "bg-cyan-500/15 text-cyan-300" },
    ],
  },
  {
    title: "Negotiation",
    subtitle: "2 · $28k",
    cards: [
      { id: "n1", company: "Frazier's Aircraft", contact: "Will F.", value: 16500, rep: "AM", age: "14 days", tag: "Closing", tagColor: "bg-amber-500/15 text-amber-300" },
      { id: "n2", company: "Lux Interiors", contact: "Priya N.", value: 11500, rep: "RC", age: "8 days" },
    ],
  },
  {
    title: "Closed Won",
    subtitle: "5 · $42k",
    cards: [
      { id: "w1", company: "IVMD Naples", contact: "Dr. R.", value: 14000, rep: "AM", age: "This month" },
      { id: "w2", company: "Blue Water Roofing", contact: "Travis D.", value: 12000, rep: "JP", age: "This month" },
      { id: "w3", company: "Copper + Ivy Spa", contact: "Selena M.", value: 6400, rep: "JP", age: "3 weeks ago" },
    ],
  },
];

const ACTIVITY = [
  { text: "Alex closed Frazier's Aircraft — $16,500", time: "12 min ago", dot: "bg-emerald-400" },
  { text: "Jordan logged a call with Copper + Ivy Spa", time: "34 min ago", dot: "bg-cyan-400" },
  { text: "AI qualifier marked 4 leads Ready for Proposal", time: "1 hr ago", dot: "bg-purple-400" },
  { text: "Riley scheduled a demo with Ocean View Dental", time: "2 hr ago", dot: "bg-cyan-400" },
  { text: "Sam sent proposal — Palm Pros Pool ($7,500)", time: "3 hr ago", dot: "bg-amber-400" },
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

export default function MakAISalesPlatformDemo() {
  const [filter, setFilter] = useState<string | null>(null);

  const maxClosed = Math.max(...REPS.map((r) => r.closed));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-[family-name:var(--font-inter)]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm text-[#a3a3a3] hover:text-white">
            <Back /> Back to MakAI
          </Link>
          <div className="hidden h-5 w-px bg-[#2a2a2a] sm:block" />
          <div className="hidden items-center gap-3 sm:flex">
            <span className="font-[family-name:var(--font-space)] text-lg font-bold tracking-tight">MakAI Sales</span>
            <span className="text-sm text-[#a3a3a3]">/ Pipeline</span>
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
            System Online
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        {/* KPIs */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {KPIS.map((k, i) => (
            <KpiCard key={k.label} kpi={k} delay={i * 0.06} />
          ))}
        </div>

        {/* Rep leaderboard */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Rep Leaderboard</h2>
              <p className="mt-1 text-xs text-[#a3a3a3]">this month · click to filter pipeline</p>
            </div>
            {filter && (
              <button
                onClick={() => setFilter(null)}
                className="rounded-md border border-[#2a2a2a] px-3 py-1 text-xs text-[#a3a3a3] hover:border-[#555] hover:text-white"
              >
                Clear filter
              </button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REPS.map((r, i) => {
              const pct = Math.round((r.closed / maxClosed) * 100);
              const isActive = filter === r.initials;
              return (
                <motion.button
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  onClick={() => setFilter(isActive ? null : r.initials)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    isActive
                      ? "border-cyan-500/40 bg-cyan-500/5"
                      : "border-[#2a2a2a] bg-[#141414] hover:border-[#3a3a3a]"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 text-xs font-semibold">
                      {r.initials}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                        Rank #{i + 1}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[#a3a3a3]">
                      <span>Closed</span>
                      <span className="font-mono text-emerald-400">
                        ${r.closed.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-[#1e1e1e]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                        className="h-full bg-cyan-400"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[#a3a3a3]">
                      <span>Activities</span>
                      <span>{r.activities}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#a3a3a3]">
                      <span>Pipeline</span>
                      <span className="font-mono">${r.pipeline.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Pipeline + activity */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Pipeline</h2>
              <span className="text-xs text-[#a3a3a3]">
                {filter ? `Filtered: ${filter}` : "All reps"}
              </span>
            </div>
            <div className="grid auto-cols-[minmax(240px,1fr)] grid-flow-col gap-3 overflow-x-auto pb-2">
              {PIPELINE.map((col) => {
                const visible = filter
                  ? col.cards.filter((c) => c.rep === filter)
                  : col.cards;
                return (
                  <div key={col.title} className="min-w-[240px]">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em]">
                        {col.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                        {col.subtitle}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {visible.length === 0 && (
                        <div className="rounded-md border border-dashed border-[#2a2a2a] p-3 text-center text-xs text-[#555]">
                          No cards
                        </div>
                      )}
                      {visible.map((card, i) => (
                        <motion.div
                          key={card.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.04 }}
                          className="rounded-md border border-[#2a2a2a] bg-[#161616] p-3 hover:border-[#3a3a3a]"
                        >
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-snug">{card.company}</p>
                            <span className="shrink-0 text-[11px] font-mono text-emerald-400">
                              ${card.value.toLocaleString()}
                            </span>
                          </div>
                          <p className="mb-3 text-xs text-[#a3a3a3]">{card.contact}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 text-[9px] font-semibold">
                                {card.rep}
                              </span>
                              <span className="text-[10px] uppercase tracking-[0.18em] text-[#666]">
                                {card.age}
                              </span>
                            </div>
                            {card.tag && (
                              <span className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] ${card.tagColor}`}>
                                {card.tag}
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Activity feed */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">
              Team Activity
            </h2>
            <ul className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
                  <div className="flex-1">
                    <p className="text-[#e5e5e5]">{a.text}</p>
                    <p className="text-xs text-[#666]">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-[#555]">
          Preview of MakAI Sales · pipelines, reps, and outcomes in one place
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
