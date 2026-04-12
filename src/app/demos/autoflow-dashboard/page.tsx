"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── hardcoded data ─── */

const STATS = [
  { label: "Leads Today", value: 12, delta: "+18%", prefix: "" },
  { label: "AI Calls Handled", value: 34, delta: "+24%", prefix: "" },
  { label: "Appointments Booked", value: 8, delta: "+12%", prefix: "" },
  { label: "Revenue", value: 3840, delta: "+31%", prefix: "$" },
];

type PipelineCard = {
  name: string;
  phone: string;
  service: string;
  time: string;
  badge: string;
  badgeColor: string;
};

const PIPELINE: { title: string; cards: PipelineCard[] }[] = [
  {
    title: "New Lead",
    cards: [
      {
        name: "Sarah M.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-4521",
        service: "Botox",
        time: "2 min ago",
        badge: "Inbound",
        badgeColor: "bg-cyan-500/15 text-cyan-400",
      },
      {
        name: "James T.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-8834",
        service: "Fillers",
        time: "14 min ago",
        badge: "Missed Call",
        badgeColor: "bg-amber-500/15 text-amber-400",
      },
      {
        name: "Megan L.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-1209",
        service: "Laser Treatment",
        time: "28 min ago",
        badge: "Website",
        badgeColor: "bg-purple-500/15 text-purple-400",
      },
    ],
  },
  {
    title: "AI Qualified",
    cards: [
      {
        name: "Emily R.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-7741",
        service: "Fillers",
        time: "12 min ago",
        badge: "Qualified",
        badgeColor: "bg-emerald-500/15 text-emerald-400",
      },
      {
        name: "David K.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-3356",
        service: "Botox",
        time: "35 min ago",
        badge: "Qualified",
        badgeColor: "bg-emerald-500/15 text-emerald-400",
      },
      {
        name: "Rachel W.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-6682",
        service: "Chemical Peel",
        time: "1 hr ago",
        badge: "Follow-up",
        badgeColor: "bg-sky-500/15 text-sky-400",
      },
    ],
  },
  {
    title: "Appointment Booked",
    cards: [
      {
        name: "Lisa P.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-9914",
        service: "Botox",
        time: "45 min ago",
        badge: "Confirmed",
        badgeColor: "bg-emerald-500/15 text-emerald-400",
      },
      {
        name: "Mark H.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-2207",
        service: "Microneedling",
        time: "2 hr ago",
        badge: "Pending",
        badgeColor: "bg-amber-500/15 text-amber-400",
      },
    ],
  },
  {
    title: "Completed",
    cards: [
      {
        name: "Anna B.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-5530",
        service: "Botox",
        time: "3 hr ago",
        badge: "Done",
        badgeColor: "bg-neutral-500/15 text-neutral-400",
      },
      {
        name: "Chris D.",
        phone: "\u2022\u2022\u2022-\u2022\u2022\u2022-0018",
        service: "Fillers",
        time: "5 hr ago",
        badge: "Done",
        badgeColor: "bg-neutral-500/15 text-neutral-400",
      },
    ],
  },
];

const ACTIVITY = [
  {
    text: "AI agent booked Sarah M. for Botox",
    time: "2 min ago",
    icon: "calendar",
    color: "bg-cyan-400",
  },
  {
    text: "Missed call recovered \u2014 James T. called back",
    time: "5 min ago",
    icon: "phone",
    color: "bg-amber-400",
  },
  {
    text: "New lead qualified \u2014 Emily R. interested in Fillers",
    time: "12 min ago",
    icon: "check",
    color: "bg-emerald-400",
  },
  {
    text: "Appointment confirmed via SMS \u2014 David K.",
    time: "18 min ago",
    icon: "message",
    color: "bg-sky-400",
  },
  {
    text: "AI follow-up sent \u2014 Lisa P.",
    time: "25 min ago",
    icon: "send",
    color: "bg-purple-400",
  },
  {
    text: "Lead scored 92/100 \u2014 Rachel W.",
    time: "32 min ago",
    icon: "star",
    color: "bg-yellow-400",
  },
  {
    text: "Voicemail transcribed \u2014 Megan L.",
    time: "41 min ago",
    icon: "mic",
    color: "bg-pink-400",
  },
  {
    text: "Payment processed \u2014 Anna B. \u2014 $480",
    time: "1 hr ago",
    icon: "dollar",
    color: "bg-emerald-400",
  },
  {
    text: "Review request sent \u2014 Chris D.",
    time: "2 hr ago",
    icon: "star",
    color: "bg-amber-400",
  },
  {
    text: "New website form submission \u2014 Mark H.",
    time: "3 hr ago",
    icon: "globe",
    color: "bg-cyan-400",
  },
];

