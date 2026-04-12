"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const services = [
  {
    icon: "✦",
    title: "Exterior Wash",
    price: "from $800",
    description:
      "Complete exterior cleaning, degreasing, and brightwork polishing. Safe for all paint types and composite surfaces.",
  },
  {
    icon: "◆",
    title: "Interior Detail",
    price: "from $1,200",
    description:
      "Deep clean carpets, leather conditioning, sanitization, and cockpit detailing. FAA-compliant products throughout.",
  },
  {
    icon: "◈",
    title: "Paint Correction",
    price: "from $2,500",
    description:
      "Oxidation removal, compound polish, and UV sealant application. Restores factory-fresh gloss and depth.",
  },
  {
    icon: "⬡",
    title: "Ceramic Coating",
    price: "from $4,000",
    description:
      "Multi-year paint protection with a hydrophobic finish. Reduces drag, repels contaminants, and simplifies maintenance.",
  },
];

const trustBadges = [
  { icon: "✓", label: "FAA Compliant" },
  { icon: "⛨", label: "Fully Insured" },
  { icon: "✈", label: "100+ Aircraft Serviced" },
  { icon: "♻", label: "Eco-Friendly Products" },
];

const whyUs = [
  {
    title: "15+ Years Experience",
    description:
      "Our team has serviced everything from single-engine Cessnas to long-range Gulfstreams. We know aircraft inside and out.",
  },
  {
    title: "Hangar or On-Site Service",
    description:
      "We come to you. Whether your aircraft is at a private hangar, FBO, or maintenance facility, we bring the full operation.",
  },
  {
    title: "Satisfaction Guaranteed",
    description:
      "Every job is backed by our 100% satisfaction guarantee. If it doesn't meet your standard, we make it right — no questions asked.",
  },
];

const gallery = [
  { label: "Cessna Citation CJ3", tag: "Exterior Wash" },
  { label: "Gulfstream G650", tag: "Ceramic Coating" },
  { label: "King Air 350", tag: "Interior Detail" },
  { label: "Pilatus PC-12", tag: "Paint Correction" },
  { label: "Bombardier Challenger 350", tag: "Full Detail" },
  { label: "Embraer Phenom 300", tag: "Exterior Polish" },
];

