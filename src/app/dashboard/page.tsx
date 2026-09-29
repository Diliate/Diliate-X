"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send,
  PlusCircle,
  Mail,
  Server,
  TrendingUp,
  ChevronRight,
  Eye,
  MousePointerClick,
  TrendingDown,
  Inbox,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import CampaignStatusBadge from "@/components/sections/CampaignStatusBadge";
import {
  apiFetch,
  formatDate,
  formatNumber,
  formatPercent,
  toCampaigns,
  toUserStats,
  type Campaign,
  type UserStats,
} from "@/lib/dashboard";

// easeOut bezier as const tuple satisfies Framer Motion's Easing type
const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: EASE },
  }),
};

const quickActions = [
  { label: "New Campaign", icon: PlusCircle, href: "/dashboard/new-campaign" },
  { label: "View Campaigns", icon: Send, href: "/dashboard/campaigns" },
  { label: "Gmail Pool", icon: Inbox, href: "/dashboard/gmail-pool" },
  { label: "EC2 Instances", icon: Server, href: "/dashboard/instances" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.allSettled([
      apiFetch("/api/user/stats"),
      apiFetch("/api/campaigns"),
    ]).then(([statsRes, campaignsRes]) => {
      if (statsRes.status === "fulfilled")
        setStats(toUserStats(statsRes.value));
      if (campaignsRes.status === "fulfilled")
        setCampaigns(toCampaigns(campaignsRes.value).slice(0, 5));
      const failed = [statsRes, campaignsRes].find(
        (r) => r.status === "rejected",
      );
      if (failed)
        setError(
          (failed.reason as Error).message ||
            "Some dashboard data could not be loaded",
        );
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner label="Loading dashboard" />
      </div>
    );
  }

  const statCards = stats
    ? [
        {
          label: "Emails Sent",
          value: formatNumber(stats.totalSent),
          icon: Send,
          color: "text-primary",
          bg: "bg-primary/10",
        },
        {
          label: "Open Rate",
          value: formatPercent(stats.openRate),
          icon: Eye,
          color: "text-green-400",
          bg: "bg-green-400/10",
        },
        {
          label: "Click Rate",
          value: formatPercent(stats.clickRate),
          icon: MousePointerClick,
          color: "text-blue-400",
          bg: "bg-blue-400/10",
        },
        {
          label: "Bounce Rate",
          value: formatPercent(stats.bounceRate),
          icon: TrendingDown,
          color: "text-red-400",
          bg: "bg-red-400/10",
        },
      ]
    : [];

  const usagePct =
    stats && stats.emailsLimit > 0
      ? Math.min(100, (stats.emailsUsed / stats.emailsLimit) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Overview</h1>
          <p className="text-secondary-foreground mt-1 text-sm">
            Here&apos;s what&apos;s happening with your sending.
          </p>
        </div>
        <Link
          href="/dashboard/new-campaign"
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all"
        >
          <PlusCircle aria-hidden className="h-4 w-4" />
          New Campaign
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {/* Stats grid */}
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              animate="visible"
              custom={i}
              variants={fadeUp}
              className="border-border bg-card rounded-xl border p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-secondary-foreground text-sm">
                  {stat.label}
                </p>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <stat.icon aria-hidden className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-foreground mt-3 text-3xl font-bold">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Plan usage + quick actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats && (
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="border-primary/20 bg-primary/5 rounded-xl border p-5"
          >
            <div className="flex items-center gap-2">
              <Mail aria-hidden className="text-primary h-4 w-4" />
              <span className="text-primary text-sm font-semibold capitalize">
                {stats.plan} Plan
              </span>
            </div>
            <div className="mt-3">
              <div className="text-secondary-foreground flex items-center justify-between text-xs">
                <span>Emails this month</span>
                <span>
                  {formatNumber(stats.emailsUsed)} /{" "}
                  {stats.emailsLimit > 0
                    ? formatNumber(stats.emailsLimit)
                    : "∞"}
                </span>
              </div>
              <div
                className="bg-secondary mt-1.5 h-2 rounded-full"
                role="progressbar"
                aria-label="Monthly email usage"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(usagePct)}
              >
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${usagePct}%` }}
                />
              </div>
            </div>
            <Link
              href="/dashboard/settings?tab=billing"
              className="text-primary mt-4 flex items-center gap-1 text-sm font-medium hover:underline"
            >
              Upgrade for more{" "}
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        )}

        {/* Quick actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeUp}
          className={`border-border bg-card rounded-xl border p-5 ${stats ? "md:col-span-2" : "md:col-span-3"}`}
        >
          <h2 className="text-secondary-foreground mb-4 text-sm font-semibold">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="border-border text-secondary-foreground hover:bg-secondary hover:text-foreground flex flex-col items-center gap-2 rounded-lg border p-3 text-center text-xs transition-all"
              >
                <action.icon aria-hidden className="h-5 w-5" />
                {action.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent campaigns */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={6}
        variants={fadeUp}
        className="border-border bg-card rounded-xl border"
      >
        <div className="border-border flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-foreground text-sm font-semibold">
            Recent Campaigns
          </h2>
          <Link
            href="/dashboard/campaigns"
            className="text-primary text-xs hover:underline"
          >
            View all →
          </Link>
        </div>
        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-5 py-10 text-center">
            <TrendingUp aria-hidden className="text-muted-foreground h-6 w-6" />
            <p className="text-secondary-foreground text-sm">
              No campaigns yet — create your first one
            </p>
            <Link
              href="/dashboard/new-campaign"
              className="text-primary text-sm font-medium hover:underline"
            >
              Create campaign →
            </Link>
          </div>
        ) : (
          <ul className="divide-border divide-y">
            {campaigns.map((c) => (
              <li
                key={c.id || c.name}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="bg-secondary flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                    <Send
                      aria-hidden
                      className="text-muted-foreground h-4 w-4"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-foreground truncate text-sm font-medium">
                      {c.name}
                    </p>
                    <p className="text-secondary-foreground text-xs">
                      {formatDate(c.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <div className="hidden text-right sm:block">
                    <p className="text-foreground text-sm font-medium">
                      {formatNumber(c.sent)}
                    </p>
                    <p className="text-secondary-foreground text-xs">sent</p>
                  </div>
                  <CampaignStatusBadge status={c.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