/* ─── animated counter ─── */

function AnimatedCounter({
  target,
  prefix = "",
}: {
  target: number;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <span className="font-mono text-2xl font-semibold tracking-tight text-[#f5f5f5]">
      {prefix}
      {count.toLocaleString()}
    </span>
  );
}

/* ─── small icon components ─── */

function ArrowUp() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="inline-block"
    >
      <path
        d="M6 10V2M6 2L2.5 5.5M6 2L9.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="inline-block"
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── page ─── */

export default function AutoFlowDashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-[family-name:var(--font-inter)]">
      {/* ── Top Nav ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2a2a2a] bg-[#0a0a0a]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-[#a3a3a3] transition-colors hover:text-[#f5f5f5]"
          >
            <ChevronLeft />
            Back to MakAI
          </Link>
          <div className="hidden h-5 w-px bg-[#2a2a2a] sm:block" />
          <div className="hidden items-center gap-3 sm:flex">
            <span className="font-[family-name:var(--font-space)] text-lg font-bold tracking-tight">
              AutoFlow
            </span>
            <span className="text-sm text-[#a3a3a3]">/</span>
            <span className="text-sm text-[#a3a3a3]">Vault Med Spa</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          System Online
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        {/* ── Stats Bar ── */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="rounded-lg border border-[#2a2a2a] bg-[#141414] p-4"
            >
              <p className="mb-1 text-xs uppercase tracking-widest text-[#a3a3a3]">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <AnimatedCounter target={stat.value} prefix={stat.prefix} />
                <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
                  <ArrowUp />
                  {stat.delta}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Main grid: Kanban + Activity ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* ── Kanban Pipeline ── */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="mb-3 font-[family-name:var(--font-space)] text-sm font-semibold uppercase tracking-widest text-[#a3a3a3]">
              Pipeline
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
              {PIPELINE.map((col, colIdx) => (
                <div
                  key={col.title}
                  className="min-w-[260px] flex-shrink-0 rounded-lg border border-[#2a2a2a] bg-[#111111] p-3"
                >
                  {/* Column header */}
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-[#f5f5f5]">
                      {col.title}
                    </h3>
                    <span className="rounded-full bg-[#2a2a2a] px-2 py-0.5 font-mono text-xs text-[#a3a3a3]">
                      {col.cards.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="flex flex-col gap-2">
                    {col.cards.map((card, cardIdx) => (
                      <motion.div
                        key={card.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.35 + colIdx * 0.1 + cardIdx * 0.06,
                          duration: 0.35,
                        }}
                        className="group cursor-default rounded-md border border-[#2a2a2a] bg-[#1a1a1a] p-3 transition-colors hover:border-[#3a3a3a] hover:bg-[#1f1f1f]"
                      >
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {card.name}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${card.badgeColor}`}
                          >
                            {card.badge}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-[#a3a3a3]">
                          {card.phone}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-xs text-[#a3a3a3]">
                            {card.service}
                          </span>
                          <span className="text-[10px] text-[#666]">
                            {card.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Activity Feed ── */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-4"
          >
            <h2 className="mb-4 font-[family-name:var(--font-space)] text-sm font-semibold uppercase tracking-widest text-[#a3a3a3]">
              Activity
            </h2>
            <div className="flex flex-col gap-1">
              {ACTIVITY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.05, duration: 0.3 }}
                  className="group flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-[#1a1a1a]"
                >
                  <span
                    className={`mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full ${item.color}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-snug text-[#d4d4d4]">
                      {item.text}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-[#666]">
                      {item.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#2a2a2a] py-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#666] transition-colors hover:text-[#a3a3a3]"
        >
          <span className="font-[family-name:var(--font-space)] font-semibold tracking-wide">
            Built by MakAI
          </span>
        </Link>
      </footer>
    </div>
  );
}
