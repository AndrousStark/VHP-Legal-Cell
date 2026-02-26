"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ROLE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  Search,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldAlert,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface MockUser {
  id: string;
  name: string;
  phone: string;
  role: string;
  region: string;
  status: "active" | "inactive";
  lastActive: string;
}

const MOCK_USERS: MockUser[] = [
  { id: "1", name: "Dr. Abhishek Atrey", phone: "9876543210", role: "NATIONAL_ADMIN", region: "All India", status: "active", lastActive: "2 hours ago" },
  { id: "2", name: "Adv. Vikram Singh", phone: "9876543211", role: "CHETRA_CONVENOR", region: "Braj Chetra", status: "active", lastActive: "1 day ago" },
  { id: "3", name: "Adv. Kavita Mishra", phone: "9876543212", role: "PRANT_CONVENOR", region: "Rajasthan", status: "active", lastActive: "3 days ago" },
  { id: "4", name: "Adv. Suresh Patel", phone: "9876543213", role: "CHETRA_CONVENOR", region: "Paschim", status: "active", lastActive: "5 hours ago" },
  { id: "5", name: "Adv. Mohan Das", phone: "9876543214", role: "CHETRA_CONVENOR", region: "Dakshin", status: "inactive", lastActive: "2 weeks ago" },
  { id: "6", name: "Adv. Priya Sharma", phone: "9876543215", role: "COURT_CONVENOR", region: "Delhi HC", status: "active", lastActive: "6 hours ago" },
];

const ROLE_ICONS: Record<string, React.ElementType> = {
  NATIONAL_ADMIN: ShieldAlert,
  CHETRA_CONVENOR: ShieldCheck,
  PRANT_CONVENOR: Shield,
  COURT_CONVENOR: Shield,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = MOCK_USERS.filter((u) => {
    const matchesSearch =
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader title="User Management" titleHi="उपयोगकर्ता प्रबंधन" />

      <div className="p-4 lg:p-6">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full rounded-lg border border-gold/10 bg-[#1A0E0A] py-2.5 pl-10 pr-4 font-[family-name:var(--font-satoshi)] text-sm text-cream placeholder:text-cream/30 focus:border-saffron/30 focus:outline-none focus:ring-1 focus:ring-saffron/20"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-gold/10 bg-[#1A0E0A] px-3 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream focus:border-saffron/30 focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="NATIONAL_ADMIN">National Admin</option>
              <option value="CHETRA_CONVENOR">Chetra Convenor</option>
              <option value="PRANT_CONVENOR">Prant Convenor</option>
              <option value="COURT_CONVENOR">Court Convenor</option>
            </select>

            <button className="flex items-center gap-2 rounded-lg bg-saffron px-4 py-2.5 font-[family-name:var(--font-satoshi)] text-xs font-semibold text-white shadow-md transition-all hover:bg-saffron-bright">
              <UserPlus className="h-3.5 w-3.5" />
              Add User
            </button>
          </div>
        </motion.div>

        {/* User count */}
        <p className="mb-4 font-[family-name:var(--font-satoshi)] text-xs text-cream/30">
          {filtered.length} users found
        </p>

        {/* Users Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="overflow-hidden rounded-xl border border-gold/10 bg-[#1A0E0A]"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gold/10">
                  <th className="px-4 py-3 text-left font-[family-name:var(--font-satoshi)] text-[11px] font-semibold uppercase tracking-wider text-cream/30">
                    User
                  </th>
                  <th className="px-4 py-3 text-left font-[family-name:var(--font-satoshi)] text-[11px] font-semibold uppercase tracking-wider text-cream/30">
                    Role
                  </th>
                  <th className="hidden px-4 py-3 text-left font-[family-name:var(--font-satoshi)] text-[11px] font-semibold uppercase tracking-wider text-cream/30 md:table-cell">
                    Region
                  </th>
                  <th className="hidden px-4 py-3 text-left font-[family-name:var(--font-satoshi)] text-[11px] font-semibold uppercase tracking-wider text-cream/30 sm:table-cell">
                    Status
                  </th>
                  <th className="hidden px-4 py-3 text-left font-[family-name:var(--font-satoshi)] text-[11px] font-semibold uppercase tracking-wider text-cream/30 lg:table-cell">
                    Last Active
                  </th>
                  <th className="px-4 py-3 text-right font-[family-name:var(--font-satoshi)] text-[11px] font-semibold uppercase tracking-wider text-cream/30">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => {
                  const RoleIcon = ROLE_ICONS[user.role] ?? Shield;
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-gold/5 transition-colors hover:bg-cream/[0.02]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/15 bg-maroon/30">
                            <span className="font-[family-name:var(--font-playfair)] text-xs font-bold text-gold-bright/70">
                              {user.name
                                .split(" ")
                                .map((w) => w[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-[family-name:var(--font-satoshi)] text-sm font-medium text-cream/80">
                              {user.name}
                            </p>
                            <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-cream/30">
                              +91 {user.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <RoleIcon className="h-3.5 w-3.5 text-saffron/60" />
                          <span className="font-[family-name:var(--font-satoshi)] text-xs text-cream/60">
                            {ROLE_LABELS[user.role as keyof typeof ROLE_LABELS]?.en ?? user.role}
                          </span>
                        </div>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span className="font-[family-name:var(--font-satoshi)] text-xs text-cream/50">
                          {user.region}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                            user.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          )}
                        >
                          {user.status === "active" ? (
                            <CheckCircle className="h-2.5 w-2.5" />
                          ) : (
                            <XCircle className="h-2.5 w-2.5" />
                          )}
                          {user.status}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 lg:table-cell">
                        <span className="font-[family-name:var(--font-satoshi)] text-[11px] text-cream/30">
                          {user.lastActive}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          className="rounded-lg p-1.5 text-cream/30 transition-colors hover:bg-cream/5 hover:text-cream"
                          aria-label={`Actions for ${user.name}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
