"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { OTP_LENGTH } from "@/lib/constants";
import { cn, assetPath } from "@/lib/utils";
import Image from "next/image";
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

type Step = "phone" | "otp" | "success";

export function LoginForm() {
  const { login, verifyOtp } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successUser, setSuccessUser] = useState<string>("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first OTP input when step changes
  useEffect(() => {
    if (step === "otp") {
      otpRefs.current[0]?.focus();
    }
  }, [step]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(phone);
    setIsLoading(false);

    if (result.success) {
      setStep("otp");
    } else {
      setError(result.message);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-advance to next input
    if (value && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits entered
    if (value && index === OTP_LENGTH - 1) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === OTP_LENGTH) {
        handleOtpSubmit(fullOtp);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (otpString?: string) => {
    const code = otpString ?? otp.join("");
    if (code.length !== OTP_LENGTH) {
      setError("Please enter the complete OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await verifyOtp(phone, code);
    setIsLoading(false);

    if (result.success && result.user) {
      setSuccessUser(result.user.name);
      setStep("success");
      // Redirect after showing success
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } else {
      setError(result.message);
      setOtp(Array(OTP_LENGTH).fill(""));
      otpRefs.current[0]?.focus();
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-gold/20 bg-cream-light shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-br from-maroon-dark to-maroon px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/30 bg-cream shadow-lg overflow-hidden">
            <Image src={assetPath("/images/legal-logo.png")} alt="Legal Cell" width={40} height={40} className="object-contain" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-cream">
            Convenor Login
          </h1>
          <p className="mt-1 font-[family-name:var(--font-noto-serif)] text-sm text-cream/50">
            संयोजक लॉगिन
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Phone Number */}
            {step === "phone" && (
              <motion.form
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handlePhoneSubmit}
                className="space-y-5"
              >
                <div>
                  <label className="mb-1.5 block font-[family-name:var(--font-satoshi)] text-xs font-medium text-charcoal">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                        setError("");
                      }}
                      placeholder="Enter 10-digit number"
                      autoFocus
                      className="w-full rounded-xl border border-gold/15 bg-cream py-3 pl-12 pr-4 font-[family-name:var(--font-satoshi)] text-sm text-charcoal placeholder:text-charcoal-light/40 focus:border-saffron/30 focus:outline-none focus:ring-2 focus:ring-saffron/10"
                    />
                    <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-light/30" />
                  </div>
                </div>

                {error && <ErrorMessage message={error} />}

                <button
                  type="submit"
                  disabled={isLoading || phone.length !== 10}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-saffron px-6 py-3 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-white shadow-md transition-all hover:bg-saffron-bright hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-center font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal-light/50">
                  Demo: Use 9876543210 (Admin), 9876543211 (Chetra), 9876543212 (Prant)
                </p>
              </motion.form>
            )}

            {/* Step 2: OTP Verification */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="text-center">
                  <p className="font-[family-name:var(--font-satoshi)] text-sm text-charcoal">
                    Enter the 6-digit OTP sent to
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-maroon-dark">
                    +91 {phone}
                  </p>
                </div>

                {/* OTP Input Grid */}
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={cn(
                        "h-12 w-12 rounded-lg border text-center font-[family-name:var(--font-satoshi)] text-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-saffron/20",
                        digit
                          ? "border-saffron/30 bg-saffron/5 text-maroon-dark"
                          : "border-gold/15 bg-cream text-charcoal"
                      )}
                    />
                  ))}
                </div>

                {error && <ErrorMessage message={error} />}

                <button
                  onClick={() => handleOtpSubmit()}
                  disabled={isLoading || otp.join("").length !== OTP_LENGTH}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-saffron px-6 py-3 font-[family-name:var(--font-satoshi)] text-sm font-semibold text-white shadow-md transition-all hover:bg-saffron-bright hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Verify OTP
                      <Shield className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setStep("phone");
                      setOtp(Array(OTP_LENGTH).fill(""));
                      setError("");
                    }}
                    className="flex items-center gap-1 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light hover:text-saffron"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Change number
                  </button>
                  <button
                    onClick={() => handlePhoneSubmit({ preventDefault: () => {} } as React.FormEvent)}
                    className="font-[family-name:var(--font-satoshi)] text-xs text-saffron hover:text-saffron-bright"
                  >
                    Resend OTP
                  </button>
                </div>

                <p className="text-center font-[family-name:var(--font-satoshi)] text-[11px] text-charcoal-light/50">
                  Demo OTP: 123456
                </p>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="py-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-maroon-dark">
                  Welcome back!
                </h2>
                <p className="mt-1 font-[family-name:var(--font-satoshi)] text-sm text-charcoal-light">
                  {successUser}
                </p>
                <p className="mt-3 font-[family-name:var(--font-satoshi)] text-xs text-charcoal-light/50">
                  Redirecting to dashboard...
                </p>
                <div className="mt-3 flex justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-saffron" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-red-700"
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <p className="font-[family-name:var(--font-satoshi)] text-xs">{message}</p>
    </motion.div>
  );
}
