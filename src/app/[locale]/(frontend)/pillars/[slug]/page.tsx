import { TEAM_MEMBERS } from "@/lib/mock-data";
import { routing } from "@/i18n/routing";
import PillarDetailClient from "./PillarDetailClient";

export function generateStaticParams() {
  const slugs = TEAM_MEMBERS.map((m) => m.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function PillarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PillarDetailClient slug={slug} />;
}
