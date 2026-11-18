import type { NextConfig } from "next";

// Static export for GitHub Pages. Host www/http → HTTPS apex redirects are
// handled by Pages (Enforce HTTPS + apex CNAME), not next.config redirects/
// headers — those APIs are unsupported with `output: "export"`.
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
