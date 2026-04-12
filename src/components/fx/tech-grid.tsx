"use client";
import { motion } from "framer-motion";

/**
 * Animated tech grid — two offset grids that slowly drift in opposite directions.
 * Monochrome, low opacity, sits behind content.
 */
export function TechGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ backgroundPositionX: 0, backgroundPositionY: 0 }}
        animate={{ backgroundPositionX: 80, backgroundPositionY: 80 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f5f5 1px, transparent 1px), linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <motion.div
        initial={{ backgroundPositionX: 0 }}
        animate={{ backgroundPositionX: -40 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f5f5f5 1px, transparent 1px), linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* fade edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, var(--bg) 100%)",
        }}
      />
    </div>
  );
}

/**
 * Horizontal scanline that sweeps once on mount.
 */
export function Scanline() {
  return (
    <motion.div
      aria-hidden
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: "100vh", opacity: [0, 1, 0] }}
      transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
      className="pointer-events-none fixed left-0 right-0 h-px bg-[var(--fg)] z-[45]"
      style={{ boxShadow: "0 0 40px 2px rgba(245,245,245,0.5)" }}
    />
  );
}
