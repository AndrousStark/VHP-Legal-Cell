"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CHETRAS } from "@/lib/map-config";
import { ACTIVITY_TYPES, CASE_CATEGORIES, CASE_STATUSES } from "@/lib/constants";
import {
  MapPin,
  Tag,
  Scale,
  Building,
  Pencil,
  Plus,
  ChevronRight,
} from "lucide-react";

interface MasterSection {
  title: string;
  icon: React.ElementType;
  count: number;
  items: { label: string; meta?: string }[];
}

const SECTIONS: MasterSection[] = [
  {
    title: "Chetras (Regions)",
    icon: MapPin,
    count: CHETRAS.length,
    items: CHETRAS.map((k) => ({ label: k.nameEn, meta: `${k.states.length} states` })),
  },
  {
    title: "Activity Types",
    icon: Tag,
    count: ACTIVITY_TYPES.length,
    items: ACTIVITY_TYPES.map((t) => ({ label: t.label, meta: t.labelHi })),
  },
  {
    title: "Case Categories",
    icon: Scale,
    count: CASE_CATEGORIES.length,
    items: CASE_CATEGORIES.map((c) => ({ label: c.label, meta: c.labelHi })),
  },
  {
    title: "Case Statuses",
    icon: Building,
    count: CASE_STATUSES.length,
    items: CASE_STATUSES.map((s) => ({ label: s.label, meta: s.labelHi })),
  },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function MasterDataPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader title="Master Data" titleHi="मास्टर डेटा" />

      <div className="p-4 lg:p-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-2"
        >
          {SECTIONS.map((section) => (
            <motion.div
              key={section.title}
              variants={fadeUp}
              className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-saffron-bright" />
                  <h3 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                    {section.title}
                  </h3>
                  <span className="rounded-full bg-cream/5 px-2 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] text-cream/40">
                    {section.count}
                  </span>
                </div>
                <button className="flex items-center gap-1 rounded-lg bg-saffron/10 px-3 py-1.5 font-[family-name:var(--font-satoshi)] text-[11px] font-medium text-saffron transition-colors hover:bg-saffron/20">
                  <Plus className="h-3 w-3" />
                  Add
                </button>
              </div>

              <div className="space-y-1">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="group flex items-center justify-between rounded-lg border border-gold/5 px-3 py-2.5 transition-all hover:border-gold/10 hover:bg-cream/[0.02]"
                  >
                    <div>
                      <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/70">
                        {item.label}
                      </p>
                      {item.meta && (
                        <p className="font-[family-name:var(--font-satoshi)] text-[10px] text-cream/30">
                          {item.meta}
                        </p>
                      )}
                    </div>
                    <button
                      className="rounded p-1 text-cream/20 opacity-0 transition-all group-hover:opacity-100 hover:text-saffron"
                      aria-label={`Edit ${item.label}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
