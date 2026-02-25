interface OrganizationLdProps {
  locale: string;
}

export function OrganizationJsonLd({ locale }: OrganizationLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name:
      locale === "hi"
        ? "विश्व हिन्दू परिषद् विधि प्रकोष्ठ"
        : "VHP Legal Cell",
    alternateName: "Vidhi Prakoshtha",
    url: "https://vhplegalcell.org",
    description:
      "Legal advocacy wing of Vishwa Hindu Parishad protecting Hindu dharmic rights across India",
    parentOrganization: {
      "@type": "Organization",
      name: "Vishwa Hindu Parishad",
      url: "https://vhp.org",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    availableLanguage: ["hi", "en"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
