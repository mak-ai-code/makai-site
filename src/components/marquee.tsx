const WORDS = [
  "VOICE AGENTS",
  "AUTOMATIONS",
  "CUSTOM BUILDS",
  "LEAD SYSTEMS",
  "META ADS",
  "SEO",
  "24/7 INBOUND",
  "RAG PIPELINES",
  "CRM HANDOFF",
];

export function Marquee() {
  const loop = [...WORDS, ...WORDS];
  return (
    <div
      aria-hidden
      className="relative border-t border-b border-[var(--line-2)] py-6 overflow-hidden select-none"
    >
      <div className="marquee-track">
        {loop.map((w, i) => (
          <span
            key={i}
            className="font-display text-5xl md:text-7xl uppercase tracking-tight px-8 text-[var(--muted)] whitespace-nowrap flex items-center gap-8"
          >
            {w}
            <span className="text-[var(--line-3)]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
