"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  Building2,
  ScrollText,
  Eye,
  Pencil,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth-context";
import { CASE_CATEGORIES, CASE_STATUSES } from "@/lib/constants";
import { KHETRAS } from "@/lib/map-config";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

/* ─── Animation Presets ─── */

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
};

/* ─── Types ─── */

interface FormData {
  // Step 1 — Basic Info
  title: string;
  titleHi: string;
  category: string;
  status: string;
  // Step 2 — Court Details
  courtName: string;
  courtType: string;
  caseNumber: string;
  filedDate: string;
  lawyer: string;
  // Step 3 — Case Details
  state: string;
  khetraId: string;
  nextHearing: string;
  summary: string;
}

const INITIAL_FORM: FormData = {
  title: "",
  titleHi: "",
  category: "",
  status: "filed",
  courtName: "",
  courtType: "",
  caseNumber: "",
  filedDate: "",
  lawyer: "",
  state: "",
  khetraId: "",
  nextHearing: "",
  summary: "",
};

const STEPS = [
  { id: 1, label: "Basic Info", labelHi: "मूल जानकारी", icon: FileText },
  { id: 2, label: "Court Details", labelHi: "न्यायालय विवरण", icon: Building2 },
  { id: 3, label: "Case Details", labelHi: "वाद विवरण", icon: ScrollText },
  { id: 4, label: "Preview & Submit", labelHi: "पूर्वावलोकन", icon: Eye },
] as const;

const COURT_TYPES = [
  { value: "supreme", label: "Supreme Court" },
  { value: "high", label: "High Court" },
  { value: "district", label: "District Court" },
  { value: "tribunal", label: "Tribunal" },
] as const;

/* ─── Helpers ─── */

function getCategoryLabel(value: string): string {
  const found = CASE_CATEGORIES.find((c) => c.value === value);
  return found ? found.label : value;
}

function getStatusLabel(value: string): string {
  const found = CASE_STATUSES.find((s) => s.value === value);
  return found ? found.label : value;
}

function getCourtTypeLabel(value: string): string {
  const found = COURT_TYPES.find((ct) => ct.value === value);
  return found ? found.label : value;
}

function getKhetraLabel(value: string): string {
  const found = KHETRAS.find((k) => k.id === value);
  return found ? found.nameEn : value;
}

/* ─── Field Components ─── */

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/50">
      {children}
      {required && <span className="ml-0.5 text-saffron">*</span>}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-lg border border-gold/10 bg-[#120A07] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream/80 outline-none transition-colors placeholder:text-cream/20 focus:border-saffron/30 focus:bg-[#1A0E0A]",
        mono && "font-mono tracking-wide"
      )}
    />
  );
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gold/10 bg-[#120A07] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream/80 outline-none transition-colors focus:border-saffron/30 focus:bg-[#1A0E0A]"
    >
      <option value="" className="text-cream/30">
        {placeholder ?? "Select..."}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function DateInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gold/10 bg-[#120A07] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream/80 outline-none transition-colors focus:border-saffron/30 focus:bg-[#1A0E0A]"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows ?? 6}
      className="w-full resize-none rounded-lg border border-gold/10 bg-[#120A07] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm leading-relaxed text-cream/80 outline-none transition-colors placeholder:text-cream/20 focus:border-saffron/30 focus:bg-[#1A0E0A]"
    />
  );
}

/* ─── Step Components ─── */

