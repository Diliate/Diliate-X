"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
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
  Bell,
  Inbox,
} from "lucide-react";
import { clearSession, USER_STORAGE_KEY, type StoredUser } from "@/lib/auth";
import {
  apiFetch,
  ApiError,
  formatNumber,
  toUserProfile,
  toUserStats,
  type UserProfile,
} from "@/lib/dashboard";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Send },
  { href: "/dashboard/new-campaign", label: "New Campaign", icon: PlusCircle },
  { href: "/dashboard/gmail-pool", label: "Gmail Pool", icon: Inbox },
  { href: "/dashboard/instances", label: "EC2 Instances", icon: Server },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const isActive = (pathname: string, href: string) =>
  href === "/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

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
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
        active
          ? "bg-primary/10 text-primary"
          : "text-secondary-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      <Icon aria-hidden className="h-4 w-4" />
      {label}
    </Link>
  );
}

interface Usage {
  plan: string;
  emailsUsed: number;
  emailsLimit: number;
}

/** Signs out: clears the session cookie + cached user and returns to /login. */
function logout() {
  clearSession();
  window.location.href = "/login";
}

const noopSubscribe = () => () => {};

/** Raw cached user JSON from login/signup; null on the server or when storage is unavailable. */
function readCachedUser() {
  try {
    return localStorage.getItem(USER_STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<UserProfile | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);

  // Show the cached user immediately (without a hydration mismatch), then prefer the backend's copy.
  const cachedRaw = useSyncExternalStore(
    noopSubscribe,
    readCachedUser,
    () => null,
  );
  const cachedUser = useMemo<Partial<StoredUser>>(() => {
    try {
      return cachedRaw ? (JSON.parse(cachedRaw) as StoredUser) : {};
    } catch {
      return {};
    }
  }, [cachedRaw]);
  const user = fetchedUser ?? {
    name: cachedUser.name ?? "",
    email: cachedUser.email ?? "",
  };

  useEffect(() => {
    apiFetch("/api/user/me")
      .then((data) => setFetchedUser(toUserProfile(data)))
      .catch((err) => {
        // Expired or invalid token: the proxy only checks that the cookie exists.
        if (err instanceof ApiError && err.status === 401) logout();
      });

    apiFetch("/api/user/stats")
      .then((data) => {
        const { plan, emailsUsed, emailsLimit } = toUserStats(data);
        setUsage({ plan, emailsUsed, emailsLimit });
      })
      .catch(() => setUsage(null));
  }, []);

  const usagePct =
    usage && usage.emailsLimit > 0
      ? Math.min(100, (usage.emailsUsed / usage.emailsLimit) * 100)
      : 0;
  const displayName = user.name || user.email.split("@")[0] || "Account";
  const pageTitle =
    navItems.find((n) => isActive(pathname, n.href))?.label ?? "Dashboard";

  return (
    <div className="bg-background flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`border-sidebar-border bg-sidebar fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="border-sidebar-border flex items-center justify-between border-b px-4 py-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md">
              <Mail aria-hidden className="text-primary-foreground h-4 w-4" />
            </div>
            <span className="text-foreground font-bold">Diliate</span>
          </Link>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="text-muted-foreground hover:text-foreground md:hidden"
          >
            <X aria-hidden className="h-4 w-4" />
          </button>
        </div>

        {/* Plan badge */}
        <div className="border-primary/20 bg-primary/5 mx-3 mt-4 rounded-lg border px-3 py-2">
          <div className="text-primary text-xs font-medium capitalize">
            {usage ? `${usage.plan} Plan` : "Loading plan…"}
          </div>
          {usage && (
            <div className="text-secondary-foreground mt-1 text-xs">
              {formatNumber(usage.emailsUsed)} /{" "}
              {usage.emailsLimit > 0 ? formatNumber(usage.emailsLimit) : "∞"}{" "}
              emails used
            </div>
          )}
          <div
            className="bg-secondary mt-1.5 h-1 rounded-full"
            role="progressbar"
            aria-label="Monthly email usage"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(usagePct)}
          >
            <div
              className="bg-primary h-1 rounded-full transition-[width]"
              style={{ width: `${usagePct}%` }}
            />
          </div>
          <Link
            href="/dashboard/settings?tab=billing"
            className="text-primary mt-2 block text-xs hover:underline"
          >
            Upgrade plan →
          </Link>
        </div>

        {/* Nav */}
        <nav aria-label="Dashboard" className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              active={isActive(pathname, item.href)}
              onClick={() => setSidebarOpen(false)}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="border-sidebar-border border-t p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <div
              aria-hidden
              className="bg-primary/20 text-primary flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold uppercase"
            >
              {displayName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-foreground truncate text-xs font-medium">
                {displayName}
              </div>
              <div className="text-secondary-foreground truncate text-xs">
                {user.email}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-secondary-foreground hover:bg-secondary mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:text-red-400"
          >
            <LogOut aria-hidden className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex min-w-0 flex-1 flex-col md:pl-60">
        {/* Topbar */}
        <header className="border-border bg-background/95 sticky top-0 z-20 flex h-14 items-center justify-between border-b px-4 backdrop-blur-md md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            className="text-muted-foreground hover:text-foreground md:hidden"
          >
            <Menu aria-hidden className="h-5 w-5" />
          </button>
          <div className="text-secondary-foreground hidden text-sm font-medium md:block">
            {pageTitle}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="text-muted-foreground hover:text-foreground relative"
            >
              <Bell aria-hidden className="h-4 w-4" />
              <span className="bg-primary absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full" />
            </button>
            <Link
              href="/dashboard/new-campaign"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all"
            >
              <PlusCircle aria-hidden className="h-3.5 w-3.5" />
              New Campaign
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </main>
      </div>
    </div>
  );
}
