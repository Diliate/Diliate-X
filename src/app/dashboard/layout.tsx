"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mail,
  LayoutDashboard,
  Send,
  Server,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  ChevronDown,
  Bell,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Send },
  { href: "/dashboard/new-campaign", label: "New Campaign", icon: PlusCircle },
  { href: "/dashboard/instances", label: "EC2 Instances", icon: Server },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

/** Sidebar nav item */
function NavItem({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
        active
          ? "bg-[#f5c842]/10 text-[#f5c842]"
          : "text-[#666] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]"
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? "text-[#f5c842]" : ""}`} />
      {label}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("diliate_token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[#1e1e1e] bg-[#111] transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-[#1e1e1e] px-4 py-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f5c842]">
              <Mail className="h-4 w-4 text-[#0d0d0d]" />
            </div>
            <span className="font-bold text-[#f0f0f0]">Diliate</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-[#444] hover:text-[#888] md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Plan badge */}
        <div className="mx-3 mt-4 rounded-lg border border-[#f5c842]/20 bg-[#f5c842]/5 px-3 py-2">
          <div className="text-xs font-medium text-[#f5c842]">Free Plan</div>
          <div className="mt-1 text-xs text-[#555]">30 / 50 emails used</div>
          <div className="mt-1.5 h-1 rounded-full bg-[#1e1e1e]">
            <div className="h-1 w-3/5 rounded-full bg-[#f5c842]" />
          </div>
          <Link
            href="/dashboard/settings?tab=billing"
            className="mt-2 block text-xs text-[#f5c842] hover:underline"
          >
            Upgrade plan →
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              active={pathname === item.href}
              onClick={() => setSidebarOpen(false)}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="border-t border-[#1e1e1e] p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5c842]/20 text-xs font-bold text-[#f5c842]">
              N
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium text-[#f0f0f0]">Nitin Sharma</div>
              <div className="truncate text-xs text-[#555]">nitin@diliate.com</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#555] transition-all hover:bg-[#1a1a1a] hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col md:pl-60">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#1e1e1e] bg-[#0d0d0d]/95 px-4 backdrop-blur-md md:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#555] hover:text-[#888] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden text-sm font-medium text-[#888] md:block">
            {navItems.find((n) => n.href === pathname)?.label ?? "Dashboard"}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-[#555] hover:text-[#888]">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#f5c842]" />
            </button>
            <Link
              href="/dashboard/new-campaign"
              className="flex items-center gap-1.5 rounded-md bg-[#f5c842] px-3 py-1.5 text-xs font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030]"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              New Campaign
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
