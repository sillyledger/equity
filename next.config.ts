import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // jsdom (via isomorphic-dompurify) reads asset files off disk relative
  // to its own module location at runtime. Bundling it breaks that
  // resolution, so it has to stay external on the server.
  serverExternalPackages: ["isomorphic-dompurify", "jsdom"],
  // www is canonical. This only fires once the apex domain is actually
  // attached to this Vercel project and routed to this deployment — that
  // attachment happens in the Vercel dashboard (Project Settings ->
  // Domains), not in code. This redirect is a safety net on top of that,
  // not a replacement for it.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "equity.tw" }],
        destination: "https://www.equity.tw/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
