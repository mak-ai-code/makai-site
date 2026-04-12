"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const panels = [
  {
    kicker: "THE VOICE",
    title: "Answers in 600ms.",
    copy: "A voice agent that feels human. It interrupts politely, handles objections, and books the call — 24/7, in any accent you want.",
    stat: "< 600ms",
    statLabel: "Response latency",
  },
  {
    kicker: "THE PIPELINE",
    title: "Ads → booked call.\nOne machine.",
    copy: "Meta ads feed a landing page. The landing page feeds an AI qualifier. The qualifier books the call. The calendar syncs to your CRM. No gaps.",
    stat: "1 system",
    statLabel: "End to end",
  },
  {
    kicker: "THE BRAIN",
    title: "It knows your business.",
    copy: "Retrieval over your docs, calendars, CRM, and SOPs. Private by default. Your data stays yours — the agent just gets smarter.",
    stat: "Private",
    statLabel: "Your data, your keys",
  },
];

export function Showcase() {
  return (
    <section
      id="showcase"
      className="relative border-t border-[var(--line-2)] bg-[var(--bg)]"
    >
      <div className="px-6 md:px-12 pt-24 md:pt-32 pb-8 max-w-7xl mx-auto">
        <span className="label">The Stack / 02</span>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] max-w-4xl mt-6">
          Engineered like <span className="text-[var(--muted)]">hardware.</span>
        </h2>
      </div>
      {panels.map((p, i) => (
        <Panel key={i} {...p} index={i} />
      ))}
    </section>
  );
}

function Panel({
  kicker,
  title,
  copy,
  stat,
  statLabel,
  index,
}: {
  kicker: string;
  title: string;
  copy: string;
  stat: string;
  statLabel: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center px-6 md:px-12"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
      >
        <div className="md:col-span-7">
          <p className="label mb-6">
            {String(index + 1).padStart(2, "0")} · {kicker}
          </p>
          <h3 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-[-0.02em] whitespace-pre-line">
            {title}
          </h3>
          <p className="mt-8 text-[var(--muted-2)] text-base md:text-lg leading-relaxed max-w-xl">
            {copy}
          </p>
        </div>
        <div className="md:col-span-5 md:pl-10">
          <div className="border border-[var(--line-3)] aspect-square relative overflow-hidden flex items-center justify-center">
            {/* animated monochrome visual */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,245,245,0.08),transparent_70%)]" />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #f5f5f5 1px, transparent 1px), linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border border-[var(--line-3)] rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-14 border border-[var(--line-2)] rounded-full"
            />
            <div className="relative z-10 text-center">
              <p className="font-display text-6xl md:text-7xl">{stat}</p>
              <p className="label mt-3">{statLabel}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