export default function FraziersAircraftPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    aircraftType: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen bg-white text-slate-900 font-[family-name:var(--font-inter)]"
      style={{ position: "relative", zIndex: 10 }}
    >
      {/* ── Navigation ── */}
      <nav className="bg-[#0f172a] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>←</span> Back to MakAI
            </Link>
            <span className="hidden sm:block w-px h-5 bg-slate-700" />
            <span className="hidden sm:block text-sm font-bold tracking-[0.2em] uppercase">
              Frazier&apos;s Aircraft Cleaning
            </span>
          </div>
          <a
            href="#quote"
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Request a Quote
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden">
        {/* Geometric background pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(30deg, #94a3b8 12%, transparent 12.5%, transparent 87%, #94a3b8 87.5%, #94a3b8),
                linear-gradient(150deg, #94a3b8 12%, transparent 12.5%, transparent 87%, #94a3b8 87.5%, #94a3b8),
                linear-gradient(30deg, #94a3b8 12%, transparent 12.5%, transparent 87%, #94a3b8 87.5%, #94a3b8),
                linear-gradient(150deg, #94a3b8 12%, transparent 12.5%, transparent 87%, #94a3b8 87.5%, #94a3b8),
                linear-gradient(60deg, #94a3b877 25%, transparent 25.5%, transparent 75%, #94a3b877 75%, #94a3b877),
                linear-gradient(60deg, #94a3b877 25%, transparent 25.5%, transparent 75%, #94a3b877 75%, #94a3b877)`,
              backgroundSize: "80px 140px",
              backgroundPosition:
                "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
            }}
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 sm:py-36 text-center">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="text-slate-400 text-sm tracking-[0.25em] uppercase mb-6"
          >
            South Florida&apos;s Premier Aviation Detailing
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto"
          >
            Premium Aircraft Detailing.
            <br />
            <span className="text-blue-400">Uncompromised Quality.</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-slate-300 text-lg max-w-2xl mx-auto mt-6"
          >
            FAA-compliant detailing services for private and commercial
            aircraft. From single-engine planes to heavy jets, we deliver a
            finish that meets the highest standards in aviation.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <a
              href="#quote"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              Request a Quote
            </a>
            <a
              href="#services"
              className="border border-slate-500 hover:border-white text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              View Services
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.label}
                variants={fadeUp}
                className="flex items-center justify-center gap-3 border border-slate-200 bg-white rounded-xl px-5 py-4"
              >
                <span className="text-xl text-blue-500">{badge.icon}</span>
                <span className="text-sm font-semibold text-slate-700">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Our Services
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Comprehensive aircraft cleaning and protection services tailored
              to your needs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((svc) => (
              <motion.div
                key={svc.title}
                variants={fadeUp}
                className="border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:border-slate-300 transition-all group"
              >
                <span className="text-3xl text-blue-500 block mb-5">
                  {svc.icon}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {svc.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {svc.description}
                </p>
                <p className="text-blue-500 font-semibold text-sm">
                  {svc.price}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3">
              The Frazier&apos;s Difference
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Why Choose Us
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {whyUs.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-white border border-slate-200 rounded-2xl p-8 text-center"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3">
              Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Recent Projects
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              A selection of recent aircraft we&apos;ve had the privilege of
              servicing.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {gallery.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="group relative aspect-[4/3] bg-slate-200 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Placeholder gradient simulating a photo */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-200 to-slate-100 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <p className="text-white font-bold text-base mt-1">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact / Quote Form ── */}
      <section id="quote" className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-3">
              Get Started
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Request a Quote
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Tell us about your aircraft and the services you need. We&apos;ll
              get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-5 gap-10"
          >
            {/* Left — Contact Info */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 mt-0.5">☎</span>
                    <div>
                      <p className="font-semibold text-slate-800">Phone</p>
                      <p>(954) 555-0173</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 mt-0.5">✉</span>
                    <div>
                      <p className="font-semibold text-slate-800">Email</p>
                      <p>info@fraziersaircraft.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500 mt-0.5">◉</span>
                    <div>
                      <p className="font-semibold text-slate-800">Location</p>
                      <p>
                        Fort Lauderdale Executive Airport
                        <br />
                        Fort Lauderdale, FL 33309
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Monday — Friday</span>
                    <span className="font-medium text-slate-800">
                      7:00 AM — 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-slate-800">
                      8:00 AM — 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-slate-800">
                      By Appointment
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.form
              variants={fadeUp}
              onSubmit={(e) => e.preventDefault()}
              className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Frazier"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(954) 555-0000"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Aircraft Type
                  </label>
                  <input
                    type="text"
                    name="aircraftType"
                    value={formData.aircraftType}
                    onChange={handleChange}
                    placeholder="e.g. Cessna Citation CJ3"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Service Needed
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Select a service...</option>
                  <option value="exterior">Exterior Wash</option>
                  <option value="interior">Interior Detail</option>
                  <option value="paint">Paint Correction</option>
                  <option value="ceramic">Ceramic Coating</option>
                  <option value="full">Full Detail Package</option>
                  <option value="other">Other / Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your aircraft and any specific needs..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors text-sm"
              >
                Submit Quote Request
              </button>
              <p className="text-xs text-slate-400 text-center">
                We typically respond within 24 business hours.
              </p>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-bold tracking-[0.2em] uppercase">
                Frazier&apos;s Aircraft Cleaning
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Serving South Florida&apos;s Aviation Community
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
              <a href="#quote" className="hover:text-white transition-colors">
                Get a Quote
              </a>
              <span className="hidden sm:block w-px h-4 bg-slate-700" />
              <Link
                href="/"
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
              >
                <span className="text-xs border border-slate-700 rounded px-2 py-0.5">
                  Built by MakAI
                </span>
              </Link>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-6 text-center">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Frazier&apos;s Aircraft
              Cleaning. All rights reserved. This is a demo website.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
