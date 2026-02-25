import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ActivitiesHero } from "@/components/activities/ActivitiesHero";
import { ActivitiesDirectory } from "@/components/activities/ActivitiesDirectory";

export const metadata: Metadata = {
  title: "Activities & Events | VHP Legal Cell",
  description:
    "Seminars, legal clinics, shiksha vargs, workshops and rallies organized by VHP Legal Cell across India. Upcoming events and past activities archive.",
  openGraph: {
    title: "Activities & Events | VHP Legal Cell",
    description:
      "Explore seminars, legal clinics, training programs and events by VHP Legal Cell nationwide.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ActivitiesHero />
      <ActivitiesDirectory />
    </>
  );
}
