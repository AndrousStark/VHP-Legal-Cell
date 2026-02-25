import { setRequestLocale } from "next-intl/server";

export default async function StatsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="text-center">
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-maroon-dark">
          Case Statistics
        </h1>
        <p className="mt-4 text-lg text-saffron">Coming soon</p>
      </div>
    </div>
  );
}
