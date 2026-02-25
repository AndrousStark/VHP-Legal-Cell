"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "@/i18n/routing";
import { useAuth } from "@/lib/auth-context";
import { DASHBOARD_NAV, ADMIN_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarCheck,
  Scale,
  BookOpen,
  Users,
  Bell,
  Settings,
  UserCog,
  ShieldCheck,
  Database,
  BarChart3,
  ScrollText,
  FileBarChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  CalendarCheck,
  Scale,
  BookOpen,
  Users,
  Bell,
  Settings,
  UserCog,
  ShieldCheck,
  Database,
  BarChart3,
  ScrollText,
  FileBarChart,
};

interface SidebarProps {
  className?: string;
}

interface SidebarContentProps {
  user: ReturnType<typeof useAuth>["user"];
  collapsed: boolean;
  pathname: string;
  hasRole: ReturnType<typeof useAuth>["hasRole"];
  logout: ReturnType<typeof useAuth>["logout"];
  navItems: ReadonlyArray<{ id: string; label: string; labelHi: string; href: string; icon: string }>;
  onCollapse: () => void;
  onMobileClose: () => void;
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

function SidebarContent({
  user,
  collapsed,
  pathname,
  logout,
  navItems,
  onCollapse,
  onMobileClose,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo / Brand */}
      <div className="flex h-16 items-center justify-between border-b border-gold/10 px-4">
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gold/30">
                <Image src="/images/vhp-logo.jpg" alt="VHP" fill className="object-cover" sizes="32px" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-gold/30">
                <Image src="/images/vhp-logo.jpg" alt="VHP" fill className="object-cover" sizes="32px" />
              </div>
              <div className="relative h-7 w-7 shrink-0">
                <Image src="/images/legal-logo.png" alt="Legal Cell" fill className="object-contain" sizes="28px" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-playfair)] text-sm font-bold text-cream">
                  VHP Legal
                </p>
                <p className="font-[family-name:var(--font-satoshi)] text-[10px] text-cream/40">
                  Portal
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onCollapse}
          className="hidden rounded-lg p-1.5 text-cream/40 transition-colors hover:bg-cream/5 hover:text-cream lg:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* User Info */}
      {user && !collapsed && (
        <div className="border-b border-gold/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-maroon">
              <span className="font-[family-name:var(--font-playfair)] text-xs font-bold text-gold-bright">
                {user.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream">
                {user.name}
              </p>
              <p className="truncate font-[family-name:var(--font-satoshi)] text-[10px] text-saffron/70">
                {user.role.replace("_", " ")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
            const active = isActive(pathname, item.href);

            // Add separator before admin section
            const isFirstAdmin = item.id === "admin-users";

            return (
              <div key={item.id}>
                {isFirstAdmin && (
                  <div className="my-3 px-3">
                    <div className="h-px bg-gold/10" />
                    {!collapsed && (
                      <p className="mt-3 font-[family-name:var(--font-satoshi)] text-[10px] font-semibold uppercase tracking-wider text-cream/30">
                        Admin
                      </p>
                    )}
                  </div>
                )}
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                    active
                      ? "bg-saffron/15 text-saffron-bright"
                      : "text-cream/50 hover:bg-cream/5 hover:text-cream/80",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      active ? "text-saffron-bright" : "text-cream/40 group-hover:text-cream/60"
                    )}
                  />
                  {!collapsed && (
                    <span className="font-[family-name:var(--font-satoshi)] text-sm">
                      {item.label}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-gold/10 p-2">
        <button
          onClick={() => {
            logout();
            onMobileClose();
          }}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-cream/40 transition-all hover:bg-red-500/10 hover:text-red-400",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <span className="font-[family-name:var(--font-satoshi)] text-sm">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export function DashboardSidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, hasRole } = useAuth();

  const isAdmin = hasRole("NATIONAL_ADMIN");

  const navItems = [...DASHBOARD_NAV, ...(isAdmin ? ADMIN_NAV : [])];

  const sidebarProps: SidebarContentProps = {
    user,
    collapsed: isCollapsed,
    pathname,
    hasRole,
    logout,
    navItems,
    onCollapse: () => setIsCollapsed(!isCollapsed),
    onMobileClose: () => setIsMobileOpen(false),
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-maroon-dark shadow-lg lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5 text-cream" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-[280px] bg-[#1A0E0A] lg:hidden"
            >
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute right-3 top-4 rounded-lg p-1.5 text-cream/40 hover:text-cream"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent {...sidebarProps} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:flex h-screen flex-col bg-[#1A0E0A] border-r border-gold/10 transition-[width] duration-300",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
      >
        <SidebarContent {...sidebarProps} />
      </aside>
    </>
  );
}
