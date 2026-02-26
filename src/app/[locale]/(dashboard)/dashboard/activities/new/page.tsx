"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Presentation,
  Stethoscope,
  GraduationCap,
  Megaphone,
  Users,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Save,
  Upload,
  CheckCircle,
  Pencil,
  ImageIcon,
  CalendarDays,
  MapPin,
  FileText,
  X,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth-context";
import { ACTIVITY_TYPES } from "@/lib/constants";
import { CHETRAS } from "@/lib/map-config";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

/* ─── Constants ─── */

const STEPS = [
  { id: 1, label: "Type", labelHi: "प्रकार" },
  { id: 2, label: "Details", labelHi: "विवरण" },
  { id: 3, label: "Attendance", labelHi: "उपस्थिति" },
  { id: 4, label: "Photos", labelHi: "फ़ोटो" },
  { id: 5, label: "Preview", labelHi: "पूर्वावलोकन" },
  { id: 6, label: "Submit", labelHi: "जमा करें" },
] as const;

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  seminar: Presentation,
  "legal-clinic": Stethoscope,
  "shiksha-varg": GraduationCap,
  rally: Megaphone,
  meeting: Users,
  workshop: Wrench,
};

const MOCK_THUMBNAILS = [
  { id: "ph1", label: "IMG_001.jpg" },
  { id: "ph2", label: "IMG_002.jpg" },
  { id: "ph3", label: "IMG_003.jpg" },
];

/* ─── Animations ─── */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

/* ─── Form State Types ─── */

interface FormData {
  activityType: string;
  titleEn: string;
  titleHi: string;
  date: string;
  endDate: string;
  location: string;
  chetra: string;
  description: string;
  expectedAttendees: string;
  chiefGuest: string;
  coordinator: string;
  attendanceNotes: string;
  photos: typeof MOCK_THUMBNAILS;
}

const INITIAL_FORM_DATA: FormData = {
  activityType: "",
  titleEn: "",
  titleHi: "",
  date: "",
  endDate: "",
  location: "",
  chetra: "",
  description: "",
  expectedAttendees: "",
  chiefGuest: "",
  coordinator: "",
  attendanceNotes: "",
  photos: [],
};

/* ─── Input Component ─── */

