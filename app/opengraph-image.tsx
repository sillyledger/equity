import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Placeholder OG image — flat brand background, no artwork yet.
// Swap this out once real social-card art is designed.
export default function OpengraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#171716" }} />,
    size,
  );
}
