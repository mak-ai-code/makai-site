"use client";
import { motion } from "framer-motion";
import { Section } from "./ui/section";
import { services } from "@/content/services";
import { serviceVisuals } from "./fx/service-visuals";

export function Services() {
  return (
    <Section
      id="services"
      label="Services / 01"
      title={<>What we <span className="text-[var(--muted)]">ship.</span></>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--line-2)]">
        {services.map((s, i) => {
          const Viz = serviceVisuals[s.n as keyof typeof serviceVisuals];
          return (
            <motion.a
              key={s.n}
              href={s.demo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border-r border-b border-[var(--line-2)] p-8 md:p-10 min-h-[420px] flex flex-col justify-between overflow-hidden hover:bg-[var(--line)]/40 transition-colors"
            >
              {/* animated diagram */}
              <div className="absolute inset-x-0 top-0 h-44 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-40 h-40">{Viz && <Viz />}</div>
              </div>

              {/* sweep line on hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--fg)] to-transparent opacity-0 group-hover:opacity-60 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
              </div>

              <div className="flex items-start justify-between relative z-10">
                <span className="label">{s.n}</span>
                <span className="label opacity-0 group-hover:opacity-100 transition-opacity">
                  → See example
                </span>
              </div>
              <div className="relative z-10 mt-auto">
                <h3 className="font-display text-2xl md:text-3xl mb-3">{s.title}</h3>
                <p className="text-[var(--muted-2)] text-sm leading-relaxed mb-5">
                  {s.blurb}
                </p>
                <ul className="space-y-1.5 text-xs text-[var(--muted)]">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span>—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
