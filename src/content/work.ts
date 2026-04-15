export type Work = {
  title: string;
  kind: string;
  pitch: string;
  href: string;
};

export const work: Work[] = [
  {
    title: "MakAI Command",
    kind: "Custom Software · Business OS",
    pitch:
      "Internal app that tracks every business under one roof — daily tasks, progress analytics, brain dumps, and a built-in music player. Built for the founder, by the founder.",
    href: "/demos/makai-command",
  },
  {
    title: "MakAI Sales Platform",
    kind: "Custom Software · Sales",
    pitch:
      "Full sales team management platform — pipeline tracking, rep assignments, and performance dashboards. Built to scale outbound ops.",
    href: "/demos/makai-sales-platform",
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
    href: "/demos/vault-med-spa",
  },
];
