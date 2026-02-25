import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CaseHero } from "@/components/cases/CaseHero";
import { CaseDirectory } from "@/components/cases/CaseDirectory";

export const metadata: Metadata = {
  title: "Case Tracker | VHP Legal Cell",
  description:
    "Track Hindu dharmic legal cases across India — temple rights, cow protection, anti-conversion, Waqf disputes & more. Real-time status updates from Supreme Court and High Courts.",
  openGraph: {
    title: "Case Tracker | VHP Legal Cell",
    description:
      "Track 1200+ Hindu dharmic legal cases across Supreme Court and High Courts of India.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CaseHero />
      <CaseDirectory />
    </>
  );
}
