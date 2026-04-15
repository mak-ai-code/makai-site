"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const BUSINESSES = [
  { id: "makai-code", name: "MakAI Code", active: true },
  { id: "makai-voice", name: "MakAI Voice", active: false },
  { id: "makai-holdings", name: "Makai Holdings", active: false },
];

const STATS = [
  { label: "Projects Shipped", value: 14, delta: "+3 this month", prefix: "" },
  { label: "Active Clients", value: 7, delta: "+2", prefix: "" },
  { label: "MRR", value: 8400, delta: "+18%", prefix: "$" },
  { label: "Hours Focused", value: 112, delta: "this week", prefix: "" },
];

type Task = { id: string; title: string; done: boolean; tag: string };

const INITIAL_TASKS: Task[] = [
  { id: "t1", title: "Ship IVMD voice agent v2 to production", done: true, tag: "MakAI Voice" },
  { id: "t2", title: "Review Frazier's CRM bug report", done: true, tag: "MakAI Code" },
  { id: "t3", title: "Record Loom walkthrough for new landing page", done: false, tag: "Marketing" },
  { id: "t4", title: "Payment follow-up — Blue Water Roofing", done: false, tag: "Ops" },
  { id: "t5", title: "Prep discovery call deck for 4pm", done: false, tag: "Sales" },
  { id: "t6", title: "Push makaicode.com refinements", done: false, tag: "MakAI Code" },
];

const ANALYTICS = [
  { week: "Wk 1", shipped: 1 },
  { week: "Wk 2", shipped: 2 },
  { week: "Wk 3", shipped: 1 },
  { week: "Wk 4", shipped: 3 },
  { week: "Wk 5", shipped: 2 },
  { week: "Wk 6", shipped: 4 },
  { week: "Wk 7", shipped: 3 },
  { week: "Wk 8", shipped: 5 },
];

const QUEUE = [
  { title: "Midnight City", artist: "M83", length: "4:03" },
  { title: "Runaway", artist: "Kanye West", length: "9:08" },
  { title: "Sunrise", artist: "Childish Gambino", length: "4:02" },
];

const ACTIVITY = [
  { text: "Voice agent call completed — IVMD · 2m 14s", time: "just now", dot: "bg-emerald-400" },
  { text: "Frazier's CRM: 3 new leads qualified by AI", time: "18 min ago", dot: "bg-cyan-400" },
  { text: "Invoice paid — Blue Water Roofing ($1,800)", time: "1 hr ago", dot: "bg-amber-400" },
  { text: "Deployed makaicode.com · v1.2", time: "3 hr ago", dot: "bg-purple-400" },
  { text: "New lead from makaicode.com form", time: "5 hr ago", dot: "bg-cyan-400" },
];

function useCounter(target: number) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const steps = 40;
    const inc = target / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      setVal(Math.min(Math.round(inc * step), target));
      if (step >= steps) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return val;
}

