import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PillarsHero } from "@/components/pillars/PillarsHero";
import { TeamDirectory } from "@/components/pillars/TeamDirectory";

export const metadata: Metadata = {
  title: "Pillars of Justice | VHP Legal Cell",
  description:
    "Meet the advocates and legal leaders of VHP Legal Cell — national convenors, chetra coordinators, and dedicated lawyers protecting Hindu dharmic rights across India.",
  openGraph: {
    title: "Pillars of Justice | VHP Legal Cell",
    description:
      "Meet the legal team behind VHP's nationwide dharmic advocacy — from Supreme Court to district courts.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function PillarsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PillarsHero />
      <TeamDirectory />
    </>
  );
}