function StepBasicInfo({
  form,
  setField,
}: {
  form: FormData;
  setField: (k: keyof FormData, v: string) => void;
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-5">
      <div>
        <FieldLabel required>Case Title (English)</FieldLabel>
        <TextInput
          value={form.title}
          onChange={(v) => setField("title", v)}
          placeholder="e.g. Gyanvapi Mosque Survey Case"
        />
      </div>
      <div>
        <FieldLabel required>Case Title (Hindi)</FieldLabel>
        <TextInput
          value={form.titleHi}
          onChange={(v) => setField("titleHi", v)}
          placeholder="e.g. ज्ञानवापी मस्जिद सर्वेक्षण वाद"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel required>Category</FieldLabel>
          <SelectInput
            value={form.category}
            onChange={(v) => setField("category", v)}
            options={CASE_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
            placeholder="Select category"
          />
        </div>
        <div>
          <FieldLabel required>Status</FieldLabel>
          <SelectInput
            value={form.status}
            onChange={(v) => setField("status", v)}
            options={CASE_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
            placeholder="Select status"
          />
        </div>
      </div>
    </motion.div>
  );
}

function StepCourtDetails({
  form,
  setField,
}: {
  form: FormData;
  setField: (k: keyof FormData, v: string) => void;
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-5">
      <div>
        <FieldLabel required>Court Name</FieldLabel>
        <TextInput
          value={form.courtName}
          onChange={(v) => setField("courtName", v)}
          placeholder="e.g. Supreme Court of India"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel required>Court Type</FieldLabel>
          <SelectInput
            value={form.courtType}
            onChange={(v) => setField("courtType", v)}
            options={COURT_TYPES.map((ct) => ({ value: ct.value, label: ct.label }))}
            placeholder="Select court type"
          />
        </div>
        <div>
          <FieldLabel required>Case Number</FieldLabel>
          <TextInput
            value={form.caseNumber}
            onChange={(v) => setField("caseNumber", v)}
            placeholder="e.g. SC/2024/PIL/1234"
            mono
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel required>Filed Date</FieldLabel>
          <DateInput value={form.filedDate} onChange={(v) => setField("filedDate", v)} />
        </div>
        <div>
          <FieldLabel required>Lawyer / Advocate Name</FieldLabel>
          <TextInput
            value={form.lawyer}
            onChange={(v) => setField("lawyer", v)}
            placeholder="e.g. Adv. Vishnu Shankar Jain"
          />
        </div>
      </div>
    </motion.div>
  );
}

function StepCaseDetails({
  form,
  setField,
}: {
  form: FormData;
  setField: (k: keyof FormData, v: string) => void;
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel required>State</FieldLabel>
          <TextInput
            value={form.state}
            onChange={(v) => setField("state", v)}
            placeholder="e.g. Uttar Pradesh"
          />
        </div>
        <div>
          <FieldLabel required>Khetra</FieldLabel>
          <SelectInput
            value={form.khetraId}
            onChange={(v) => setField("khetraId", v)}
            options={KHETRAS.map((k) => ({ value: k.id, label: k.nameEn }))}
            placeholder="Select khetra"
          />
        </div>
      </div>
      <div>
        <FieldLabel>Next Hearing Date</FieldLabel>
        <DateInput value={form.nextHearing} onChange={(v) => setField("nextHearing", v)} />
      </div>
      <div>
        <FieldLabel required>Summary / Description</FieldLabel>
        <TextArea
          value={form.summary}
          onChange={(v) => setField("summary", v)}
          placeholder="Describe the case details, background, and current status..."
          rows={8}
        />
      </div>
    </motion.div>
  );
}

function PreviewSection({
  label,
  onEdit,
  children,
}: {
  label: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gold/10 bg-[#120A07] p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-cream/70">
          {label}
        </h3>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 rounded-md px-2 py-1 font-[family-name:var(--font-satoshi)] text-[11px] text-saffron/70 transition-colors hover:bg-saffron/10 hover:text-saffron"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-32 shrink-0 font-[family-name:var(--font-satoshi)] text-[11px] uppercase tracking-wide text-cream/30">
        {label}
      </span>
      <span className="font-[family-name:var(--font-satoshi)] text-sm text-cream/70">
        {value || "—"}
      </span>
    </div>
  );
}

function StepPreview({
  form,
  goToStep,
}: {
  form: FormData;
  goToStep: (step: number) => void;
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-4">
      <PreviewSection label="Basic Information" onEdit={() => goToStep(1)}>
        <PreviewRow label="Title (EN)" value={form.title} />
        <PreviewRow label="Title (HI)" value={form.titleHi} />
        <PreviewRow label="Category" value={getCategoryLabel(form.category)} />
        <PreviewRow label="Status" value={getStatusLabel(form.status)} />
      </PreviewSection>

      <PreviewSection label="Court Details" onEdit={() => goToStep(2)}>
        <PreviewRow label="Court Name" value={form.courtName} />
        <PreviewRow label="Court Type" value={getCourtTypeLabel(form.courtType)} />
        <PreviewRow label="Case Number" value={form.caseNumber} />
        <PreviewRow label="Filed Date" value={form.filedDate} />
        <PreviewRow label="Lawyer" value={form.lawyer} />
      </PreviewSection>

      <PreviewSection label="Case Details" onEdit={() => goToStep(3)}>
        <PreviewRow label="State" value={form.state} />
        <PreviewRow label="Khetra" value={getKhetraLabel(form.khetraId)} />
        <PreviewRow label="Next Hearing" value={form.nextHearing || "Not set"} />
        <PreviewRow label="Summary" value={form.summary} />
      </PreviewSection>
    </motion.div>
  );
}

/* ─── Page Component ─── */

export default function NewCasePage() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setField = useCallback((key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(form.title && form.titleHi && form.category && form.status);
      case 2:
        return !!(form.courtName && form.courtType && form.caseNumber && form.filedDate && form.lawyer);
      case 3:
        return !!(form.state && form.khetraId && form.summary);
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submit — no real API call
    setIsSubmitted(true);
  };

  /* ─── Success State ─── */
  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <DashboardHeader title="New Case" titleHi="नया वाद" />
        <div className="flex min-h-[60vh] items-center justify-center p-4">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex max-w-sm flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease }}
            >
              <CheckCircle className="mb-4 h-16 w-16 text-emerald-400" />
            </motion.div>
            <h2 className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-cream">
              Case added successfully
            </h2>
            <p className="mb-6 font-[family-name:var(--font-noto-serif)] text-sm text-cream/40">
              वाद सफलतापूर्वक जोड़ा गया
            </p>
            <p className="mb-8 font-[family-name:var(--font-satoshi)] text-sm text-cream/50">
              &ldquo;{form.title}&rdquo; has been registered under{" "}
              {getCategoryLabel(form.category)}.
            </p>
            <Link
              href="/dashboard/cases"
              className="inline-flex items-center gap-2 rounded-lg bg-saffron px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cases
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── Form ─── */
  return (
    <div className="min-h-screen">
      <DashboardHeader title="New Case" titleHi="नया वाद" />

      <div className="mx-auto max-w-3xl p-4 lg:p-6">
        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex flex-1 items-center">
                  <button
                    onClick={() => {
                      if (isCompleted) goToStep(step.id);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-1.5 transition-colors",
                      isCompleted && "cursor-pointer"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                        isActive && "border-saffron bg-saffron/10",
                        isCompleted && "border-emerald-500/50 bg-emerald-500/10",
                        !isActive && !isCompleted && "border-gold/10 bg-cream/[0.02]"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <StepIcon
                          className={cn(
                            "h-4.5 w-4.5",
                            isActive ? "text-saffron" : "text-cream/30"
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        "hidden font-[family-name:var(--font-satoshi)] text-[11px] sm:block",
                        isActive ? "font-medium text-saffron" : "text-cream/30"
                      )}
                    >
                      {step.label}
                    </span>
                  </button>

                  {/* Connector line */}
                  {idx < STEPS.length - 1 && (
                    <div className="mx-2 h-px flex-1">
                      <div
                        className={cn(
                          "h-full transition-colors duration-300",
                          currentStep > step.id ? "bg-emerald-500/30" : "bg-gold/10"
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <div className="mb-8 rounded-xl border border-gold/10 bg-[#1A0E0A] p-5 lg:p-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <StepBasicInfo key="step1" form={form} setField={setField} />
            )}
            {currentStep === 2 && (
              <StepCourtDetails key="step2" form={form} setField={setField} />
            )}
            {currentStep === 3 && (
              <StepCaseDetails key="step3" form={form} setField={setField} />
            )}
            {currentStep === 4 && (
              <StepPreview key="step4" form={form} goToStep={goToStep} />
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease }}
          className="flex items-center justify-between"
        >
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={cn(
              "flex items-center gap-2 rounded-lg border border-gold/10 px-4 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream/50 transition-colors",
              currentStep === 1
                ? "cursor-not-allowed opacity-30"
                : "hover:border-gold/20 hover:text-cream/70"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={cn(
                "flex items-center gap-2 rounded-lg px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors",
                canProceed()
                  ? "bg-saffron hover:bg-saffron-bright"
                  : "cursor-not-allowed bg-saffron/30"
              )}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-emerald-500"
            >
              <CheckCircle className="h-4 w-4" />
              Submit Case
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
