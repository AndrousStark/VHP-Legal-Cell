import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Playfair_Display, Noto_Serif_Devanagari, Noto_Sans_Devanagari, JetBrains_Mono, Yatra_One } from "next/font/google";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/lib/auth-context";
import { CommandPalette } from "@/components/search/CommandPalette";
import "@/styles/globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* ─── Google Fonts ─── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSerif = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const notoSans = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const yatra = Yatra_One({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-yatra",
  display: "swap",
});

/* ─── Metadata ─── */
export const metadata: Metadata = {
  title: {
    template: "%s | VHP Legal Cell",
    default: "VHP Legal Cell — विधि प्रकोष्ठ",
  },
  description:
    "Vishwa Hindu Parishad Legal Cell (Vidhi Prakoshtha) — Protecting Dharma, Serving Justice across India.",
  metadataBase: new URL("https://vhplegalcell.org"),
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/favicon.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/favicon.png`,
  },
  openGraph: {
    type: "website",
    siteName: "VHP Legal Cell — विधि प्रकोष्ठ",
    images: [{ url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/vhp-logo.jpg`, width: 512, height: 512, alt: "VHP Legal Cell" }],
  },
};

/* ─── Static Params for Build ─── */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ─── Layout ─── */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "hi" | "en")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load messages for the locale
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${playfair.variable} ${notoSerif.variable} ${notoSans.variable} ${jetbrains.variable} ${yatra.variable}`}
    >
      <head>
        {/* Preload Satoshi (self-hosted) */}
        <link
          rel="preload"
          href={`${basePath}/fonts/Satoshi-Variable.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Inline @font-face so basePath is applied for GitHub Pages */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
@font-face {
  font-family: "Satoshi";
  src: url("${basePath}/fonts/Satoshi-Variable.woff2") format("woff2");
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}
@font-face {
  font-family: "Satoshi";
  src: url("${basePath}/fonts/Satoshi-VariableItalic.woff2") format("woff2");
  font-weight: 300 900;
  font-display: swap;
  font-style: italic;
}`,
          }}
        />
      </head>
      <body className="grain-overlay">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            {children}
            <CommandPalette />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
