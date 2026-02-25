"use client";

import { useAuth } from "@/lib/auth-context";
import { ROLE_LABELS, type RoleName } from "@/lib/constants";
import { Bell, Search } from "lucide-react";
import { openCommandPalette } from "@/components/search/CommandPalette";

interface DashboardHeaderProps {
  title: string;
  titleHi?: string;
}

export function DashboardHeader({ title, titleHi }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gold/10 bg-[#1A0E0A]/50 px-4 backdrop-blur-sm lg:px-6">
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-cream">
          {title}
        </h1>
        {titleHi && (
          <p className="font-[family-name:var(--font-noto-serif)] text-xs text-cream/40">
            {titleHi}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search — opens Command Palette */}
        <button
          onClick={openCommandPalette}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-cream/40 transition-colors hover:bg-cream/5 hover:text-cream"
          aria-label="Search (Ctrl+K)"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-cream/40 transition-colors hover:bg-cream/5 hover:text-cream"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-saffron-bright text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* User badge */}
        {user && (
          <div className="hidden items-center gap-2 rounded-lg border border-gold/10 bg-cream/5 px-3 py-1.5 sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-saffron/20">
              <span className="font-[family-name:var(--font-playfair)] text-[10px] font-bold text-saffron-bright">
                {user.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream/80">
                {user.name.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="font-[family-name:var(--font-satoshi)] text-[10px] text-saffron/60">
                {ROLE_LABELS[user.role as RoleName]?.en ?? user.role}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
