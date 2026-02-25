"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Globe,
  Shield,
  Phone,
  Mail,
  MapPin,
  Save,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/lib/auth-context";
import { ROLE_LABELS, type RoleName } from "@/lib/constants";
import { cn, getInitials } from "@/lib/utils";
import { Link } from "@/i18n/routing";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
}

function ToggleSwitch({ enabled, onToggle, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/80">
          {label}
        </p>
        {description && (
          <p className="mt-0.5 font-[family-name:var(--font-satoshi)] text-[11px] text-cream/30">
            {description}
          </p>
        )}
      </div>
      <button
        onClick={onToggle}
        role="switch"
        aria-pressed={enabled}
        aria-checked={enabled}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          enabled ? "bg-saffron" : "bg-cream/10"
        )}
        aria-label={`Toggle ${label}`}
      >
        <span
          className={cn(
            "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            enabled && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState({
    caseUpdates: true,
    hearingReminders: true,
    activityAlerts: true,
    announcements: true,
    weeklyDigest: false,
  });

  const [language, setLanguage] = useState<"hi" | "en">("hi");
  const [showToast, setShowToast] = useState(false);

  const handleSave = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader title="Settings" titleHi="सेटिंग्स" />

      <div className="p-4 lg:p-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl space-y-6"
        >
          {/* Profile Section */}
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-xl border border-gold/10 bg-[#1A0E0A]"
          >
            <div className="border-b border-gold/10 bg-cream/[0.02] px-5 py-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-saffron" />
                <h2 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                  Profile
                </h2>
              </div>
            </div>

            <div className="p-5">
              {user ? (
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Avatar */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron/30 to-maroon/30">
                    <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-cream">
                      {getInitials(user.name)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <p className="font-[family-name:var(--font-satoshi)] text-lg font-medium text-cream">
                        {user.name}
                      </p>
                      <p className="font-[family-name:var(--font-noto-serif)] text-sm text-cream/40">
                        {user.nameHi}
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-cream/50">
                        <Shield className="h-3.5 w-3.5 text-saffron/60" />
                        <span className="font-[family-name:var(--font-satoshi)] text-xs">
                          {ROLE_LABELS[user.role as RoleName]?.en ?? user.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-cream/50">
                        <Phone className="h-3.5 w-3.5 text-cream/30" />
                        <span className="font-[family-name:var(--font-satoshi)] text-xs">
                          +91 {user.phone}
                        </span>
                      </div>
                      {user.khetraId && (
                        <div className="flex items-center gap-2 text-cream/50">
                          <MapPin className="h-3.5 w-3.5 text-cream/30" />
                          <span className="font-[family-name:var(--font-satoshi)] text-xs capitalize">
                            {user.khetraId.replace(/-/g, " ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="font-[family-name:var(--font-satoshi)] text-sm text-cream/30">
                  Please log in to view your profile.
                </p>
              )}
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-xl border border-gold/10 bg-[#1A0E0A]"
          >
            <div className="border-b border-gold/10 bg-cream/[0.02] px-5 py-4">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-saffron" />
                <h2 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                  Notification Preferences
                </h2>
              </div>
            </div>

            <div className="divide-y divide-gold/5 px-5">
              <ToggleSwitch
                enabled={notifications.caseUpdates}
                onToggle={() => toggleNotification("caseUpdates")}
                label="Case Updates"
                description="Get notified when cases you follow are updated"
              />
              <ToggleSwitch
                enabled={notifications.hearingReminders}
                onToggle={() => toggleNotification("hearingReminders")}
                label="Hearing Reminders"
                description="Receive reminders before upcoming court hearings"
              />
              <ToggleSwitch
                enabled={notifications.activityAlerts}
                onToggle={() => toggleNotification("activityAlerts")}
                label="Activity Alerts"
                description="Notifications about upcoming events and activities"
              />
              <ToggleSwitch
                enabled={notifications.announcements}
                onToggle={() => toggleNotification("announcements")}
                label="Announcements"
                description="Important announcements from the National Office"
              />
              <ToggleSwitch
                enabled={notifications.weeklyDigest}
                onToggle={() => toggleNotification("weeklyDigest")}
                label="Weekly Digest"
                description="A weekly email summary of all activities and case updates"
              />
            </div>
          </motion.div>

          {/* Language Preference */}
          <motion.div
            variants={fadeUp}
            className="overflow-hidden rounded-xl border border-gold/10 bg-[#1A0E0A]"
          >
            <div className="border-b border-gold/10 bg-cream/[0.02] px-5 py-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-saffron" />
                <h2 className="font-[family-name:var(--font-playfair)] text-base font-bold text-cream">
                  Language Preference
                </h2>
              </div>
            </div>

            <div className="p-5">
              <div className="flex gap-3">
                <button
                  onClick={() => setLanguage("hi")}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                    language === "hi"
                      ? "border-saffron/30 bg-saffron/5"
                      : "border-gold/10 bg-cream/[0.02] hover:border-gold/20"
                  )}
                >
                  <span className="font-[family-name:var(--font-noto-serif)] text-2xl">
                    हि
                  </span>
                  <span
                    className={cn(
                      "font-[family-name:var(--font-satoshi)] text-xs",
                      language === "hi" ? "text-saffron" : "text-cream/50"
                    )}
                  >
                    Hindi
                  </span>
                  <span
                    className={cn(
                      "font-[family-name:var(--font-noto-serif)] text-[10px]",
                      language === "hi" ? "text-saffron/60" : "text-cream/30"
                    )}
                  >
                    हिन्दी
                  </span>
                </button>

                <button
                  onClick={() => setLanguage("en")}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                    language === "en"
                      ? "border-saffron/30 bg-saffron/5"
                      : "border-gold/10 bg-cream/[0.02] hover:border-gold/20"
                  )}
                >
                  <span className="font-[family-name:var(--font-playfair)] text-2xl text-cream/80">
                    En
                  </span>
                  <span
                    className={cn(
                      "font-[family-name:var(--font-satoshi)] text-xs",
                      language === "en" ? "text-saffron" : "text-cream/50"
                    )}
                  >
                    English
                  </span>
                  <span
                    className={cn(
                      "font-[family-name:var(--font-satoshi)] text-[10px]",
                      language === "en" ? "text-saffron/60" : "text-cream/30"
                    )}
                  >
                    English
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            variants={fadeUp}
            className="flex justify-end"
          >
            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-saffron px-6 py-2.5 font-[family-name:var(--font-satoshi)] text-sm font-medium text-white transition-colors hover:bg-saffron-bright"
            >
              <Save className="h-4 w-4" />
              Save Settings
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 shadow-lg"
          >
            <span className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-white">
              Settings saved
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
