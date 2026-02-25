import { setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/about/AboutHero";
import { VisionMission } from "@/components/about/VisionMission";
import { ProcessFlow } from "@/components/about/ProcessFlow";
import { HistoryTimeline } from "@/components/about/HistoryTimeline";
import { OrgStructurePreview } from "@/components/about/OrgStructurePreview";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <VisionMission />
      <ProcessFlow />
      <HistoryTimeline />
      <OrgStructurePreview />
    </>
  );
}
