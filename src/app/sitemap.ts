import type { MetadataRoute } from "next";
import { ACTIVITIES } from "@/lib/mock-data";
import { TEAM_MEMBERS } from "@/lib/mock-data";

export const dynamic = "force-static";

const BASE_URL = "https://vhplegalcell.org";

const STATIC_ROUTES = [
  "",
  "/about",
  "/about/structure",
  "/map",
  "/pillars",
  "/cases",
  "/cases/stats",
  "/judgments",
  "/news",
  "/activities",
  "/activities/calendar",
  "/activities/gallery",
  "/contact",
  "/resources",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["hi", "en"];
  const entries: MetadataRoute.Sitemap = [];

  // Static routes
  for (const route of STATIC_ROUTES) {
    for (const locale of locales) {
      const url =
        locale === "hi"
          ? `${BASE_URL}${route}`
          : `${BASE_URL}/${locale}${route}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  // Dynamic activity routes
  for (const activity of ACTIVITIES) {
    for (const locale of locales) {
      const url =
        locale === "hi"
          ? `${BASE_URL}/activities/${activity.slug}`
          : `${BASE_URL}/${locale}/activities/${activity.slug}`;
      entries.push({
        url,
        lastModified: new Date(activity.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Dynamic pillar (team member) routes
  for (const member of TEAM_MEMBERS) {
    for (const locale of locales) {
      const url =
        locale === "hi"
          ? `${BASE_URL}/pillars/${member.slug}`
          : `${BASE_URL}/${locale}/pillars/${member.slug}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
