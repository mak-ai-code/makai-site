"use client";
import { motion } from "framer-motion";
import { Section } from "./ui/section";
import { work } from "@/content/work";

export function Work() {
  return (
    <Section
      id="work"
      label="Selected Work / 02"
      title={<>Systems we&apos;ve <span className="text-[var(--muted)]">shipped.</span></>}
    >
      <div className="space-y-0 border-t border-[var(--line-2)]">
        {work.map((w, i) => (
          <motion.a
            key={w.title}
            href={w.href}
            target={w.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-[var(--line-2)] px-2 hover:bg-[var(--line)]/40 transition-colors"
          >
            <span className="label col-span-1 pt-2">{String(i + 1).padStart(2, "0")}</span>
            <div className="col-span-11 md:col-span-5">
              <h3 className="font-display text-2xl md:text-4xl">{w.title}</h3>
            </div>
            <p className="col-span-12 md:col-span-4 text-sm text-[var(--muted-2)] pt-2 md:pt-3 leading-relaxed">
              {w.pitch}
            </p>
            <p className="col-span-12 md:col-span-2 label pt-3 md:text-right">
              {w.kind} <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </p>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
