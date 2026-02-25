"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  FileText,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Link as LinkIcon,
  BookOpen,
  Shield,
  Scale,
} from "lucide-react";

/* ─── Templates ─── */

interface TemplateItem {
  id: number;
  title: string;
  description: string;
  category: string;
  format: string;
}

const TEMPLATES: TemplateItem[] = [
  { id: 1, title: "PIL Draft Template", description: "Standard Public Interest Litigation template for High Courts", category: "PIL", format: "DOCX" },
  { id: 2, title: "RTI Application Format", description: "Right to Information application template with covering letter", category: "RTI", format: "PDF" },
  { id: 3, title: "Temple Property Dispute Petition", description: "Petition template for temple land encroachment cases", category: "Temple", format: "DOCX" },
  { id: 4, title: "Cow Protection FIR Template", description: "Model FIR format for cow slaughter / illegal transport cases", category: "Cow Protection", format: "PDF" },
  { id: 5, title: "Anti-Conversion Complaint Format", description: "Complaint template under state anti-conversion laws", category: "Conversion", format: "DOCX" },
  { id: 6, title: "Volunteer Registration Form", description: "Registration form for new VHP Legal Cell volunteers", category: "Admin", format: "PDF" },
];

/* ─── FAQs ─── */

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    question: "How can I get legal help from VHP Legal Cell?",
    answer: "You can contact us through the Contact page, visit any of our Khetra offices, or attend one of our Free Legal Clinics organized across India. Our advocates provide free consultation for Hindu legal causes.",
  },
  {
    id: 2,
    question: "How do I volunteer with VHP Legal Cell?",
    answer: "Advocates, law students, and legal professionals can register through the Volunteer Registration form on the Contact page. You will be assigned to your nearest Prant/Khetra based on your location and expertise.",
  },
  {
    id: 3,
    question: "What types of cases does VHP Legal Cell handle?",
    answer: "We handle cases related to temple rights, cow protection, anti-conversion laws, religious freedom, Waqf Act challenges, Uniform Civil Code, and other matters affecting Hindu community interests.",
  },
  {
    id: 4,
    question: "Is VHP Legal Cell present in all states?",
    answer: "Yes, we have presence across all 12 Khetras covering all Indian states through our network of 35+ Prants and hundreds of court-level advocates.",
  },
  {
    id: 5,
    question: "How are the Shiksha Vargs organized?",
    answer: "Shiksha Vargs (training programs) are organized at Khetra and Prant levels throughout the year. They cover legal drafting, PIL filing, court procedures, and case research. Check the Activities page for upcoming programs.",
  },
];

/* ─── Useful Links ─── */

interface UsefulLink {
  id: number;
  title: string;
  url: string;
  description: string;
  icon: React.ElementType;
}

const USEFUL_LINKS: UsefulLink[] = [
  { id: 1, title: "Supreme Court of India", url: "https://sci.gov.in", description: "Official SC website for case status and judgments", icon: Scale },
  { id: 2, title: "India Code (Legislative)", url: "https://www.indiacode.nic.in", description: "All central and state laws", icon: BookOpen },
  { id: 3, title: "National Legal Services Authority", url: "https://nalsa.gov.in", description: "Free legal aid services", icon: Shield },
  { id: 4, title: "VHP Official Website", url: "https://vhp.org", description: "Vishwa Hindu Parishad official portal", icon: LinkIcon },
  { id: 5, title: "e-Courts Services", url: "https://ecourts.gov.in", description: "Case status, cause lists, and court orders", icon: FileText },
];

/* ─── FAQ Accordion ─── */

function FAQAccordion({ faq }: { faq: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gold/10 bg-cream-light shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="pr-4 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-maroon-dark">
          {faq.question}
        </h3>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-saffron" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-charcoal-light/40" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-gold/10 px-4 pb-4 pt-3">
              <p className="font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-charcoal-light">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─── */

export function ResourcesContent() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-default space-y-16">
        {/* Templates Section */}
        <ScrollReveal>
          <div>
            <div className="mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-saffron" />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon-dark">
                Legal Templates
              </h2>
            </div>
            <p className="mb-6 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
              Download ready-to-use legal document templates for common cases.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TEMPLATES.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ y: -2 }}
                  className="group rounded-xl border border-gold/10 bg-cream-light p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <span className="rounded-lg bg-saffron/10 px-2 py-1 font-[family-name:var(--font-satoshi)] text-[10px] font-bold uppercase tracking-wider text-saffron">
                      {template.category}
                    </span>
                    <span className="rounded bg-gold/10 px-1.5 py-0.5 font-[family-name:var(--font-satoshi)] text-[10px] font-medium text-charcoal-light">
                      {template.format}
                    </span>
                  </div>
                  <h3 className="mt-3 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-maroon-dark">
                    {template.title}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/70">
                    {template.description}
                  </p>
                  <button className="mt-3 flex items-center gap-1.5 font-[family-name:var(--font-satoshi)] text-xs font-medium text-saffron transition-colors hover:text-saffron-bright">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs Section */}
        <ScrollReveal>
          <div>
            <div className="mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-saffron" />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon-dark">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <FAQAccordion key={faq.id} faq={faq} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Useful Links */}
        <ScrollReveal>
          <div>
            <div className="mb-6 flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-saffron" />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon-dark">
                Useful Links
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {USEFUL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl border border-gold/10 bg-cream-light p-4 shadow-sm transition-all hover:border-gold/20 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron/10">
                    <link.icon className="h-4 w-4 text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-satoshi)] text-sm font-semibold text-maroon-dark group-hover:text-saffron">
                      {link.title}
                    </h3>
                    <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/70">
                      {link.description}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-charcoal-light/30 transition-colors group-hover:text-saffron" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
