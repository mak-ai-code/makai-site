"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Vapi from "@vapi-ai/web";
import { VAPI_PUBLIC_KEY, VAPI_ASSISTANT_ID } from "@/lib/vapi";

type Msg = { role: "user" | "assistant"; text: string };
type Status = "idle" | "connecting" | "live" | "ending" | "error";
type Turn = "listening" | "speaking" | "thinking";

function useVapi() {
  const [status, setStatus] = useState<Status>("idle");
  const [turn, setTurn] = useState<Turn>("listening");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [volume, setVolume] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    const vapi = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      setStatus("live");
      setTurn("listening");
    });
    vapi.on("call-end", () => {
      setStatus("idle");
      setVolume(0);
      setTurn("listening");
    });
    vapi.on("speech-start", () => setTurn("speaking"));
    vapi.on("speech-end", () => setTurn("listening"));
    vapi.on("volume-level", (v: number) => setVolume(v));
    vapi.on("error", (e: unknown) => {
      console.error("[vapi]", e);
      setError(e instanceof Error ? e.message : "Voice demo error");
      setStatus("error");
    });
    vapi.on(
      "message",
      (m: {
        type: string;
        role?: string;
        transcript?: string;
        transcriptType?: string;
      }) => {
        if (
          m.type === "transcript" &&
          m.transcriptType === "final" &&
          m.transcript &&
          m.role
        ) {
          setMessages((prev) => [
            ...prev,
            { role: m.role === "user" ? "user" : "assistant", text: m.transcript! },
          ]);
          // after user finishes a final transcript, agent is thinking
          if (m.role === "user") setTurn("thinking");
        }
      },
    );

    return () => {
      try {
        vapi.stop();
      } catch {}
    };
  }, []);

  const start = useCallback(async () => {
    if (!vapiRef.current) return;
    setMessages([]);
    setError(null);
    setStatus("connecting");
    try {
      await vapiRef.current.start(VAPI_ASSISTANT_ID);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Could not start call");
      setStatus("error");
    }
  }, []);

  const stop = useCallback(() => {
    if (!vapiRef.current) return;
    setStatus("ending");
    try {
      vapiRef.current.stop();
    } catch {}
  }, []);

  return { status, turn, messages, volume, error, start, stop };
}

// Cross-component open signal via a DOM event.
const OPEN_EVT = "makai:voice-open";
export function openVoiceDemo() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVT));
}

export function VoiceDemoTrigger() {
  return (
    <button
      onClick={() => openVoiceDemo()}
      className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 text-[13px] uppercase tracking-[0.18em] bg-[var(--fg)] text-[var(--bg)] border border-[var(--fg)] hover:bg-transparent hover:text-[var(--fg)] transition-all duration-300 cursor-pointer"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
      </span>
      Talk to our agent
    </button>
  );
}

