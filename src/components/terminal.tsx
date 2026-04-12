"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "./ui/section";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "dim"; text: string };

const SCRIPT: Line[] = [
  { kind: "dim", text: "// incoming call · +1 (305) 555-0188" },
  { kind: "cmd", text: "agent.answer()" },
  { kind: "out", text: "→ 'Hey, you've reached Vault Med Spa. This is Aria — how can I help?'" },
  { kind: "dim", text: "// user: i want to book botox for next tuesday" },
  { kind: "cmd", text: "agent.intent()" },
  { kind: "ok",  text: "✓ intent = BOOK_APPOINTMENT · service = botox" },
  { kind: "cmd", text: "calendar.findSlots(service: 'botox', from: 'next tuesday')" },
  { kind: "out", text: "→ [10:30a, 1:00p, 4:15p]" },
  { kind: "cmd", text: "agent.offer(slots)" },
  { kind: "out", text: "→ 'I've got 10:30, 1:00, or 4:15 — what works?'" },
  { kind: "dim", text: "// user: one o'clock is perfect" },
  { kind: "cmd", text: "crm.upsert(customer)" },
  { kind: "ok",  text: "✓ customer created · id = cus_9f3ax" },
  { kind: "cmd", text: "calendar.book(1:00p)" },
  { kind: "ok",  text: "✓ booked · evt_8k2m3" },
  { kind: "cmd", text: "sms.confirm(customer)" },
  { kind: "ok",  text: "✓ confirmation sent" },
  { kind: "cmd", text: "agent.close()" },
  { kind: "out", text: "→ 'Perfect — you're set for Tuesday at 1. See you then.'" },
  { kind: "dim", text: "// call ended · 47 seconds · 1 booking · 0 humans involved" },
];

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const push = () => {
      const line = SCRIPT[i];
      setLines((prev) => [...prev, line]);
      i++;
      if (i < SCRIPT.length) {
        const delay = line.kind === "dim" ? 380 : 280;
        setTimeout(push, delay);
      }
    };
    const t = setTimeout(push, 400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <Section
      id="live"
      label="Live / 03"
      title={<>Under the <span className="text-[var(--muted)]">hood.</span></>}
    >
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <p className="text-[var(--muted-2)] text-base leading-relaxed max-w-md mb-6">
            Every MakAI build is a real system — not a chatbot wrapper. This is an
            actual trace of one of our voice agents booking a client appointment,
            end to end.
          </p>
          <ul className="space-y-3 label">
            <li className="flex justify-between border-b border-[var(--line-2)] pb-2">
              <span>Call duration</span>
              <span className="text-[var(--fg)]">47s</span>
            </li>
            <li className="flex justify-between border-b border-[var(--line-2)] pb-2">
              <span>Humans involved</span>
              <span className="text-[var(--fg)]">0</span>
            </li>
            <li className="flex justify-between border-b border-[var(--line-2)] pb-2">
              <span>Revenue unlocked</span>
              <span className="text-[var(--fg)]">$480</span>
            </li>
            <li className="flex justify-between border-b border-[var(--line-2)] pb-2">
              <span>Time to deploy</span>
              <span className="text-[var(--fg)]">3 days</span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-8">
          <div className="border border-[var(--line-3)] bg-black relative overflow-hidden">
            {/* titlebar */}
            <div className="flex items-center justify-between border-b border-[var(--line-2)] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--line-3)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--line-3)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--line-3)]" />
              </div>
              <span className="label">makai-agent · vault-med-spa</span>
              <span className="label flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--fg)] opacity-70" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--fg)]" />
                </span>
                LIVE
              </span>
            </div>
            {/* body */}
            <div className="p-6 md:p-8 font-mono text-[13px] leading-[1.9] min-h-[440px] max-h-[520px] overflow-hidden">
              {lines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="whitespace-pre-wrap"
                >
                  {l.kind === "cmd" && (
                    <span>
                      <span className="text-[var(--muted)]">$ </span>
                      <span className="text-[var(--fg)]">{l.text}</span>
                    </span>
                  )}
                  {l.kind === "out" && (
                    <span className="text-[var(--muted-2)]">{l.text}</span>
                  )}
                  {l.kind === "ok" && (
                    <span className="text-[var(--fg)]">{l.text}</span>
                  )}
                  {l.kind === "dim" && (
                    <span className="text-[var(--muted)] italic">{l.text}</span>
                  )}
                </motion.div>
              ))}
              {/* blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[8px] h-[14px] bg-[var(--fg)] translate-y-[2px]"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
