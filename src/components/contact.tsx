"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "./ui/section";

type State = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setErr(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Failed");
      setState("sent");
      form.reset();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      setState("error");
    }
  }

  return (
    <Section
      id="contact"
      label="Contact / 04"
      title={<>Let&apos;s build your <span className="text-[var(--muted)]">system.</span></>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-[var(--muted-2)] text-base leading-relaxed max-w-md mb-10">
            Tell us what&apos;s broken and what you&apos;re trying to grow. We&apos;ll
            reply within 24 hours with a free 30-minute discovery call.
          </p>
          <div className="space-y-6 label">
            <div className="flex justify-between border-b border-[var(--line-2)] pb-3">
              <span>Email</span>
              <span className="text-[var(--fg)] normal-case tracking-normal">
                hello@makai.ai
              </span>
            </div>
            <div className="flex justify-between border-b border-[var(--line-2)] pb-3">
              <span>Based</span>
              <span className="text-[var(--fg)] normal-case tracking-normal">
                South Florida · Worldwide
              </span>
            </div>
            <div className="flex justify-between border-b border-[var(--line-2)] pb-3">
              <span>Parent</span>
              <span className="text-[var(--fg)] normal-case tracking-normal">
                Makai Holdings
              </span>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-[var(--line-2)] p-8 md:p-10 space-y-6"
        >
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Company" name="company" />
          <TextArea label="What do you want to build?" name="message" required />
          <button
            type="submit"
            disabled={state === "sending" || state === "sent"}
            className="w-full px-6 py-4 text-[13px] uppercase tracking-[0.18em] bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--muted-2)] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === "idle" && "Send it →"}
            {state === "sending" && "Sending…"}
            {state === "sent" && "✓ Got it — we'll be in touch"}
            {state === "error" && "Retry"}
          </button>
          {err && <p className="text-xs text-[var(--muted)]">{err}</p>}
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="label block mb-2">{label}{required && " *"}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-[var(--line-3)] py-2 text-[var(--fg)] focus:border-[var(--fg)] outline-none transition-colors"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="label block mb-2">{label}{required && " *"}</span>
      <textarea
        name={name}
        rows={4}
        required={required}
        className="w-full bg-transparent border border-[var(--line-3)] p-3 text-[var(--fg)] focus:border-[var(--fg)] outline-none transition-colors resize-none"
      />
    </label>
  );
}
