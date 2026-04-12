"use client";
import { motion } from "framer-motion";
import { Counter } from "./fx/counter";

const stats = [
  { value: 600, suffix: "MS", label: "Voice latency" },
  { value: 24, suffix: "/7", label: "Uptime" },
  { value: 7, suffix: "", label: "Service lines" },
  { value: 4, suffix: "+", label: "Projects shipped" },
];

export function Stats() {
  return (
    <section
      aria-hidden
      className="relative border-t border-b border-[var(--line-2)] px-6 md:px-12 py-10 md:py-14"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-[var(--line-2)]">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="md:px-10 first:pl-0 last:pr-0"
          >
            <p className="font-display text-5xl md:text-7xl leading-none tracking-[-0.02em]">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="label mt-3">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
