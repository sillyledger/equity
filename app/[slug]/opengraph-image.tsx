import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1218",
          padding: "0 100px",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#e9edf1" }}>
          Equity
          <span style={{ color: "#7fb0d9" }}>.</span>
        </div>
        {post && (
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 44,
              fontWeight: 700,
              color: "#98a4b0",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {post.title}
          </div>
        )}
      </div>
    ),
    size,
  );
}
