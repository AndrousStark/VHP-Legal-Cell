import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { ResourcesContent } from "@/components/resources/ResourcesContent";

export const metadata: Metadata = {
  title: "Resources | VHP Legal Cell",
  description:
    "Legal resources, downloadable PDFs, act summaries, PIL templates, and reference materials curated by VHP Legal Cell for advocates and citizens.",
  openGraph: {
    title: "Resources | VHP Legal Cell",
    description:
      "Download PIL templates, act summaries and legal reference materials from VHP Legal Cell.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ResourcesHero />
      <ResourcesContent />
    </>
  );
}
