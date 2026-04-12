"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Animate-on-scroll wrapper                                         */
/* ------------------------------------------------------------------ */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const services = [
  {
    name: "Botox",
    price: "$12/unit",
    description:
      "Smooth fine lines and wrinkles with precision-administered Botox injections for a naturally refreshed look.",
  },
  {
    name: "Dermal Fillers",
    price: "From $650",
    description:
      "Restore volume, sculpt contours, and enhance your natural features with premium hyaluronic acid fillers.",
  },
  {
    name: "Luxury Facials",
    price: "From $150",
    description:
      "Medical-grade facials tailored to your skin type, combining clinical actives with a spa-like experience.",
  },
  {
    name: "IV Therapy",
    price: "From $199",
    description:
      "Replenish vitamins and hydration with our custom IV drip formulas designed for beauty, energy, and recovery.",
  },
];

const testimonials = [
  {
    initials: "SM",
    name: "Sarah M.",
    quote:
      "Vault completely transformed my skin. The staff is incredibly professional and the results speak for themselves. I've never felt more confident.",
    bg: "bg-[#c9a96e]/10",
  },
  {
    initials: "JR",
    name: "Jessica R.",
    quote:
      "I was nervous about fillers but the injector at Vault made me feel so comfortable. My lips look amazing — subtle and natural, exactly what I wanted.",
    bg: "bg-[#e8dcc8]/40",
  },
  {
    initials: "AP",
    name: "Amanda P.",
    quote:
      "The IV therapy session was a game-changer before my wedding. I looked and felt incredible. Vault is my go-to for everything now.",
    bg: "bg-[#c9a96e]/10",
  },
  {
    initials: "KL",
    name: "Kayla L.",
    quote:
      "Best med spa experience in South Florida, hands down. Clean facility, knowledgeable staff, and results that actually last.",
    bg: "bg-[#e8dcc8]/40",
  },
];

