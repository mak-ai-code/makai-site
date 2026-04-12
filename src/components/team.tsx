"use client";
import { motion } from "framer-motion";
import { Section } from "./ui/section";

export function Team() {
  return (
    <Section
      id="team"
      label="Team / 05"
      title={
        <>
          The person <span className="text-[var(--muted)]">behind it.</span>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[var(--line-2)] border border-[var(--line-2)]">
        {/* photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 bg-[var(--bg)] p-8 md:p-10"
        >
          <div className="aspect-[3/4] w-full overflow-hidden border border-[var(--line-3)] bg-[var(--line)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/jacob.png"
              alt="Jacob Makai Melancon"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <span className="label mt-3 block text-center">(AI-generated headshot)</span>
        </motion.div>

        {/* bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 bg-[var(--bg)] p-8 md:p-12 lg:p-16 flex flex-col justify-center"
        >
          <span className="label mb-4">Founder & Lead Engineer</span>
          <h3 className="font-display text-3xl md:text-5xl lg:text-6xl mb-8">
            Jacob Makai Melancon
          </h3>

          <div className="space-y-5 text-[var(--muted-2)] text-sm md:text-base leading-relaxed max-w-xl">
            <p>
              I started my first business at 15 — tearing apart an overpriced
              Christmas computer, rebuilding it with better parts, and selling
              the result. That turned into flipping sneakers, then designer
              pieces, then day-trading. By the time I got to college I knew I
              wasn&apos;t going to stop building things.
            </p>
            <p>
              I grew up in Naples, Florida, played sports my whole life, and made
              the hard call to trade the field for a laptop when I moved to Boca
              Raton for FAU. I came in as an entrepreneurship major, but once I
              discovered what AI could actually do — not the hype, the real
              systems — I switched my focus to artificial intelligence and never
              looked back.
            </p>
            <p>
              Now I spend every day building the things most agencies only talk
              about: voice agents that handle real calls, automations that
              replace entire workflows, and custom software that ships in days
              instead of quarters. I&apos;m 20, I still day-trade, and I still
              think the best way to learn something is to build it and sell it.
            </p>
          </div>

          {/* quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--line-2)] border border-[var(--line-2)] mt-10">
            {[
              { label: "Age", value: "20" },
              { label: "Based in", value: "Boca Raton" },
              { label: "School", value: "FAU" },
              { label: "Major", value: "AI" },
            ].map((f) => (
              <div
                key={f.label}
                className="bg-[var(--bg)] p-4 text-center"
              >
                <span className="font-display text-xl md:text-2xl block">
                  {f.value}
                </span>
                <span className="label mt-1 block">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* video intro — drop your MP4 into public/team/intro.mp4 to activate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mt-px border border-[var(--line-2)] bg-[var(--bg)] p-8 md:p-12"
      >
        <span className="label mb-6 block">Video Intro</span>
        <div className="aspect-video w-full max-w-4xl mx-auto border border-[var(--line-3)] bg-[var(--line)] overflow-hidden flex items-center justify-center">
          {/* Replace this placeholder with the video once recorded */}
          <div className="text-center p-8">
            <span className="font-display text-2xl md:text-3xl block mb-3 text-[var(--line-3)]">
              Coming soon
            </span>
            <span className="label">30-second intro from the founder</span>
          </div>
          {/*
          Uncomment when intro.mp4 is ready:
          <video
            src="/team/intro.mp4"
            muted
            playsInline
            loop
            autoPlay
            className="w-full h-full object-cover"
          />
          */}
        </div>
      </motion.div>
    </Section>
  );
}
