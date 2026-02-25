import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | VHP Legal Cell",
  description:
    "Get in touch with VHP Legal Cell (Vidhi Prakoshtha). Reach our national office, khetra coordinators, or submit a legal query. We are here to help protect Hindu dharmic rights.",
  openGraph: {
    title: "Contact Us | VHP Legal Cell",
    description:
      "Contact VHP Legal Cell — reach our national office or submit a legal query.",
    type: "website",
    siteName: "VHP Legal Cell",
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
