"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { VoiceDemoTrigger } from "@/components/voice-demo/voice-demo";
import { TechGrid } from "@/components/fx/tech-grid";
import { Magnetic } from "@/components/fx/magnetic";
import { CalendlyButton } from "@/components/calendly-button";

const FacetedM = dynamic(
  () => import("./faceted-m").then((m) => m.FacetedM),
  { ssr: false },
);

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-32 pb-12 px-6 md:px-12"
    >
      <TechGrid />
      <FacetedM />

      {/* top meta bar */}
      <div className="relative z-10 flex items-center justify-between label">
        <span>◉ Live · SYS.01</span>
        <span className="hidden md:inline">N 26.1224° · W 80.1373°</span>
        <span>MAKAI / 2026</span>
      </div>

      {/* headline */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto max-w-7xl w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="label mb-8"
        >
          Voice Agents · Automations · Custom Software · Websites · Ads · SEO
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="font-display text-[13vw] md:text-[9vw] lg:text-[8rem] leading-[0.88] tracking-[-0.03em] max-w-[18ch]"
        >
          We build<br />
          systems that<br />
          <span className="text-[var(--muted)]">grow your</span> business.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-10 max-w-xl text-[var(--muted-2)] text-base md:text-lg leading-relaxed"
        >
          One founder. Full-stack AI. Voice agents, custom software,
          automations, websites, ads, and SEO — built and deployed in days, not months.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Magnetic>
            <VoiceDemoTrigger />
          </Magnetic>
          <Magnetic>
            <CalendlyButton className="inline-flex items-center justify-center gap-3 px-7 py-4 text-[13px] uppercase tracking-[0.18em] border border-[var(--line-3)] hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition-all duration-300">
              Book a call →
            </CalendlyButton>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* bottom ticker */}
      <div className="relative z-10 mt-16 border-t border-[var(--line-2)] pt-6 flex items-center justify-between label">
        <span>↓ Scroll</span>
        <span className="hidden md:inline">Makai Holdings LLC</span>
        <span>v1.0</span>
      </div>
    </section>
  );
}
