"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

/* ─── Mock data — will be replaced by API ─── */
const RECENT_ACTIVITIES = [
  {
    id: 1,
    title: "National Legal Cell Seminar",
    titleHi: "राष्ट्रीय विधि प्रकोष्ठ सेमिनार",
    date: "2026-02-15",
    location: "Vigyan Bhawan, New Delhi",
    type: "Seminar",
    status: "completed" as const,
    attendance: 250,
    image: null,
    slug: "national-seminar-delhi",
  },
  {
    id: 2,
    title: "Prant Shiksha Varg — Jaipur",
    titleHi: "प्रांत शिक्षा वर्ग — जयपुर",
    date: "2026-02-20",
    location: "Jaipur, Rajasthan",
    type: "Shiksha Varg",
    status: "completed" as const,
    attendance: 180,
    image: null,
    slug: "shiksha-varg-jaipur",
  },
  {
    id: 3,
    title: "Legal Clinic — Varanasi",
    titleHi: "विधिक क्लिनिक — वाराणसी",
    date: "2026-03-01",
    location: "Varanasi, Uttar Pradesh",
    type: "Legal Clinic",
    status: "upcoming" as const,
    attendance: 0,
    image: null,
    slug: "legal-clinic-varanasi",
  },
  {
    id: 4,
    title: "Regional Meeting — South Zone",
    titleHi: "क्षेत्रीय बैठक — दक्षिण क्षेत्र",
    date: "2026-03-05",
    location: "Bengaluru, Karnataka",
    type: "Regional Meeting",
    status: "upcoming" as const,
    attendance: 0,
    image: null,
    slug: "regional-meeting-south",
  },
  {
    id: 5,
    title: "Cow Protection Workshop",
    titleHi: "गो संरक्षण कार्यशाला",
    date: "2026-02-10",
    location: "Ahmedabad, Gujarat",
    type: "Workshop",
    status: "completed" as const,
    attendance: 120,
    image: null,
    slug: "cow-protection-workshop",
  },
  {
    id: 6,
    title: "PIL Training Session",
    titleHi: "जनहित याचिका प्रशिक्षण सत्र",
    date: "2026-03-10",
    location: "Lucknow, Uttar Pradesh",
    type: "Training",
    status: "upcoming" as const,
    attendance: 0,
    image: null,
    slug: "pil-training-lucknow",
  },
];

function ActivityCard({ activity }: { activity: (typeof RECENT_ACTIVITIES)[number] }) {
  const t = useTranslations("activities");
  const isUpcoming = activity.status === "upcoming";

  return (
    <Link href={`/activities/${activity.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6, rotateY: 3, rotateX: -2 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: "1000px" }}
        className="relative overflow-hidden rounded-2xl border border-gold/10 bg-cream-light shadow-sm transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Image placeholder */}
        <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-saffron/10 to-gold/5">
          <div className="flex h-full items-center justify-center">
            <Calendar className="h-12 w-12 text-saffron/20" />
          </div>

          {/* Status badge */}
          <span
            className={cn(
              "absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white",
              isUpcoming ? "bg-gold" : "bg-success"
            )}
          >
            {isUpcoming ? t("upcoming") : t("completed")}
          </span>

          {/* Type badge */}
          <span className="absolute bottom-3 left-3 rounded-full bg-maroon-dark/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
            {activity.type}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold leading-snug text-maroon-dark group-hover:text-saffron">
            {activity.title}
          </h3>

          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-charcoal-light">
              <Calendar className="h-3.5 w-3.5 text-saffron" />
              {new Date(activity.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-charcoal-light">
              <MapPin className="h-3.5 w-3.5 text-saffron" />
              {activity.location}
            </div>
            {!isUpcoming && activity.attendance > 0 && (
              <div className="flex items-center gap-2 text-sm text-charcoal-light">
                <Users className="h-3.5 w-3.5 text-saffron" />
                {activity.attendance} attendees
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function ActivitiesSection() {
  const t = useTranslations("activities");

  return (
    <section className="section-padding bg-cream-mid/50 relative overflow-hidden">
      {/* Decorative watercolor art */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.07] hidden lg:block pointer-events-none">
        <Image
          src="/images/india-people-art.jpg"
          alt=""
          width={600}
          height={450}
          className="object-contain"
        />
      </div>

      <div className="container-default relative z-10">
        <ScrollReveal className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-[var(--text-display)] font-bold text-maroon-dark">
            {t("heading")}
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECENT_ACTIVITIES.map((activity) => (
            <StaggerItem key={activity.id}>
              <ActivityCard activity={activity} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3} className="mt-10 text-center">
          <Link
            href="/activities"
            className="group inline-flex items-center gap-2 font-[family-name:var(--font-satoshi)] text-base font-semibold text-saffron transition-colors hover:text-saffron-bright"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
