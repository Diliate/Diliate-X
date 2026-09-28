"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  XCircle,
  Clock,
  PlusCircle,
  Mail,
  Server,
  TrendingUp,
  ChevronRight,
  Activity,
} from "lucide-react";

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

const stats = [
  {
    label: "Emails Sent",
    value: "1,284",
    change: "+12% vs last month",
    icon: Send,
    color: "text-[#f5c842]",
    bg: "bg-[#f5c842]/10",
  },
  {
    label: "Delivered",
    value: "1,251",
    change: "97.4% delivery rate",
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    label: "Failed",
    value: "33",
    change: "2.6% failure rate",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    label: "Active Campaigns",
    value: "3",
    change: "2 paused, 1 running",
    icon: Activity,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

const recentCampaigns = [
  {
    id: "1",
    name: "Q4 Newsletter",
    status: "completed",
    sent: 540,
    failed: 12,
    mode: "SMTP",
    date: "Sep 28, 2026",
  },
  {
    id: "2",
    name: "Product Launch",
    status: "running",
    sent: 310,
    failed: 5,
    mode: "Gmail API",
    date: "Sep 29, 2026",
  },
  {
    id: "3",
    name: "Follow-up Blast",
    status: "paused",
    sent: 120,
    failed: 3,
    mode: "SMTP",
    date: "Sep 27, 2026",
  },
  {
    id: "4",
    name: "Weekly Digest",
    status: "completed",
    sent: 314,
    failed: 13,
    mode: "Gmail API",
    date: "Sep 25, 2026",
  },
];

const statusStyles: Record<string, string> = {
  completed: "bg-green-400/10 text-green-400",
  running: "bg-[#f5c842]/10 text-[#f5c842]",
  paused: "bg-[#1e1e1e] text-[#666]",
  failed: "bg-red-400/10 text-red-400",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Overview</h1>
          <p className="mt-1 text-sm text-[#555]">Welcome back, Nitin. Here&apos;s what&apos;s happening.</p>
        </div>
        <Link
          href="/dashboard/new-campaign"
          className="flex items-center gap-2 rounded-md bg-[#f5c842] px-4 py-2 text-sm font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030]"
        >
          <PlusCircle className="h-4 w-4" />
          New Campaign
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial="hidden"
            animate="visible"
            custom={i}
            variants={fadeUp}
            className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#555]">{stat.label}</p>
              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-[#f0f0f0]">{stat.value}</p>
            <p className="mt-1 text-xs text-[#444]">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Plan usage + quick actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Plan card */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeUp}
          className="rounded-xl border border-[#f5c842]/20 bg-[#f5c842]/5 p-5"
        >
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#f5c842]" />
            <span className="text-sm font-semibold text-[#f5c842]">Free Plan</span>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-[#666]">
              <span>Emails this month</span>
              <span>30 / 50</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-[#1e1e1e]">
              <div className="h-2 w-[60%] rounded-full bg-[#f5c842]" />
            </div>
          </div>
          <Link
            href="/dashboard/settings?tab=billing"
            className="mt-4 flex items-center gap-1 text-sm font-medium text-[#f5c842] hover:underline"
          >
            Upgrade for more <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={5}
          variants={fadeUp}
          className="col-span-2 rounded-xl border border-[#1e1e1e] bg-[#111] p-5"
        >
          <p className="mb-4 text-sm font-semibold text-[#888]">Quick Actions</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "New Campaign", icon: PlusCircle, href: "/dashboard/new-campaign" },
              { label: "View Campaigns", icon: Send, href: "/dashboard/campaigns" },
              { label: "EC2 Instances", icon: Server, href: "/dashboard/instances" },
              { label: "Analytics", icon: TrendingUp, href: "/dashboard/analytics" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-lg border border-[#1e1e1e] p-3 text-center text-xs text-[#666] transition-all hover:border-[#2a2a2a] hover:bg-[#1a1a1a] hover:text-[#f0f0f0]"
              >
                <action.icon className="h-5 w-5" />
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
        className="rounded-xl border border-[#1e1e1e] bg-[#111]"
      >
        <div className="flex items-center justify-between border-b border-[#1e1e1e] px-5 py-4">
          <h2 className="text-sm font-semibold text-[#f0f0f0]">Recent Campaigns</h2>
          <Link href="/dashboard/campaigns" className="text-xs text-[#f5c842] hover:underline">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-[#1e1e1e]">
          {recentCampaigns.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1e1e1e]">
                  <Send className="h-4 w-4 text-[#555]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#f0f0f0]">{c.name}</p>
                  <p className="text-xs text-[#555]">
                    {c.mode} · {c.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-[#f0f0f0]">{c.sent.toLocaleString()}</p>
                  <p className="text-xs text-[#555]">
                    {c.failed} failed
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[c.status]}`}
                >
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
