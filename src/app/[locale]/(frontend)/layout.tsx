import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyTicker } from "@/components/layout/StickyTicker";
import { PageTransition } from "@/components/layout/PageTransition";

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <StickyTicker />
      <Header />
      {/* Spacer for fixed ticker (36px) + fixed header (80px) */}
      <div className="h-[116px]" aria-hidden="true" />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
    </>
  );
}
