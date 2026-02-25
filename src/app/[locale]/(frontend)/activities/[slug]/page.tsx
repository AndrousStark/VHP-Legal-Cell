import { ACTIVITIES } from "@/lib/mock-data";
import { routing } from "@/i18n/routing";
import ActivityDetailClient from "./ActivityDetailClient";

export function generateStaticParams() {
  const slugs = ACTIVITIES.map((a) => a.slug);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ActivityDetailClient slug={slug} />;
}
