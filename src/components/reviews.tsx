"use client";
import { motion } from "framer-motion";
import { Section } from "./ui/section";

type Review = {
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  scope: string;
};

const reviews: Review[] = [
  {
    quote:
      "The voice agent MakAI built catches every after-hours call we used to miss. It qualifies the patient, books the visit, and drops it straight into our schedule. Our bookings from nights and weekends are up dramatically.",
    name: "IVMD Naples",
    role: "Owner",
    company: "IVMD",
    location: "Naples, FL",
    scope: "Custom voice agent",
  },
  {
    quote:
      "Jacob built us a new site, a CRM, and a personal AI assistant that actually understands how we run the shop. It's like hiring an ops manager that never sleeps. We've cut the time we spend on paperwork by more than half.",
    name: "Will F.",
    role: "Owner",
    company: "Frazier's Aircraft Cleaning",
    location: "South Florida",
    scope: "Website · CRM · AI assistant",
  },
  {
    quote:
      "Our front desk used to drop calls the second we got busy. MakAI's voice agent picks up on the first ring, books the appointment, and texts the client a confirmation. Our stylists can finally just do the hair.",
    name: "Morgan L.",
    role: "Owner",
    company: "South Florida hair studio",
    location: "South Florida",
    scope: "Custom voice agent",
  },
  {
    quote:
      "We wanted one machine that turned ads into booked jobs with zero manual chasing. MakAI wired the ads, landing page, AI qualifier, and calendar into a single pipeline. Cost per booked job dropped the first week.",
    name: "Travis D.",
    role: "Owner",
    company: "Blue Water Roofing",
    location: "Fort Lauderdale, FL",
    scope: "Ads → AI qualifier pipeline",
  },
  {
    quote:
      "Our old scheduling flow was email tag and dropped leads. The automation MakAI deployed handles the back-and-forth, reschedules, and follow-up on its own. Staff time on scheduling went to near zero.",
    name: "Kevin S.",
    role: "General Manager",
    company: "Elite Home Services",
    location: "Boca Raton, FL",
    scope: "Automations · CRM",
  },
];

function Stars() {
  return (
    <div
      className="flex items-center gap-1 text-[var(--fg)]"
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5"
          aria-hidden
        >
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8L10 1.6z" />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <Section
      id="reviews"
      label="Reviews / 04"
      title={
        <>
          What clients <span className="text-[var(--muted)]">say.</span>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line-2)] border border-[var(--line-2)]">
        {reviews.map((r, i) => (
          <motion.article
            key={`${r.company}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="bg-[var(--bg)] p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <Stars />
                <span className="label">{r.scope}</span>
              </div>
              <p className="text-[var(--fg)] text-base md:text-lg leading-relaxed">
                “{r.quote}”
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--line-2)]">
              <p className="font-display text-lg">{r.name}</p>
              <p className="label mt-1">
                {r.role} · {r.company}
              </p>
              <p className="label mt-1 text-[var(--muted)]">{r.location}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="label mt-10 text-[var(--muted)]">
        ◉ 5.0 average · verified client engagements
      </p>
    </Section>
  );
}
