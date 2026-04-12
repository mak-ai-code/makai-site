"use client";
import { motion } from "framer-motion";
import { Section } from "./ui/section";

const steps = [
  { n: "01", title: "Discover", body: "Free 30-min call. We map your ops, find the bottlenecks, scope the build." },
  { n: "02", title: "Design", body: "Architecture, scripts, flows, integrations. You approve before we build." },
  { n: "03", title: "Build", body: "We ship in days, not months. You test as we go. No black box." },
  { n: "04", title: "Deploy", body: "We launch it live, hand you the keys, and stay on call for tune-ups." },
];

export function Process() {
  return (
    <Section
      id="process"
      label="Process / 03"
      title={<>Four steps. <span className="text-[var(--muted)]">No bloat.</span></>}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[var(--line-2)] border border-[var(--line-2)]">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[var(--bg)] p-8 md:p-10 min-h-[260px] flex flex-col justify-between"
          >
            <span className="label">{s.n}</span>
            <div>
              <h3 className="font-display text-3xl md:text-4xl mb-4">{s.title}</h3>
              <p className="text-sm text-[var(--muted-2)] leading-relaxed">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