function Back() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MakAICommandDemo() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [business, setBusiness] = useState(BUSINESSES[0].id);
  const [brain, setBrain] = useState(
    "idea: add a weekly 'reality check' prompt that compares what i said i'd ship vs what actually shipped. send it sunday night.",
  );
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);

  const completed = tasks.filter((t) => t.done).length;
  const progress = Math.round((completed / tasks.length) * 100);

  const peakShipped = useMemo(() => Math.max(...ANALYTICS.map((a) => a.shipped)), []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-[family-name:var(--font-inter)]">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1 text-sm text-[#a3a3a3] hover:text-white">
            <Back /> Back to MakAI
          </Link>
          <div className="hidden h-5 w-px bg-[#2a2a2a] sm:block" />
          <div className="hidden items-center gap-3 sm:flex">
            <span className="font-[family-name:var(--font-space)] text-lg font-bold tracking-tight">MakAI Command</span>
            <span className="text-sm text-[#a3a3a3]">/ Founder OS</span>
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
            Live
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        {/* Business switcher */}
        <div className="mb-6 flex flex-wrap gap-2">
          {BUSINESSES.map((b) => (
            <button
              key={b.id}
              onClick={() => setBusiness(b.id)}
              className={`rounded-md border px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                business === b.id
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                  : "border-[#2a2a2a] text-[#a3a3a3] hover:border-[#3a3a3a] hover:text-white"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} delay={i * 0.06} />
          ))}
        </div>

        {/* Main 2-col grid */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Tasks */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Today</h2>
                  <p className="mt-1 text-xs text-[#a3a3a3]">
                    {completed} of {tasks.length} complete · {progress}%
                  </p>
                </div>
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#1e1e1e]">
                  <motion.div
                    className="h-full bg-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
              <ul className="space-y-1">
                {tasks.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() =>
                        setTasks((prev) =>
                          prev.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)),
                        )
                      }
                      className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-[#181818]"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                          t.done
                            ? "border-cyan-400 bg-cyan-400/20 text-cyan-300"
                            : "border-[#3a3a3a] group-hover:border-[#555]"
                        }`}
                      >
                        {t.done && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span
                        className={`flex-1 text-sm ${
                          t.done ? "text-[#a3a3a3] line-through decoration-[#444]" : "text-white"
                        }`}
                      >
                        {t.title}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                        {t.tag}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Brain dump */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Brain Dump</h2>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">Autosaved</span>
              </div>
              <textarea
                value={brain}
                onChange={(e) => setBrain(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-md border border-[#2a2a2a] bg-[#0a0a0a] p-3 text-sm text-[#e5e5e5] outline-none placeholder:text-[#555] focus:border-cyan-500/40"
                placeholder="drop anything — ideas, follow-ups, regrets"
              />
            </motion.section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Analytics */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <div className="mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Ship Cadence</h2>
                <p className="mt-1 text-xs text-[#a3a3a3]">projects shipped · 8 wk</p>
              </div>
              <div className="flex h-32 items-end gap-2">
                {ANALYTICS.map((d, i) => (
                  <motion.div
                    key={d.week}
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.shipped / peakShipped) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.04 }}
                    className="group relative flex-1 rounded-t bg-gradient-to-t from-cyan-500/30 to-cyan-400/80"
                  >
                    <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-[#0a0a0a] px-1.5 py-0.5 text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                      {d.shipped}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.18em] text-[#666]">
                {ANALYTICS.map((d) => (
                  <span key={d.week}>{d.week}</span>
                ))}
              </div>
            </motion.section>

            {/* Music player */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Focus Player</h2>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#a3a3a3]">
                  {playing ? "Playing" : "Paused"}
                </span>
              </div>
              <div className="mb-4 rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-3">
                <p className="text-sm font-medium">{QUEUE[track].title}</p>
                <p className="text-xs text-[#a3a3a3]">{QUEUE[track].artist} · {QUEUE[track].length}</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#1e1e1e]">
                  <motion.div
                    key={`${track}-${playing}`}
                    initial={{ width: "0%" }}
                    animate={{ width: playing ? "65%" : "30%" }}
                    transition={{ duration: playing ? 30 : 0.3, ease: "linear" }}
                    className="h-full bg-cyan-400"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setTrack((t) => (t - 1 + QUEUE.length) % QUEUE.length)}
                  className="rounded-full border border-[#2a2a2a] p-2 text-[#a3a3a3] hover:border-[#555] hover:text-white"
                  aria-label="Previous"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M11 2L5 7l6 5V2zM3 2h1v10H3z" /></svg>
                </button>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  className="rounded-full bg-cyan-400 p-3 text-[#0a0a0a] hover:bg-cyan-300"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 2h3v10H3zM8 2h3v10H8z" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 2l9 5-9 5V2z" /></svg>
                  )}
                </button>
                <button
                  onClick={() => setTrack((t) => (t + 1) % QUEUE.length)}
                  className="rounded-full border border-[#2a2a2a] p-2 text-[#a3a3a3] hover:border-[#555] hover:text-white"
                  aria-label="Next"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 2l6 5-6 5V2zM10 2h1v10h-1z" /></svg>
                </button>
              </div>
            </motion.section>

            {/* Activity */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-xl border border-[#2a2a2a] bg-[#111111] p-5"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">Activity</h2>
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
            </motion.section>
          </div>
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-[#555]">
          Preview of MakAI Command · built for the founder, by the founder
        </p>
      </main>
    </div>
  );
}

function StatCard({
  stat,
  delay,
}: {
  stat: { label: string; value: number; delta: string; prefix: string };
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
        </span>
        <span className="text-xs text-emerald-400">{stat.delta}</span>
      </div>
    </motion.div>
  );
}
