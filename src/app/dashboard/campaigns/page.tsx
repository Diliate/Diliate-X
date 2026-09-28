"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send,
  Search,
  Filter,
  PlusCircle,
  MoreVertical,
  Play,
  Pause,
  Trash2,
  Copy,
  Eye,
  ChevronRight,
} from "lucide-react";

const campaigns = [
  {
    id: "1",
    name: "Q4 Newsletter",
    status: "completed",
    sent: 540,
    failed: 12,
    mode: "SMTP",
    pages: 2,
    date: "Sep 28, 2026",
    progress: 100,
  },
  {
    id: "2",
    name: "Product Launch Blast",
    status: "running",
    sent: 310,
    failed: 5,
    mode: "Gmail API",
    pages: 1,
    date: "Sep 29, 2026",
    progress: 57,
  },
  {
    id: "3",
    name: "Follow-up Campaign",
    status: "paused",
    sent: 120,
    failed: 3,
    mode: "SMTP",
    pages: 1,
    date: "Sep 27, 2026",
    progress: 30,
  },
  {
    id: "4",
    name: "Weekly Digest",
    status: "completed",
    sent: 314,
    failed: 13,
    mode: "Gmail API",
    pages: 2,
    date: "Sep 25, 2026",
    progress: 100,
  },
  {
    id: "5",
    name: "Black Friday Promo",
    status: "draft",
    sent: 0,
    failed: 0,
    mode: "SMTP",
    pages: 4,
    date: "Sep 24, 2026",
    progress: 0,
  },
];

const statusStyles: Record<string, string> = {
  completed: "bg-green-400/10 text-green-400",
  running: "bg-[#f5c842]/10 text-[#f5c842]",
  paused: "bg-[#1e1e1e] text-[#666]",
  failed: "bg-red-400/10 text-red-400",
  draft: "bg-blue-400/10 text-blue-400",
};

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = campaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f0f0f0]">Campaigns</h1>
          <p className="mt-1 text-sm text-[#555]">Manage and monitor all your email campaigns</p>
        </div>
        <Link
          href="/dashboard/new-campaign"
          className="flex items-center gap-2 rounded-md bg-[#f5c842] px-4 py-2 text-sm font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030]"
        >
          <PlusCircle className="h-4 w-4" />
          New Campaign
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-[#2a2a2a] bg-[#111] py-2 pl-9 pr-4 text-sm text-[#f0f0f0] placeholder-[#444] outline-none focus:border-[#f5c842]/50"
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "running", "completed", "paused", "draft"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-2 text-xs font-medium capitalize transition-all ${
                filter === f
                  ? "bg-[#f5c842] text-[#0d0d0d]"
                  : "border border-[#2a2a2a] text-[#555] hover:border-[#444] hover:text-[#888]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign list */}
      <div className="rounded-xl border border-[#1e1e1e] bg-[#111]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Send className="mb-3 h-10 w-10 text-[#2a2a2a]" />
            <p className="text-sm font-medium text-[#444]">No campaigns found</p>
            <p className="mt-1 text-xs text-[#333]">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1e1e1e]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-3 text-xs font-medium text-[#444]">
              <span>Campaign</span>
              <span className="hidden sm:block">Mode</span>
              <span className="hidden md:block">Progress</span>
              <span>Status</span>
              <span />
            </div>

            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-4 hover:bg-[#141414]"
              >
                {/* Name */}
                <div>
                  <Link
                    href={`/dashboard/campaigns/${c.id}`}
                    className="text-sm font-medium text-[#f0f0f0] hover:text-[#f5c842]"
                  >
                    {c.name}
                  </Link>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-[#555]">
                    <span>{c.sent.toLocaleString()} sent</span>
                    {c.failed > 0 && <span className="text-red-500">{c.failed} failed</span>}
                    <span>· {c.date}</span>
                    {c.pages > 1 && <span>· {c.pages} pages</span>}
                  </div>
                </div>

                {/* Mode */}
                <span className="hidden rounded-md border border-[#1e1e1e] px-2 py-0.5 text-xs text-[#555] sm:block">
                  {c.mode}
                </span>

                {/* Progress bar */}
                <div className="hidden w-24 md:block">
                  <div className="h-1.5 rounded-full bg-[#1e1e1e]">
                    <div
                      className={`h-1.5 rounded-full ${
                        c.status === "completed" ? "bg-green-400" : "bg-[#f5c842]"
                      }`}
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-right text-xs text-[#444]">{c.progress}%</p>
                </div>

                {/* Status */}
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[c.status]}`}
                >
                  {c.status}
                </span>

                {/* Actions menu */}
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                    className="rounded-md p-1.5 text-[#444] transition-all hover:bg-[#1e1e1e] hover:text-[#888]"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {openMenu === c.id && (
                    <div className="absolute right-0 z-10 mt-1 w-44 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] py-1 shadow-xl">
                      <Link
                        href={`/dashboard/campaigns/${c.id}`}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-[#888] hover:bg-[#222] hover:text-[#f0f0f0]"
                      >
                        <Eye className="h-3.5 w-3.5" /> View Details
                      </Link>
                      {c.status === "paused" && (
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#888] hover:bg-[#222] hover:text-[#f0f0f0]">
                          <Play className="h-3.5 w-3.5" /> Resume
                        </button>
                      )}
                      {c.status === "running" && (
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#888] hover:bg-[#222] hover:text-[#f0f0f0]">
                          <Pause className="h-3.5 w-3.5" /> Pause
                        </button>
                      )}
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[#888] hover:bg-[#222] hover:text-[#f0f0f0]">
                        <Copy className="h-3.5 w-3.5" /> Clone & Reuse
                      </button>
                      <hr className="my-1 border-[#2a2a2a]" />
                      <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-900/10">
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
