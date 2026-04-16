"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const KPIS = [
  { label: "Spend (7d)", value: 1240, delta: "−8%", prefix: "$" },
  { label: "Booked Calls", value: 28, delta: "+19%", prefix: "" },
  { label: "ROAS", value: 4.2, delta: "+0.7", prefix: "", suffix: "x" },
  { label: "CPM", value: 6.4, delta: "−$0.40", prefix: "$" },
];

type Campaign = {
  id: string;
  name: string;
  objective: string;
  status: "Active" | "Learning" | "Paused";
  spend: number;
  results: number;
  cpr: number;
  roas: number;
};

const CAMPAIGNS: Campaign[] = [
  { id: "c1", name: "FL Med Spa · Lead Gen v3", objective: "Leads", status: "Active", spend: 482, results: 18, cpr: 26.78, roas: 5.4 },
  { id: "c2", name: "Roofing — Storm Season", objective: "Conversions", status: "Active", spend: 318, results: 9, cpr: 35.33, roas: 3.8 },
  { id: "c3", name: "IVMD — Naples Lookalikes", objective: "Leads", status: "Learning", spend: 214, results: 6, cpr: 35.67, roas: 4.1 },
  { id: "c4", name: "Salon Retargeting", objective: "Traffic", status: "Active", spend: 142, results: 41, cpr: 3.46, roas: 2.9 },
  { id: "c5", name: "Aircraft Cleaning · Awareness", objective: "Reach", status: "Paused", spend: 84, results: 0, cpr: 0, roas: 0 },
];

const CHART = [
  { d: "Mon", spend: 142, conv: 4 },
  { d: "Tue", spend: 168, conv: 5 },
  { d: "Wed", spend: 192, conv: 3 },
  { d: "Thu", spend: 174, conv: 6 },
  { d: "Fri", spend: 218, conv: 7 },
  { d: "Sat", spend: 184, conv: 2 },
  { d: "Sun", spend: 162, conv: 1 },
];

const CREATIVES = [
  { label: "Reel · Founder POV", ratio: "9:16", ctr: "3.4%", spend: 218 },
  { label: "Carousel · Before/After", ratio: "1:1", ctr: "2.8%", spend: 184 },
  { label: "Static · Offer hero", ratio: "1:1", ctr: "1.9%", spend: 142 },
  { label: "Reel · Client testimonial", ratio: "9:16", ctr: "3.1%", spend: 168 },
];

const STATUS_STYLES: Record<Campaign["status"], string> = {
  Active: "bg-emerald-500/15 text-emerald-300",
  Learning: "bg-amber-500/15 text-amber-300",
  Paused: "bg-[#2a2a2a] text-[#a3a3a3]",
};

function useCounter(target: number) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const steps = 40;
    const inc = target / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setV(Math.min(inc * step, target));
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

export default function MetaAdsDemo() {
  const maxSpend = Math.max(...CHART.map((d) => d.spend));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-[family-name:var(--font-inter)]">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm text-[#a3a3a3] hover:text-white">
            <Back /> Back to MakAI
          </Link>
          <div className="hidden h-5 w-px bg-[#2a2a2a] sm:block" />
          <div className="hidden items-center gap-3 sm:flex">
            <span className="font-[family-name:var(--font-space)] text-lg font-bold tracking-tight">MakAI Ads</span>
            <span className="text-sm text-[#a3a3a3]">/ Meta Campaigns</span>
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
            5 campaigns · 4 active
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {KPIS.map((k, i) => (
            <KpiCard key={k.label} kpi={k} delay={i * 0.06} />
          ))}
        </div>

        {/* Spend chart */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Spend vs Conversions</h2>
              <p className="mt-1 text-xs text-[#a3a3a3]">last 7 days</p>
            </div>
            <div className="flex gap-3 text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-sm bg-cyan-400" /> Spend
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-sm bg-emerald-400" /> Conv.
              </span>
            </div>
          </div>
          <div className="flex h-40 items-end gap-3">
            {CHART.map((d, i) => (
              <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end justify-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.spend / maxSpend) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.04 }}
                    className="w-1/2 rounded-t bg-gradient-to-t from-cyan-500/30 to-cyan-400/80"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.conv / 7) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.04 }}
                    className="w-1/2 rounded-t bg-gradient-to-t from-emerald-500/30 to-emerald-400/80"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#666]">{d.d}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Campaigns */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">Campaigns</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a] text-left text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                    <th className="px-2 py-2 font-medium">Name</th>
                    <th className="px-2 py-2 font-medium">Status</th>
                    <th className="px-2 py-2 font-medium text-right">Spend</th>
                    <th className="px-2 py-2 font-medium text-right">Results</th>
                    <th className="px-2 py-2 font-medium text-right">CPR</th>
                    <th className="px-2 py-2 font-medium text-right">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {CAMPAIGNS.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.04 * i }}
                      className="border-b border-[#1a1a1a] last:border-0 hover:bg-[#161616]"
                    >
                      <td className="px-2 py-2.5">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-[11px] text-[#a3a3a3]">{c.objective}</p>
                      </td>
                      <td className="px-2 py-2.5">
                        <span className={`rounded px-1.5 py-0.5 text-[11px] uppercase tracking-[0.12em] ${STATUS_STYLES[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-2 py-2.5 text-right font-mono">${c.spend}</td>
                      <td className="px-2 py-2.5 text-right">{c.results}</td>
                      <td className="px-2 py-2.5 text-right font-mono text-[#a3a3a3]">
                        {c.cpr === 0 ? "—" : `$${c.cpr.toFixed(2)}`}
                      </td>
                      <td className="px-2 py-2.5 text-right font-mono text-emerald-400">
                        {c.roas === 0 ? "—" : `${c.roas.toFixed(1)}x`}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Top creatives */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">Top Creatives</h2>
            <ul className="space-y-3">
              {CREATIVES.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-3 rounded-md border border-[#2a2a2a] bg-[#161616] p-2.5"
                >
                  <div className="flex h-12 w-9 shrink-0 items-center justify-center rounded bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-[9px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                    {c.ratio}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium leading-tight">{c.label}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                      CTR {c.ctr} · ${c.spend}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-[#555]">
          Preview of MakAI Ads · campaigns built to feed the qualifier
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
  const display =
    Number.isInteger(kpi.value) && !kpi.suffix?.includes("x")
      ? Math.round(v).toLocaleString()
      : v.toFixed(1);
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
          {display}
          {kpi.suffix}
        </span>
        <span className="text-xs text-emerald-400">{kpi.delta}</span>
      </div>
    </motion.div>
  );
}
