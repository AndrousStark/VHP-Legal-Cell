"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";

interface DashboardGuardProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function DashboardGuard({ children, requireAdmin = false }: DashboardGuardProps) {
  const { isAuthenticated, isLoading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
    if (!isLoading && isAuthenticated && requireAdmin && !hasRole("NATIONAL_ADMIN")) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, requireAdmin, hasRole, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#120A07]">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-saffron" />
          <p className="mt-3 font-[family-name:var(--font-satoshi)] text-sm text-cream/50">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requireAdmin && !hasRole("NATIONAL_ADMIN")) return null;

  return <>{children}</>;
}
