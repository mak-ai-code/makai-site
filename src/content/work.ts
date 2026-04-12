export type Work = {
  title: string;
  kind: string;
  pitch: string;
  href: string;
};

export const work: Work[] = [
  {
    title: "Vault Med Spa",
    kind: "Landing Page · Med Spa",
    pitch:
      "High-converting landing page for a luxury med spa. Service breakdowns, social proof, FAQ, and a booking flow that turns ad traffic into consultations.",
    href: "/demos/vault-med-spa",
  },
  {
    title: "AutoFlow Dashboard",
    kind: "CRM · Automation",
    pitch:
      "AI-powered CRM dashboard with a kanban pipeline, live activity feed, and real-time stats. Built to show how voice agents and automations work behind the scenes.",
    href: "/demos/autoflow-dashboard",
  },
  {
    title: "Frazier's Aircraft Cleaning",
    kind: "Website · Aviation",
    pitch:
      "Professional site for an aircraft detailing company. Clean design, service breakdowns, and a quote request flow that converts.",
    href: "/demos/fraziers-aircraft",
  },
  {
    title: "MakAI Voice Agent",
    kind: "Voice Agent · Demo",
    pitch:
      "The live AI voice agent on this site. Try it — click 'Talk to our agent' and have a real conversation.",
    href: "#voice-demo",
  },
];
