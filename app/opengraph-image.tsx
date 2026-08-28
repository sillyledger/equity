import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1218",
        }}
      >
        <div style={{ display: "flex", fontSize: 160, fontWeight: 800, color: "#e9edf1" }}>
          Equity
          <span style={{ color: "#7fb0d9" }}>.</span>
        </div>
      </div>
    ),
    size,
  );
}
