import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { JudgmentHero } from "@/components/judgments/JudgmentHero";
import { JudgmentDirectory } from "@/components/judgments/JudgmentDirectory";

export const metadata: Metadata = {
  title: "Judgment Library | VHP Legal Cell",
  description:
    "Browse landmark judgments and court orders on Hindu dharmic issues — Ayodhya, Sabarimala, cow protection, temple rights. Searchable library with full-text PDFs.",
  openGraph: {
    title: "Judgment Library | VHP Legal Cell",
    description:
      "150+ landmark judgments on Hindu dharmic legal issues. Searchable library with full-text court orders.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function JudgmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JudgmentHero />
      <JudgmentDirectory />
    </>
  );
}
