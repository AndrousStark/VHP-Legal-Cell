import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/VHP-Legal-Cell" : "";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages serves from /VHP-Legal-Cell/ subpath
  basePath,
  assetPrefix: isGitHubPages ? "/VHP-Legal-Cell/" : undefined,

  // Expose basePath to client code
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

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
};

export default withNextIntl(nextConfig);
