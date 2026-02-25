"use client";

import type { ReactNode } from "react";
import { DashboardGuard } from "@/components/dashboard/DashboardGuard";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardGuard requireAdmin>
      {children}
    </DashboardGuard>
  );
}