const faqs = [
  {
    q: "Is Botox safe?",
    a: "Yes. Botox has been FDA-approved for cosmetic use since 2002 and has an excellent safety profile. All of our injectors are board-certified medical professionals with years of experience. We conduct a thorough consultation before any treatment.",
  },
  {
    q: "How long do fillers last?",
    a: "Most hyaluronic acid fillers last between 6 and 18 months depending on the product used and the treatment area. Lip fillers typically last 6–9 months, while cheek and jawline fillers can last 12–18 months.",
  },
  {
    q: "What should I expect during my first visit?",
    a: "Your first visit begins with a complimentary consultation where we discuss your goals, review your medical history, and create a customized treatment plan. If you choose to proceed same-day, most treatments take 15–45 minutes.",
  },
  {
    q: "Do you offer financing?",
    a: "Yes! We partner with CareCredit and Cherry to offer flexible monthly payment plans with 0% APR options. We also accept HSA/FSA cards for qualifying treatments.",
  },
  {
    q: "How do I book an appointment?",
    a: 'You can book online 24/7 using our "Book Now" button, call us at (954) 555-0123, or send us a DM on Instagram @vaultmedspa. We typically have same-week availability.',
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function VaultMedSpaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white text-[#1a1a1a] min-h-screen font-sans selection:bg-[#c9a96e]/30">
      {/* ---- Top Bar ---- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-[#c9a96e] transition-colors flex items-center gap-1.5"
          >
            <span aria-hidden>&#8592;</span> Back to MakAI
          </Link>

          <span className="absolute left-1/2 -translate-x-1/2 text-lg tracking-[0.25em] uppercase font-serif font-medium text-[#1a1a1a]">
            Vault
          </span>

          <a
            href="#book"
            className="rounded-full bg-[#c9a96e] px-5 py-2 text-sm font-medium text-white hover:bg-[#b8954f] transition-colors"
          >
            Book Now
          </a>
        </div>
      </header>

      {/* ---- Hero ---- */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf8f5] via-white to-white">
        {/* subtle decorative ring */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-[#c9a96e]/10" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full border border-[#c9a96e]/5" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c9a96e]"
          >
            Premium Aesthetics &middot; South Florida
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-serif text-5xl leading-tight tracking-tight sm:text-6xl md:text-7xl"
          >
            Look Your Best.
            <br />
            Feel Your Best.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto mt-6 max-w-xl text-lg text-neutral-500 leading-relaxed"
          >
            Vault Med Spa delivers world-class aesthetic treatments in a
            boutique setting. From injectables to IV therapy, every visit is
            tailored to help you look and feel your absolute best.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-10"
          >
            <a
              href="#book"
              className="inline-block rounded-full bg-[#c9a96e] px-10 py-4 text-base font-medium text-white shadow-lg shadow-[#c9a96e]/20 hover:bg-[#b8954f] hover:shadow-xl hover:shadow-[#c9a96e]/30 transition-all duration-300"
            >
              Book Your Free Consultation
            </a>
          </motion.div>
        </div>
      </section>

      {/* ---- Services ---- */}
      <section className="bg-[#fafafa] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#c9a96e] mb-3">
              Our Services
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Treatments We Offer
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s, i) => (
              <FadeIn key={s.name} delay={i * 0.1}>
                <div className="group rounded-2xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/60 hover:border-[#c9a96e]/30">
                  <div className="flex items-start justify-between">
                    <h3 className="font-serif text-2xl">{s.name}</h3>
                    <span className="rounded-full bg-[#c9a96e]/10 px-4 py-1 text-sm font-medium text-[#c9a96e]">
                      {s.price}
                    </span>
                  </div>
                  <p className="mt-3 text-neutral-500 leading-relaxed">
                    {s.description}
                  </p>
                  <a
                    href="#book"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#c9a96e] hover:text-[#b8954f] transition-colors"
                  >
                    Learn More
                    <span
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden
                    >
                      &rarr;
                    </span>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Social Proof ---- */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#c9a96e] mb-3">
              Testimonials
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              What Our Patients Say
            </h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div className="rounded-2xl border border-neutral-100 bg-[#fafafa] p-8">
                  {/* stars */}
                  <p className="text-[#c9a96e] text-lg tracking-widest mb-4">
                    ★★★★★
                  </p>
                  <p className="text-neutral-600 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-[#c9a96e] ${t.bg}`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-neutral-400">
                        Verified Patient
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Before / After ---- */}
      <section className="bg-[#fafafa] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#c9a96e] mb-3">
              Results
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Real Results, Real Confidence
            </h2>
          </FadeIn>

          <div className="grid gap-8 sm:grid-cols-3">
            {["Botox — Forehead Lines", "Lip Fillers — Volume", "Facial — Glow"].map(
              (label, i) => (
                <FadeIn key={label} delay={i * 0.1}>
                  <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                    <div className="grid grid-cols-2">
                      <div className="flex aspect-[4/5] items-center justify-center bg-neutral-100 text-sm text-neutral-400 font-medium">
                        Before
                      </div>
                      <div className="flex aspect-[4/5] items-center justify-center bg-neutral-200/60 text-sm text-neutral-500 font-medium">
                        After
                      </div>
                    </div>
                    <p className="px-5 py-4 text-center text-sm font-medium text-neutral-600">
                      {label}
                    </p>
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="py-24 sm:py-32" id="faq">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#c9a96e] mb-3">
              FAQ
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Common Questions
            </h2>
          </FadeIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="rounded-xl border border-neutral-200 bg-[#fafafa] overflow-hidden transition-colors hover:border-[#c9a96e]/30">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="font-medium pr-4">{faq.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 text-xl text-[#c9a96e]"
                      >
                        +
                      </motion.span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-neutral-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- CTA / Book Section ---- */}
      <section
        id="book"
        className="bg-gradient-to-b from-[#faf8f5] to-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-neutral-500 leading-relaxed">
              Book your free consultation today and let our expert team create a
              personalized treatment plan just for you.
            </p>
            <a
              href="tel:+19545550123"
              className="mt-8 inline-block rounded-full bg-[#c9a96e] px-10 py-4 text-base font-medium text-white shadow-lg shadow-[#c9a96e]/20 hover:bg-[#b8954f] hover:shadow-xl hover:shadow-[#c9a96e]/30 transition-all duration-300"
            >
              Book Your Free Consultation
            </a>
            <p className="mt-4 text-sm text-neutral-400">
              Or call us: (954) 555-0123
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="font-serif text-lg tracking-[0.2em] uppercase">
                Vault Med Spa
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                123 Las Olas Blvd, Fort Lauderdale, FL 33301
              </p>
              <p className="text-sm text-neutral-400">(954) 555-0123</p>
            </div>

            <Link
              href="/"
              className="group flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm text-neutral-500 hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-all"
            >
              Built by
              <span className="font-semibold text-[#1a1a1a] group-hover:text-[#c9a96e] transition-colors">
                MakAI
              </span>
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-neutral-300">
            &copy; {new Date().getFullYear()} Vault Med Spa. All rights
            reserved. This is a demo site.
          </p>
        </div>
      </footer>

      {/* ---- Sticky Mobile CTA ---- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 backdrop-blur-md p-4 sm:hidden">
        <a
          href="#book"
          className="block w-full rounded-full bg-[#c9a96e] py-3.5 text-center text-sm font-medium text-white shadow-lg shadow-[#c9a96e]/20"
        >
          Book Your Free Consultation
        </a>
      </div>
    </div>
  );
}
