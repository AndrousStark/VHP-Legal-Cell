import { setRequestLocale } from "next-intl/server";
import { LoginForm } from "@/components/auth/LoginForm";
import Image from "next/image";
import { assetPath } from "@/lib/utils";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen">
      {/* Left Panel — Image + Branding (hidden on mobile) */}
      <div className="relative hidden w-1/2 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <Image
          src={assetPath("/images/supreme-court.jpg")}
          alt="Supreme Court of India"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-maroon-dark/90 via-maroon/80 to-maroon-dark/95" />

        {/* Branding overlay */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-12 text-center">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-gold/40">
              <Image src={assetPath("/images/vhp-logo.jpg")} alt="VHP" fill className="object-cover" sizes="64px" />
            </div>
            <div className="relative h-14 w-14">
              <Image src={assetPath("/images/legal-logo.png")} alt="Legal Cell" fill className="object-contain" sizes="56px" />
            </div>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-cream">
              VHP Legal Cell
            </h2>
            <p className="mt-1 font-[family-name:var(--font-noto-serif)] text-lg text-gold/80">
              विधि प्रकोष्ठ
            </p>
          </div>
          <p className="max-w-sm font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-cream/60">
            धर्मो रक्षति रक्षितः — Dharma protects those who protect it.
          </p>
          <div className="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex w-full items-center justify-center bg-gradient-to-br from-maroon-dark via-maroon to-maroon-dark px-4 py-12 lg:w-1/2">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 lg:hidden">
          <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-saffron/6 blur-[120px]" />
          <div className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-gold/5 blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
