"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: MapPin,
    label: "Address",
    value: "VHP Legal Cell, Sankat Mochan Ashram, RK Puram, New Delhi - 110022",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 11-2617-XXXX",
  },
  {
    icon: Mail,
    label: "Email",
    value: "legal@vhp.org",
    href: "mailto:legal@vhp.org",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon — Sat, 10:00 AM — 6:00 PM IST",
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.vhp.org",
    href: "https://www.vhp.org",
  },
];

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulated submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "general", message: "" });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="section-padding bg-cream">
      <div className="container-default">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <ScrollReveal>
            <div className="rounded-2xl border border-gold/15 bg-cream-light p-6 shadow-sm md:p-8">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-maroon-dark">
                Send us a Message
              </h2>
              <p className="mt-1 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-gold/15 bg-cream py-2.5 px-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-gold/15 bg-cream py-2.5 px-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl border border-gold/15 bg-cream py-2.5 px-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gold/15 bg-cream py-2.5 px-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
                    >
                      <option value="general">General Enquiry</option>
                      <option value="legal-help">Legal Assistance</option>
                      <option value="volunteer">Volunteer Registration</option>
                      <option value="media">Media / Press</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-gold/15 bg-cream py-2.5 px-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
                  />
                </div>

                {/* Status messages */}
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-emerald-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <p className="font-[family-name:var(--font-satoshi)] text-sm">
                      Message sent successfully! We&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                )}

                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-red-700"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <p className="font-[family-name:var(--font-satoshi)] text-sm">
                      Failed to send. Please try again later.
                    </p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl bg-saffron px-6 py-3 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-white shadow-md transition-all hover:bg-saffron-bright hover:shadow-lg disabled:opacity-60",
                    formStatus === "submitting" && "cursor-not-allowed"
                  )}
                >
                  {formStatus === "submitting" ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </ScrollReveal>

          {/* Contact Info Sidebar */}
          <ScrollReveal>
            <div className="space-y-4">
              {CONTACT_INFO.map((info) => (
                <div
                  key={info.label}
                  className="rounded-xl border border-gold/10 bg-cream-light p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron/10">
                      <info.icon className="h-4 w-4 text-saffron" />
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-satoshi)] text-xs font-semibold uppercase tracking-wider text-charcoal-light/60">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-[family-name:var(--font-satoshi)] text-sm text-maroon-dark transition-colors hover:text-saffron"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-[family-name:var(--font-satoshi)] text-sm text-maroon-dark">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="overflow-hidden rounded-xl border border-gold/10 bg-maroon-dark/5 shadow-sm">
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-saffron/5 to-gold/5">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-charcoal-light/20" />
                    <p className="mt-2 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/50">
                      Google Maps integration coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
