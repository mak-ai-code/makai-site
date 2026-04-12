"use client";
import { useEffect, useState } from "react";

/**
 * Fixed bottom-left telemetry HUD — fake live readouts for that tech-demo feel.
 * Low-priority visual; hidden on mobile.
 */
export function Hud() {
  const [time, setTime] = useState("");
  const [fps, setFps] = useState(60);
  const [seed, setSeed] = useState<number | null>(null);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 9999));
    const id = setInterval(() => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
      setFps(58 + Math.floor(Math.random() * 5));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="hidden md:block fixed bottom-6 left-6 z-[55] pointer-events-none select-none"
    >
      <div className="border border-[var(--line-2)] bg-[var(--bg)]/60 backdrop-blur-sm px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] font-mono space-y-1">
        <div className="flex gap-3">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--fg)] opacity-70" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--fg)]" />
            </span>
            SYS.01
          </span>
          <span>{time || "00:00:00"}</span>
        </div>
        <div className="flex gap-3">
          <span>{fps}FPS</span>
          <span>SEED {seed ?? "----"}</span>
        </div>
      </div>
    </div>
  );
}