function FormInput({
  label,
  labelHi,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  labelHi?: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/60">
        {label}
        {labelHi && (
          <span className="ml-1.5 font-[family-name:var(--font-noto-serif)] text-cream/30">
            ({labelHi})
          </span>
        )}
        {required && <span className="ml-0.5 text-saffron">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gold/10 bg-[#1A0E0A] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream placeholder:text-cream/30 focus:border-saffron/30 focus:outline-none focus:ring-1 focus:ring-saffron/20"
      />
    </div>
  );
}

function FormTextarea({
  label,
  labelHi,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  labelHi?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/60">
        {label}
        {labelHi && (
          <span className="ml-1.5 font-[family-name:var(--font-noto-serif)] text-cream/30">
            ({labelHi})
          </span>
        )}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-gold/10 bg-[#1A0E0A] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream placeholder:text-cream/30 focus:border-saffron/30 focus:outline-none focus:ring-1 focus:ring-saffron/20 resize-none"
      />
    </div>
  );
}

/* ─── Step Indicator ─── */

function StepIndicator({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="mb-8 flex items-center justify-center">
      <div className="flex items-center gap-0">
        {STEPS.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <button
              type="button"
              onClick={() => {
                if (step.id < currentStep) onStepClick(step.id);
              }}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-full border-2 font-[family-name:var(--font-satoshi)] text-xs font-bold transition-all duration-300",
                step.id === currentStep
                  ? "border-saffron bg-saffron/20 text-saffron shadow-[0_0_12px_rgba(255,153,0,0.3)]"
                  : step.id < currentStep
                    ? "border-saffron/60 bg-saffron/10 text-saffron/80 cursor-pointer hover:border-saffron hover:bg-saffron/20"
                    : "border-gold/10 bg-[#1A0E0A] text-cream/30"
              )}
              disabled={step.id > currentStep}
            >
              {step.id < currentStep ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                step.id
              )}
            </button>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "hidden h-0.5 w-6 sm:block lg:w-10",
                  step.id < currentStep
                    ? "bg-saffron/40"
                    : "bg-gold/10"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 1: Activity Type ─── */

function StepType({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (val: string) => void;
}) {
  return (
    <motion.div {...fadeUp}>
      <h2 className="mb-1 font-[family-name:var(--font-playfair)] text-lg font-bold text-cream">
        Select Activity Type
      </h2>
      <p className="mb-6 font-[family-name:var(--font-noto-serif)] text-sm text-cream/40">
        गतिविधि का प्रकार चुनें
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ACTIVITY_TYPES.map((type) => {
          const Icon = ICON_MAP[type.value] ?? FileText;
          const isSelected = selected === type.value;

          return (
            <motion.button
              key={type.value}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(type.value)}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-xl border p-5 transition-all duration-300",
                isSelected
                  ? "border-saffron bg-saffron/10 shadow-[0_0_20px_rgba(255,153,0,0.15)]"
                  : "border-gold/10 bg-[#1A0E0A] hover:border-gold/20 hover:bg-cream/[0.02]"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                  isSelected
                    ? "bg-saffron/20 text-saffron"
                    : "bg-cream/5 text-cream/40 group-hover:text-cream/60"
                )}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "font-[family-name:var(--font-satoshi)] text-sm font-medium transition-colors",
                    isSelected ? "text-saffron" : "text-cream/70"
                  )}
                >
                  {type.label}
                </p>
                <p className="font-[family-name:var(--font-noto-serif)] text-xs text-cream/30">
                  {type.labelHi}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Step 2: Details ─── */

function StepDetails({
  formData,
  onUpdate,
}: {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: string) => void;
}) {
  return (
    <motion.div {...fadeUp} className="space-y-4">
      <div>
        <h2 className="mb-1 font-[family-name:var(--font-playfair)] text-lg font-bold text-cream">
          Activity Details
        </h2>
        <p className="mb-6 font-[family-name:var(--font-noto-serif)] text-sm text-cream/40">
          गतिविधि का विवरण भरें
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label="Title (English)"
          labelHi="शीर्षक"
          value={formData.titleEn}
          onChange={(v) => onUpdate("titleEn", v)}
          placeholder="e.g. Legal Awareness Seminar"
          required
        />
        <FormInput
          label="Title (Hindi)"
          labelHi="हिन्दी शीर्षक"
          value={formData.titleHi}
          onChange={(v) => onUpdate("titleHi", v)}
          placeholder="उदा. कानूनी जागरूकता सेमिनार"
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label="Start Date"
          labelHi="आरम्भ तिथि"
          type="date"
          value={formData.date}
          onChange={(v) => onUpdate("date", v)}
          required
        />
        <FormInput
          label="End Date (optional)"
          labelHi="समाप्ति तिथि"
          type="date"
          value={formData.endDate}
          onChange={(v) => onUpdate("endDate", v)}
        />
      </div>

      <FormInput
        label="Location"
        labelHi="स्थान"
        value={formData.location}
        onChange={(v) => onUpdate("location", v)}
        placeholder="e.g. High Court Campus, Lucknow"
        required
      />

      <div className="space-y-1.5">
        <label className="block font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/60">
          Chetra
          <span className="ml-1.5 font-[family-name:var(--font-noto-serif)] text-cream/30">
            (क्षेत्र)
          </span>
          <span className="ml-0.5 text-saffron">*</span>
        </label>
        <select
          value={formData.chetra}
          onChange={(e) => onUpdate("chetra", e.target.value)}
          className="w-full rounded-lg border border-gold/10 bg-[#1A0E0A] px-3 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream focus:border-saffron/30 focus:outline-none focus:ring-1 focus:ring-saffron/20"
        >
          <option value="" className="text-cream/30">
            Select Chetra
          </option>
          {CHETRAS.map((k) => (
            <option key={k.id} value={k.id}>
              {k.nameEn} — {k.nameHi}
            </option>
          ))}
        </select>
      </div>

      <FormTextarea
        label="Description"
        labelHi="विवरण"
        value={formData.description}
        onChange={(v) => onUpdate("description", v)}
        placeholder="Brief description of the activity..."
        rows={4}
      />
    </motion.div>
  );
}

/* ─── Step 3: Attendance ─── */

function StepAttendance({
  formData,
  onUpdate,
}: {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: string) => void;
}) {
  return (
    <motion.div {...fadeUp} className="space-y-4">
      <div>
        <h2 className="mb-1 font-[family-name:var(--font-playfair)] text-lg font-bold text-cream">
          Attendance Details
        </h2>
        <p className="mb-6 font-[family-name:var(--font-noto-serif)] text-sm text-cream/40">
          उपस्थिति विवरण
        </p>
      </div>

      <FormInput
        label="Expected Attendees"
        labelHi="अपेक्षित उपस्थिति"
        type="number"
        value={formData.expectedAttendees}
        onChange={(v) => onUpdate("expectedAttendees", v)}
        placeholder="e.g. 150"
      />

      <FormInput
        label="Chief Guest"
        labelHi="मुख्य अतिथि"
        value={formData.chiefGuest}
        onChange={(v) => onUpdate("chiefGuest", v)}
        placeholder="Name of chief guest"
      />

      <FormInput
        label="Coordinator"
        labelHi="समन्वयक"
        value={formData.coordinator}
        onChange={(v) => onUpdate("coordinator", v)}
        placeholder="Name of coordinator"
      />

      <FormTextarea
        label="Notes"
        labelHi="टिप्पणी"
        value={formData.attendanceNotes}
        onChange={(v) => onUpdate("attendanceNotes", v)}
        placeholder="Additional notes regarding attendance..."
        rows={3}
      />
    </motion.div>
  );
}

/* ─── Step 4: Photos ─── */

function StepPhotos({
  photos,
  onAddPhotos,
  onRemovePhoto,
}: {
  photos: typeof MOCK_THUMBNAILS;
  onAddPhotos: () => void;
  onRemovePhoto: (id: string) => void;
}) {
  return (
    <motion.div {...fadeUp} className="space-y-4">
      <div>
        <h2 className="mb-1 font-[family-name:var(--font-playfair)] text-lg font-bold text-cream">
          Upload Photos
        </h2>
        <p className="mb-6 font-[family-name:var(--font-noto-serif)] text-sm text-cream/40">
          फ़ोटो अपलोड करें
        </p>
      </div>

      {/* Drag-and-drop zone */}
      <button
        type="button"
        onClick={onAddPhotos}
        className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gold/15 bg-[#1A0E0A] p-10 transition-colors hover:border-saffron/30 hover:bg-cream/[0.02]"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron/10">
          <Upload className="h-6 w-6 text-saffron/60" />
        </div>
        <div className="text-center">
          <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/60">
            Click or drag to upload
          </p>
          <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/30">
            Upload up to 5 photos (JPG, PNG)
          </p>
        </div>
      </button>

      {/* Thumbnails */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square rounded-lg border border-gold/10 bg-cream/5 overflow-hidden"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-1.5">
                <ImageIcon className="h-6 w-6 text-cream/20" />
                <p className="font-[family-name:var(--font-satoshi)] text-[10px] text-cream/30">
                  {photo.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemovePhoto(photo.id)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/80 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Step 5: Preview ─── */

function StepPreview({
  formData,
  onEditStep,
}: {
  formData: FormData;
  onEditStep: (step: number) => void;
}) {
  const typeInfo = ACTIVITY_TYPES.find((t) => t.value === formData.activityType);
  const chetraInfo = CHETRAS.find((k) => k.id === formData.chetra);

  function SectionHeader({
    title,
    step,
  }: {
    title: string;
    step: number;
  }) {
    return (
      <div className="flex items-center justify-between border-b border-gold/10 pb-2">
        <h3 className="font-[family-name:var(--font-satoshi)] text-xs font-semibold uppercase tracking-wide text-cream/40">
          {title}
        </h3>
        <button
          type="button"
          onClick={() => onEditStep(step)}
          className="flex items-center gap-1 rounded-md px-2 py-1 font-[family-name:var(--font-satoshi)] text-[11px] text-saffron/60 transition-colors hover:bg-saffron/10 hover:text-saffron"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
    );
  }

  function InfoRow({ label, value }: { label: string; value: string }) {
    return (
      <div className="flex justify-between gap-4 py-1.5">
        <span className="font-[family-name:var(--font-satoshi)] text-xs text-cream/40 shrink-0">
          {label}
        </span>
        <span className="font-[family-name:var(--font-satoshi)] text-xs text-cream/80 text-right">
          {value || "—"}
        </span>
      </div>
    );
  }

  return (
    <motion.div {...fadeUp} className="space-y-5">
      <div>
        <h2 className="mb-1 font-[family-name:var(--font-playfair)] text-lg font-bold text-cream">
          Review & Submit
        </h2>
        <p className="mb-6 font-[family-name:var(--font-noto-serif)] text-sm text-cream/40">
          समीक्षा करें और जमा करें
        </p>
      </div>

      <div className="rounded-xl border border-gold/10 bg-[#1A0E0A] p-4 space-y-5">
        {/* Type */}
        <div className="space-y-2">
          <SectionHeader title="Activity Type" step={1} />
          <div className="flex items-center gap-3 pt-1">
            {typeInfo && (
              <>
                {(() => {
                  const Icon = ICON_MAP[typeInfo.value] ?? FileText;
                  return (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-saffron/15">
                      <Icon className="h-4.5 w-4.5 text-saffron" />
                    </div>
                  );
                })()}
                <div>
                  <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                    {typeInfo.label}
                  </p>
                  <p className="font-[family-name:var(--font-noto-serif)] text-xs text-cream/30">
                    {typeInfo.labelHi}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <SectionHeader title="Details" step={2} />
          <InfoRow label="Title (EN)" value={formData.titleEn} />
          <InfoRow label="Title (HI)" value={formData.titleHi} />
          <InfoRow label="Date" value={formData.date} />
          {formData.endDate && (
            <InfoRow label="End Date" value={formData.endDate} />
          )}
          <InfoRow label="Location" value={formData.location} />
          <InfoRow
            label="Chetra"
            value={
              chetraInfo
                ? `${chetraInfo.nameEn} (${chetraInfo.nameHi})`
                : "—"
            }
          />
          {formData.description && (
            <div className="pt-1">
              <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/40 mb-1">
                Description
              </p>
              <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/60 leading-relaxed">
                {formData.description}
              </p>
            </div>
          )}
        </div>

        {/* Attendance */}
        <div className="space-y-2">
          <SectionHeader title="Attendance" step={3} />
          <InfoRow
            label="Expected Attendees"
            value={formData.expectedAttendees}
          />
          <InfoRow label="Chief Guest" value={formData.chiefGuest} />
          <InfoRow label="Coordinator" value={formData.coordinator} />
          {formData.attendanceNotes && (
            <div className="pt-1">
              <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/40 mb-1">
                Notes
              </p>
              <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/60 leading-relaxed">
                {formData.attendanceNotes}
              </p>
            </div>
          )}
        </div>

        {/* Photos */}
        <div className="space-y-2">
          <SectionHeader title="Photos" step={4} />
          {formData.photos.length > 0 ? (
            <div className="flex gap-2 pt-1">
              {formData.photos.map((p) => (
                <div
                  key={p.id}
                  className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border border-gold/10 bg-cream/5"
                >
                  <ImageIcon className="h-4 w-4 text-cream/20" />
                  <p className="font-[family-name:var(--font-satoshi)] text-[8px] text-cream/30 mt-0.5">
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-[family-name:var(--font-satoshi)] text-xs text-cream/30 pt-1">
              No photos uploaded
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Step 6: Submit Success ─── */

function StepSubmitSuccess() {
  return (
    <motion.div
      {...fadeUp}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        {...scaleIn}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15"
      >
        <CheckCircle className="h-10 w-10 text-emerald-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.3,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        }}
        className="mb-2 font-[family-name:var(--font-playfair)] text-xl font-bold text-cream"
      >
        Activity Submitted for Review
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.45,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        }}
        className="mb-8 font-[family-name:var(--font-noto-serif)] text-sm text-cream/40"
      >
        गतिविधि समीक्षा के लिए जमा कर दी गई है
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 0.6,
            duration: 0.5,
          },
        }}
      >
        <Link
          href="/dashboard/activities"
          className="inline-flex items-center gap-2 rounded-lg bg-saffron px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Activities
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─── */

export default function NewActivityPage() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ ...INITIAL_FORM_DATA });

  const updateField = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAddPhotos = useCallback(() => {
    setFormData((prev) => {
      if (prev.photos.length >= 5) return prev;
      const nextIdx = prev.photos.length + 1;
      return {
        ...prev,
        photos: [
          ...prev.photos,
          { id: `ph${nextIdx}`, label: `IMG_00${nextIdx}.jpg` },
        ],
      };
    });
  }, []);

  const handleRemovePhoto = useCallback((id: string) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((p) => p.id !== id),
    }));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleGoToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return formData.activityType !== "";
      case 2:
        return (
          formData.titleEn.trim() !== "" &&
          formData.date !== "" &&
          formData.chetra !== ""
        );
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const isSubmitStep = currentStep === 6;

  return (
    <div className="min-h-screen">
      <DashboardHeader title="New Activity" titleHi="नई गतिविधि" />

      <div className="mx-auto max-w-2xl p-4 lg:p-6">
        {/* Step Indicator */}
        {!isSubmitStep && (
          <StepIndicator
            currentStep={currentStep}
            onStepClick={handleGoToStep}
          />
        )}

        {/* Step Label */}
        {!isSubmitStep && (
          <motion.div
            key={`label-${currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center"
          >
            <p className="font-[family-name:var(--font-satoshi)] text-xs uppercase tracking-widest text-saffron/60">
              Step {currentStep} of 6 &mdash;{" "}
              {STEPS[currentStep - 1].label}
            </p>
          </motion.div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <div key={currentStep}>
            {currentStep === 1 && (
              <StepType
                selected={formData.activityType}
                onSelect={(v) => updateField("activityType", v)}
              />
            )}
            {currentStep === 2 && (
              <StepDetails formData={formData} onUpdate={updateField} />
            )}
            {currentStep === 3 && (
              <StepAttendance formData={formData} onUpdate={updateField} />
            )}
            {currentStep === 4 && (
              <StepPhotos
                photos={formData.photos}
                onAddPhotos={handleAddPhotos}
                onRemovePhoto={handleRemovePhoto}
              />
            )}
            {currentStep === 5 && (
              <StepPreview
                formData={formData}
                onEditStep={handleGoToStep}
              />
            )}
            {currentStep === 6 && <StepSubmitSuccess />}
          </div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {!isSubmitStep && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.2,
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              },
            }}
            className="mt-8 flex items-center justify-between border-t border-gold/10 pt-6"
          >
            {/* Left side */}
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 rounded-lg border border-gold/10 bg-cream/[0.02] px-4 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream/60 transition-colors hover:border-gold/20 hover:text-cream"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Save as Draft */}
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-gold/10 bg-cream/[0.02] px-4 py-2.5 font-[family-name:var(--font-satoshi)] text-sm text-cream/40 transition-colors hover:border-gold/20 hover:text-cream/60"
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline">Save as Draft</span>
              </button>

              {/* Next / Submit */}
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-5 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium transition-all",
                  canProceed()
                    ? "bg-saffron text-white hover:bg-saffron-bright"
                    : "bg-saffron/20 text-cream/30 cursor-not-allowed"
                )}
              >
                {currentStep === 5 ? "Submit" : "Next"}
                {currentStep < 5 && <ChevronRight className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
