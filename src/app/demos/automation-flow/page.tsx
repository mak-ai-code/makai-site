"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { label: "Runs Today", value: 1284, delta: "+18%", prefix: "" },
  { label: "Time Saved", value: 47, delta: "hrs · this week", prefix: "" },
  { label: "Success Rate", value: 99, delta: "+0.4 pts", prefix: "", suffix: "%" },
  { label: "Active Flows", value: 12, delta: "2 paused", prefix: "" },
];

type Node = {
  id: string;
  label: string;
  sub: string;
  kind: "trigger" | "filter" | "ai" | "action";
  x: number;
  y: number;
};

const NODES: Node[] = [
  { id: "n1", label: "New form submission", sub: "Webhook", kind: "trigger", x: 4, y: 28 },
  { id: "n2", label: "Filter: deal size > $5k", sub: "Condition", kind: "filter", x: 26, y: 28 },
  { id: "n3", label: "AI qualify lead", sub: "GPT-4o", kind: "ai", x: 48, y: 12 },
  { id: "n4", label: "Create CRM record", sub: "HubSpot", kind: "action", x: 70, y: 12 },
  { id: "n5", label: "Send intro SMS", sub: "Twilio", kind: "action", x: 70, y: 44 },
  { id: "n6", label: "Notify rep on Slack", sub: "Slack", kind: "action", x: 70, y: 76 },
];

const EDGES = [
  ["n1", "n2"],
  ["n2", "n3"],
  ["n2", "n5"],
  ["n2", "n6"],
  ["n3", "n4"],
];

const RUNS = [
  { id: "run-8412", flow: "Lead intake → CRM", duration: "1.2s", status: "ok", time: "just now" },
  { id: "run-8411", flow: "Missed call → SMS follow-up", duration: "0.8s", status: "ok", time: "1 min ago" },
  { id: "run-8410", flow: "Booked call → confirmation", duration: "0.6s", status: "ok", time: "2 min ago" },
  { id: "run-8409", flow: "Stripe payment → invoice email", duration: "1.4s", status: "ok", time: "4 min ago" },
  { id: "run-8408", flow: "Lead intake → CRM", duration: "1.1s", status: "ok", time: "6 min ago" },
  { id: "run-8407", flow: "Form submit → Slack ping", duration: "0.4s", status: "ok", time: "8 min ago" },
];

const INTEGRATIONS = [
  "HubSpot", "Gmail", "Twilio", "Slack", "Stripe", "Calendly",
  "Airtable", "Notion", "GPT-4o", "Zapier", "Webhook", "Vapi",
];

const KIND_STYLES: Record<Node["kind"], string> = {
  trigger: "border-cyan-500/40 bg-cyan-500/10 text-cyan-200",
  filter: "border-amber-500/40 bg-amber-500/10 text-amber-200",
  ai: "border-purple-500/40 bg-purple-500/10 text-purple-200",
  action: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
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

export default function AutomationFlowDemo() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => (p + 1) % EDGES.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-[family-name:var(--font-inter)]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm text-[#a3a3a3] hover:text-white">
            <Back /> Back to MakAI
          </Link>
          <div className="hidden h-5 w-px bg-[#2a2a2a] sm:block" />
          <div className="hidden items-center gap-3 sm:flex">
            <span className="font-[family-name:var(--font-space)] text-lg font-bold tracking-tight">MakAI Flow</span>
            <span className="text-sm text-[#a3a3a3]">/ Automations</span>
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
            12 flows live
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 0.06} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Canvas */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Lead Intake → CRM</h2>
                <p className="mt-1 text-xs text-[#a3a3a3]">live · firing every ~12s · 0 errors today</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Legend dot="bg-cyan-400" label="Trigger" />
                <Legend dot="bg-amber-400" label="Filter" />
                <Legend dot="bg-purple-400" label="AI" />
                <Legend dot="bg-emerald-400" label="Action" />
              </div>
            </div>

            <div className="relative h-[420px] overflow-hidden rounded-lg border border-[#1f1f1f] bg-[radial-gradient(ellipse_at_center,#101417_0%,#0a0a0a_70%)]">
              {/* grid bg */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* edges */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                {EDGES.map(([from, to], i) => {
                  const a = NODES.find((n) => n.id === from)!;
                  const b = NODES.find((n) => n.id === to)!;
                  const x1 = a.x + 9;
                  const y1 = a.y + 7;
                  const x2 = b.x;
                  const y2 = b.y + 7;
                  const isActive = pulse === i;
                  return (
                    <g key={`${from}-${to}`}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isActive ? "#22d3ee" : "#2a2a2a"}
                        strokeWidth={isActive ? 0.4 : 0.2}
                        vectorEffect="non-scaling-stroke"
                      />
                      {isActive && (
                        <motion.circle
                          r="0.7"
                          fill="#22d3ee"
                          initial={{ cx: x1, cy: y1 }}
                          animate={{ cx: x2, cy: y2 }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* nodes */}
              {NODES.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  className={`absolute rounded-lg border px-3 py-2 backdrop-blur-sm ${KIND_STYLES[n.kind]}`}
                  style={{ left: `${n.x}%`, top: `${n.y}%`, width: "18%" }}
                >
                  <p className="text-xs font-medium leading-tight">{n.label}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] opacity-70">{n.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Right column */}
          <div className="space-y-6">
            {/* Recent runs */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">Recent Runs</h2>
              <ul className="space-y-3">
                {RUNS.map((r, i) => (
                  <motion.li
                    key={r.id}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div className="flex-1">
                      <p className="text-[#e5e5e5]">{r.flow}</p>
                      <p className="text-xs text-[#666]">{r.id} · {r.duration} · {r.time}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Integrations */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">Connected</h2>
              <div className="flex flex-wrap gap-1.5">
                {INTEGRATIONS.map((i) => (
                  <span
                    key={i}
                    className="rounded-md border border-[#2a2a2a] bg-[#161616] px-2 py-1 text-[11px] text-[#cfcfcf]"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-[#555]">
          Preview of MakAI Flow · build it once, it runs forever
        </p>
      </main>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function StatCard({
  stat,
  delay,
}: {
  stat: { label: string; value: number; delta: string; prefix: string; suffix?: string };
  delay: number;
}) {
  const v = useCounter(stat.value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-lg border border-[#2a2a2a] bg-[#141414] p-4"
    >
      <p className="mb-1 text-xs uppercase tracking-widest text-[#a3a3a3]">{stat.label}</p>
      <div className="flex items-end justify-between">
        <span className="font-mono text-2xl font-semibold tracking-tight text-white">
          {stat.prefix}
          {v.toLocaleString()}
          {stat.suffix}
        </span>
        <span className="text-xs text-emerald-400">{stat.delta}</span>
      </div>
    </motion.div>
  );
}
