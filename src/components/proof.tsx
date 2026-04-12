"use client";
import { motion } from "framer-motion";
import { Section } from "./ui/section";

const metrics = [
  { value: "4+", label: "Projects shipped" },
  { value: "7", label: "Services offered" },
  { value: "Days", label: "Not months — to deploy" },
  { value: "1", label: "Founder who builds it all" },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Tailwind",
  "Supabase",
  "Vapi",
  "OpenAI",
  "Framer Motion",
  "Three.js",
  "Node.js",
  "Vercel",
];

export function Proof() {
  return (
    <Section
      id="proof"
      label="Built Different / 04"
      title={
        <>
          Not another <span className="text-[var(--muted)]">AI wrapper.</span>
        </>
      }
    >
      {/* metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--line-2)] border border-[var(--line-2)] mb-16">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[var(--bg)] p-8 md:p-10 text-center"
          >
            <span className="font-display text-3xl md:text-5xl block">{m.value}</span>
            <span className="label mt-3 block">{m.label}</span>
          </motion.div>
        ))}
      </div>

      {/* differentiator + stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--line-2)] border border-[var(--line-2)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[var(--bg)] p-8 md:p-12"
        >
          <h3 className="font-display text-2xl md:text-3xl mb-6">
            No middlemen. No white-labels.
          </h3>
          <div className="space-y-4 text-sm md:text-base text-[var(--muted-2)] leading-relaxed">
            <p>
              Most AI agencies resell the same no-code tools with a markup. Every
              MakAI project is architected and coded from scratch by the founder.
              You get direct access to the person building your system — not a
              project manager relaying messages.
            </p>
            <p>
              Voice agents, full-stack apps, automations, websites, ads, SEO — one
              team handles all of it. No handoffs, no gaps, no finger-pointing.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[var(--bg)] p-8 md:p-12"
        >
          <h3 className="font-display text-2xl md:text-3xl mb-6">Tech stack</h3>
          <div className="flex flex-wrap gap-2">
            {stack.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="border border-[var(--line-3)] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
