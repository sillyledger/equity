import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // jsdom (via isomorphic-dompurify) reads asset files off disk relative
  // to its own module location at runtime. Bundling it breaks that
  // resolution, so it has to stay external on the server.
  serverExternalPackages: ["isomorphic-dompurify", "jsdom"],
};

export default nextConfig;
