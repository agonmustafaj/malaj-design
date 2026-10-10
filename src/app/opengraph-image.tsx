import { ImageResponse } from "next/og";

export const alt = "Malaj Design — Andi Malaj, Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F3EE",
          color: "#111111",
          padding: "68px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 5 }}>MALAJ DESIGN</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 86, lineHeight: 0.9, letterSpacing: -3 }}>
          <div style={{ display: "flex" }}>Andi Malaj</div>
          <div style={{ display: "flex" }}>Creative Designer</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#5C5C58" }}>
          Identity, posters, mascot, and stationery
        </div>
      </div>
    ),
    { ...size },
  );
}
