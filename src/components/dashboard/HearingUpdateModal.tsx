"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Animation Presets ─── */

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease } },
  exit: { opacity: 0, transition: { duration: 0.2, ease } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2, ease },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
};

/* ─── Types ─── */

interface HearingUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseName: string;
}

interface HearingFormData {
  hearingDate: string;
  outcome: string;
  nextHearingDate: string;
  judgeName: string;
}

const INITIAL_FORM: HearingFormData = {
  hearingDate: "",
  outcome: "",
  nextHearingDate: "",
  judgeName: "",
};

/* ─── Field Components ─── */

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/50">
      {children}
      {required && <span className="ml-0.5 text-saffron">*</span>}
    </label>
  );
}

/* ─── Component ─── */

export function HearingUpdateModal({ isOpen, onClose, caseName }: HearingUpdateModalProps) {
  const [form, setForm] = useState<HearingFormData>({ ...INITIAL_FORM });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setField = useCallback((key: keyof HearingFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ ...INITIAL_FORM });
      setIsSubmitted(false);
    }
  }, [isOpen]);

  // Auto-close after success
  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setTimeout(() => {
      onClose();
    }, 1500);
    return () => clearTimeout(timer);
  }, [isSubmitted, onClose]);

  const canSubmit = !!(form.hearingDate && form.outcome);

  const handleSave = () => {
    if (!canSubmit) return;
    // Mock save — no real API call
    setIsSubmitted(true);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitted) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-lg rounded-2xl border border-gold/10 bg-[#1A0E0A] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/10 px-5 py-4">
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                  Add Hearing Update
                </h2>
                <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-xs text-cream/40">
                  {caseName}
                </p>
              </div>
              {!isSubmitted && (
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-cream/30 transition-colors hover:bg-cream/5 hover:text-cream/60"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="px-5 py-5">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* Success State */
                  <motion.div
                    key="success"
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <CheckCircle className="mb-3 h-12 w-12 text-emerald-400" />
                    <p className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                      Hearing update saved
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-noto-serif)] text-xs text-cream/40">
                      सुनवाई अपडेट सहेजा गया
                    </p>
                  </motion.div>
                ) : (
                  /* Form */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease }}
                    className="space-y-4"
                  >
                    {/* Hearing Date */}
                    <div>
                      <FieldLabel required>Hearing Date</FieldLabel>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/20" />
                        <input
                          type="date"
                          value={form.hearingDate}
                          onChange={(e) => setField("hearingDate", e.target.value)}
                          className="w-full rounded-lg border border-gold/10 bg-[#120A07] py-2.5 pl-10 pr-3 font-[family-name:var(--font-satoshi)] text-sm text-cream/80 outline-none transition-colors focus:border-saffron/30 focus:bg-[#1A0E0A]"
                        />
                      </div>
                    </div>

                    {/* Event / Outcome */}
                    <div>
                      <FieldLabel required>Event / Outcome</FieldLabel>
                      <textarea
                        value={form.outcome}
                        onChange={(e) => setField("outcome", e.target.value)}
                        placeholder="Describe what happened at the hearing..."
                        rows={4}
                        className="w-full resize-none rounded-lg border border-gold/10 bg-[#120A07] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-cream/80 outline-none transition-colors placeholder:text-cream/20 focus:border-saffron/30 focus:bg-[#1A0E0A]"
                      />
                    </div>

                    {/* Next Hearing Date */}
                    <div>
                      <FieldLabel>Next Hearing Date</FieldLabel>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/20" />
                        <input
                          type="date"
                          value={form.nextHearingDate}
                          onChange={(e) => setField("nextHearingDate", e.target.value)}
                          className="w-full rounded-lg border border-gold/10 bg-[#120A07] py-2.5 pl-10 pr-3 font-[family-name:var(--font-satoshi)] text-sm text-cream/80 outline-none transition-colors focus:border-saffron/30 focus:bg-[#1A0E0A]"
                        />
                      </div>
                    </div>

                    {/* Judge Name */}
                    <div>
                      <FieldLabel>Judge Name</FieldLabel>
                      <input
                        type="text"
                        value={form.judgeName}
                        onChange={(e) => setField("judgeName", e.target.value)}
                        placeholder="e.g. Justice D.Y. Chandrachud"
                        className="w-full rounded-lg border border-gold/10 bg-[#120A07] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream/80 outline-none transition-colors placeholder:text-cream/20 focus:border-saffron/30 focus:bg-[#1A0E0A]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!isSubmitted && (
              <div className="flex items-center justify-end gap-3 border-t border-gold/10 px-5 py-4">
                <button
                  onClick={onClose}
                  className="rounded-lg border border-gold/10 px-4 py-2 font-[family-name:var(--font-satoshi)] text-sm text-cream/50 transition-colors hover:border-gold/20 hover:text-cream/70"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!canSubmit}
                  className={cn(
                    "rounded-lg px-5 py-2 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors",
                    canSubmit
                      ? "bg-saffron hover:bg-saffron-bright"
                      : "cursor-not-allowed bg-saffron/30"
                  )}
                >
                  Save Update
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
