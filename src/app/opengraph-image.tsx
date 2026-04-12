import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MakAI — We build systems that grow your business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          <span>◉ MAKAI / SYS.01</span>
          <span>MMXXVI</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a3a3a3",
              marginBottom: 24,
            }}
          >
            AI Voice Agents · Automations · Custom Builds
          </div>
          <div
            style={{
              fontSize: 104,
              lineHeight: 0.95,
              letterSpacing: -3,
              fontWeight: 700,
              maxWidth: 980,
            }}
          >
            We build systems that grow your business.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #2a2a2a",
            paddingTop: 24,
            fontSize: 14,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          <span>Makai Holdings LLC</span>
          <span style={{ fontSize: 64, letterSpacing: 8, color: "#f5f5f5", fontWeight: 700 }}>
            MAKAI
          </span>
          <span>makai.ai</span>
        </div>
      </div>
    ),
    size,
  );
}
