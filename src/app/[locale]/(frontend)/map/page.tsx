import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { MapPageClient } from "@/components/map/MapPageClient";

export const metadata: Metadata = {
  title: "India Map | VHP Legal Cell",
  description:
    "Interactive 3-level India map showing VHP Legal Cell's presence across 12 Chetras, 35+ Prants and 700+ districts. Explore cases, teams and activities by region.",
  openGraph: {
    title: "India Map | VHP Legal Cell",
    description:
      "Interactive map of VHP Legal Cell's nationwide legal network — drill down from Chetra to Prant to district level.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MapPageClient />;
}
