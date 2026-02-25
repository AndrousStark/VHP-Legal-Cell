import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsTickerSection } from "@/components/home/NewsTickerSection";
import { BentoGridSection } from "@/components/home/BentoGridSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TeamCarouselSection } from "@/components/home/TeamCarouselSection";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "VHP Legal Cell — विधि प्रकोष्ठ | Protecting Dharma, Serving Justice",
  description:
    "Official website of Vishwa Hindu Parishad Legal Cell (Vidhi Prakoshtha). Track 1200+ cases, 150+ judgments, legal resources across 12 Khetras of India.",
  openGraph: {
    title: "VHP Legal Cell — Protecting Dharma, Serving Justice",
    description:
      "The first-ever digital platform of VHP's legal wing. Cases, judgments, activities & team across India.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <OrganizationJsonLd locale={locale} />

      {/* Section 1: Cinematic Hero (100vh) */}
      <HeroSection />

      {/* Section 2: 4-Directional News Ticker */}
      <NewsTickerSection />

      {/* Section 3: Bento Grid — Feature Showcase */}
      <BentoGridSection />

      {/* Section 4: Statistics Counter */}
      <StatsSection />

      {/* Section 5: National Team Carousel */}
      <TeamCarouselSection />

      {/* Section 6: Recent Activities (3D Card Grid) */}
      <ActivitiesSection />

      {/* Section 7: Testimonials */}
      <TestimonialsSection />

      {/* Section 8: CTA + (Footer is in layout) */}
      <CTASection />
    </>
  );
}
