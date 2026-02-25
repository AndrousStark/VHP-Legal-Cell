import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsGrid } from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "News & Insights | VHP Legal Cell",
  description:
    "Latest news, press releases, court updates and media coverage of VHP Legal Cell's legal advocacy for Hindu dharmic causes across India.",
  openGraph: {
    title: "News & Insights | VHP Legal Cell",
    description:
      "Stay updated with the latest court verdicts, press releases and media coverage from VHP Legal Cell.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <NewsHero />
      <NewsGrid />
    </>
  );
}
