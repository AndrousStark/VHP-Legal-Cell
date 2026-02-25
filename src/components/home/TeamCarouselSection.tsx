"use client";

import { useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Link } from "@/i18n/routing";
import { cn, assetPath } from "@/lib/utils";

/* ─── Mock team data — replace with API ─── */
const NATIONAL_TEAM = [
  { id: 1, name: "Dr. Abhishek Atrey", nameHi: "डॉ. अभिषेक आत्रेय", designation: "National Convenor", designationHi: "राष्ट्रीय संयोजक", slug: "dr-abhishek-atrey", photo: null },
  { id: 2, name: "Adv. Ramesh Kumar", nameHi: "अधि. रमेश कुमार", designation: "Vice President", designationHi: "उपाध्यक्ष", slug: "ramesh-kumar", photo: null },
  { id: 3, name: "Justice (Retd.) Mohan Lal", nameHi: "न्या. (से.नि.) मोहन लाल", designation: "Patron", designationHi: "संरक्षक", slug: "mohan-lal", photo: null },
  { id: 4, name: "Adv. Priya Sharma", nameHi: "अधि. प्रिया शर्मा", designation: "Co-Convenor", designationHi: "सह-संयोजक", slug: "priya-sharma", photo: null },
  { id: 5, name: "Adv. Suresh Patel", nameHi: "अधि. सुरेश पटेल", designation: "National Secretary", designationHi: "राष्ट्रीय सचिव", slug: "suresh-patel", photo: null },
  { id: 6, name: "Justice (Retd.) Hari Om", nameHi: "न्या. (से.नि.) हरि ओम", designation: "Patron", designationHi: "संरक्षक", slug: "hari-om", photo: null },
  { id: 7, name: "Adv. Kavita Mishra", nameHi: "अधि. कविता मिश्रा", designation: "Co-Convenor", designationHi: "सह-संयोजक", slug: "kavita-mishra", photo: null },
  { id: 8, name: "Adv. Vikram Singh", nameHi: "अधि. विक्रम सिंह", designation: "EC Member", designationHi: "कार्यकारिणी सदस्य", slug: "vikram-singh", photo: null },
];

function TeamCard({
  member,
}: {
  member: (typeof NATIONAL_TEAM)[number];
}) {
  return (
    <Link href={`/pillars/${member.slug}`} className="group mx-4 block">
      <motion.div
        whileHover={{ y: -6, rotateY: 5, rotateX: -3 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: "1000px" }}
        className="w-[240px] rounded-2xl border border-gold/10 bg-cream-light/80 p-5 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Photo placeholder */}
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[3px] border-gold/30 bg-gradient-to-br from-saffron/10 to-gold/10">
          {member.photo ? (
            <img src={assetPath(member.photo)} alt={member.name} className="h-full w-full object-cover" />
          ) : (
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon/40">
              {member.name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </span>
          )}
        </div>

        {/* Name */}
        <h4 className="text-center font-[family-name:var(--font-playfair)] text-base font-bold text-maroon-dark">
          {member.name}
        </h4>
        <p className="mt-0.5 text-center font-[family-name:var(--font-noto-serif)] text-xs text-charcoal-light">
          {member.nameHi}
        </p>

        {/* Designation */}
        <p className="mt-2 text-center font-[family-name:var(--font-satoshi)] text-xs font-medium uppercase tracking-wider text-saffron">
          {member.designation}
        </p>
      </motion.div>
    </Link>
  );
}

export function TeamCarouselSection() {
  const t = useTranslations("team");

  return (
    <section className="section-padding overflow-hidden bg-cream">
      <div className="container-default mb-12 text-center">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-playfair)] text-[var(--text-display)] font-bold text-maroon-dark">
            {t("heading")}
          </h2>
          <p className="mt-2 font-[family-name:var(--font-satoshi)] text-base text-charcoal-light">
            {t("subheading")}
          </p>
        </ScrollReveal>
      </div>

      {/* Row 1: Left to Right */}
      <div className="mb-4">
        <Marquee speed={30} pauseOnHover gradient gradientColor="#FFF8F0" gradientWidth={80}>
          {NATIONAL_TEAM.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </Marquee>
      </div>

      {/* Row 2: Right to Left (mirrored) */}
      <div>
        <Marquee speed={25} pauseOnHover direction="right" gradient gradientColor="#FFF8F0" gradientWidth={80}>
          {[...NATIONAL_TEAM].reverse().map((member) => (
            <TeamCard key={`rev-${member.id}`} member={member} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
