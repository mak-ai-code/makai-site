"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[var(--bg)]/70 border-b border-[var(--line-2)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 h-16">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="font-display text-xl tracking-tight">MAKAI</span>
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Makai Holdings
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-10 text-[12px] uppercase tracking-[0.18em] text-[var(--muted-2)]">
          <li><a href="#services" className="hover:text-[var(--fg)] transition-colors">Services</a></li>
          <li><a href="#work" className="hover:text-[var(--fg)] transition-colors">Work</a></li>
          <li><a href="#process" className="hover:text-[var(--fg)] transition-colors">Process</a></li>
          <li><a href="#team" className="hover:text-[var(--fg)] transition-colors">Team</a></li>
          <li><a href="#contact" className="hover:text-[var(--fg)] transition-colors">Contact</a></li>
        </ul>
        <a
          href="#contact"
          className="text-[11px] uppercase tracking-[0.18em] border border-[var(--line-3)] px-5 py-2.5 hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition-all"
        >
          Book a call
        </a>
      </div>
    </motion.nav>
  );
}