export function VoiceDemoModal() {
  const [open, setOpen] = useState(false);
  const [tick, setTick] = useState(0);
  const { status, turn, messages, volume, error, start, stop } = useVapi();

  // animation heartbeat while live
  useEffect(() => {
    if (status !== "live") return;
    const id = setInterval(() => setTick((t) => (t + 1) % 10000), 60);
    return () => clearInterval(id);
  }, [status]);

  // auto-start call when modal opens
  useEffect(() => {
    if (open && status === "idle") {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVT, handler);
    return () => window.removeEventListener(OPEN_EVT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stop();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, stop]);

  const close = () => {
    stop();
    setOpen(false);
  };

  // Orb scale: driven by mic volume when speaking, gentle breathing when listening/thinking
  const orbScale = useMemo(() => {
    if (status !== "live") return 1;
    if (turn === "speaking") return 1 + volume * 0.9;
    const breathe = 1 + Math.sin(tick * 0.08) * 0.03;
    return breathe;
  }, [status, turn, volume, tick]);

  // Ring pulse opacity
  const ringOpacity = useMemo(() => {
    if (turn === "speaking") return 0.35 + volume * 0.65;
    if (turn === "thinking") return 0.4 + Math.sin(tick * 0.25) * 0.3;
    return 0.25 + Math.sin(tick * 0.08) * 0.08;
  }, [turn, volume, tick]);

  const statusLabel: Record<Turn, string> = {
    listening: "Listening",
    speaking: "Speaking",
    thinking: "Thinking",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
          />
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-[var(--bg)] border border-[var(--line-3)] p-8 md:p-12 overflow-hidden"
          >
            {/* top bar */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col">
                <span className="label">MakAI · Live Demo Agent</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted)] mt-1">
                  {status === "idle" && "Ready"}
                  {status === "connecting" && "● Connecting…"}
                  {status === "live" && (
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--fg)] opacity-70" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--fg)]" />
                      </span>
                      Live · {statusLabel[turn]}
                    </span>
                  )}
                  {status === "ending" && "Ending…"}
                  {status === "error" && "Error"}
                </span>
              </div>
              <button
                onClick={close}
                className="label hover:text-[var(--fg)] cursor-pointer"
              >
                ESC ✕
              </button>
            </div>

            {/* ORB — the hero visual of the demo */}
            <div className="relative h-56 flex items-center justify-center mb-8">
              {/* outer pulse rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[var(--fg)]"
                  style={{
                    width: 180 + i * 40,
                    height: 180 + i * 40,
                    opacity:
                      status === "live" ? ringOpacity * (1 - i * 0.25) : 0,
                  }}
                  animate={{
                    scale: status === "live" ? [1, 1.06, 1] : 1,
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}

              {/* main orb */}
              <motion.div
                animate={{ scale: orbScale }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="relative h-32 w-32 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #f5f5f5 0%, #a3a3a3 45%, #333 80%, #0a0a0a 100%)",
                  boxShadow:
                    turn === "speaking"
                      ? `0 0 ${40 + volume * 120}px rgba(245,245,245,${0.3 + volume * 0.5})`
                      : turn === "thinking"
                        ? "0 0 60px rgba(245,245,245,0.2)"
                        : "0 0 40px rgba(245,245,245,0.15)",
                }}
              >
                {/* inner state indicator */}
                <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--bg)] font-semibold">
                  {status === "live" ? statusLabel[turn] : status === "connecting" ? "…" : "●"}
                </div>
              </motion.div>
            </div>

            {/* hint line */}
            <p className="text-center text-xs text-[var(--muted)] mb-8 h-4">
              {status === "connecting" && "Allow microphone access when prompted…"}
              {status === "live" && turn === "listening" && "Go ahead — I'm listening."}
              {status === "live" && turn === "speaking" && "Agent is speaking. Wait, then reply."}
              {status === "live" && turn === "thinking" && "Thinking…"}
              {status === "error" && "Something went wrong. Try again."}
            </p>

            {/* transcript */}
            <div className="h-40 overflow-y-auto border-t border-b border-[var(--line-2)] py-5 mb-8 space-y-3 text-sm pr-2">
              {messages.length === 0 && status !== "error" && (
                <p className="text-[var(--muted)] italic text-xs">
                  Transcript will appear here as you talk.
                </p>
              )}
              {messages.map((m, i) => (
                <div key={i} className="flex gap-3">
                  <span className="label w-16 shrink-0 pt-0.5">
                    {m.role === "user" ? "You" : "MakAI"}
                  </span>
                  <p className="text-[var(--muted-2)] leading-relaxed flex-1">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>

            {error && (
              <p className="text-xs text-[var(--muted)] mb-4">{error}</p>
            )}

            <div className="flex gap-3">
              {status === "idle" || status === "error" ? (
                <button
                  onClick={start}
                  className="flex-1 px-6 py-4 text-[13px] uppercase tracking-[0.18em] bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--muted-2)] transition-colors cursor-pointer"
                >
                  ● Start call
                </button>
              ) : (
                <button
                  onClick={close}
                  className="flex-1 px-6 py-4 text-[13px] uppercase tracking-[0.18em] border border-[var(--line-3)] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors cursor-pointer"
                >
                  ■ End call
                </button>
              )}
            </div>

            <p className="label mt-6 text-center">
              Uses your microphone · Powered by Vapi
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
