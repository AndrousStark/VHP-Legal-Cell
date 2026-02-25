import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages serves from /VHP-Legal-Cell/ subpath
  basePath: isGitHubPages ? "/VHP-Legal-Cell" : "",
  assetPrefix: isGitHubPages ? "/VHP-Legal-Cell/" : undefined,

  images: {
    unoptimized: true, // Required for static export (no image server)
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  experimental: {
    viewTransition: true,
  },
  // Note: Custom headers don't apply in static export.
  // Security headers should be configured at the hosting level.
};

export default withNextIntl(nextConfig);
