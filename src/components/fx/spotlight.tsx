"use client";
import { useEffect, useState } from "react";

/**
 * Global cursor spotlight — subtle monochrome radial that follows the mouse.
 * Disabled on touch devices.
 */
export function Spotlight() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40]"
      style={{
        background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(245,245,245,0.06), transparent 70%)`,
      }}
    />
  );
}
