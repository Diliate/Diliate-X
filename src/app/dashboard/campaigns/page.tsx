"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlusCircle, Send } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import CampaignStatusBadge from "@/components/sections/CampaignStatusBadge";
import {
  apiFetch,
  formatDate,
  formatNumber,
  formatPercent,
  toCampaigns,
  type Campaign,
} from "@/lib/dashboard";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/campaigns")
      .then((data) => setCampaigns(toCampaigns(data)))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground text-2xl font-bold">Campaigns</h1>
          <p className="text-secondary-foreground mt-1 text-sm">
            {loading
              ? "Loading campaigns…"
              : `${campaigns.length} campaign${campaigns.length === 1 ? "" : "s"}`}
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
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner label="Loading campaigns" />
        </div>
      ) : campaigns.length === 0 && !error ? (
        <div className="border-border bg-card flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
          <div className="bg-primary/10 rounded-full p-3">
            <Send aria-hidden className="text-primary-ink h-6 w-6" />
          </div>
          <p className="text-secondary-foreground text-sm">
            No campaigns yet — create your first one
          </p>
          <Link
            href="/dashboard/new-campaign"
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 rounded-md px-4 py-2 text-sm font-semibold"
          >
            Create campaign
          </Link>
        </div>
      ) : campaigns.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="border-border bg-card overflow-x-auto rounded-xl border"
        >
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-border text-secondary-foreground border-b text-xs tracking-wide uppercase">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Name
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="px-5 py-3 text-right font-medium">
                  Sent
                </th>
                <th scope="col" className="px-5 py-3 text-right font-medium">
                  Open rate
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {campaigns.map((c) => (
                <tr
                  key={c.id || c.name}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="text-foreground max-w-xs truncate px-5 py-3.5 font-medium">
                    {c.name}
                  </td>
                  <td className="px-5 py-3.5">
                    <CampaignStatusBadge status={c.status} />
                  </td>
                  <td className="text-foreground px-5 py-3.5 text-right tabular-nums">
                    {formatNumber(c.sent)}
                  </td>
                  <td className="text-foreground px-5 py-3.5 text-right tabular-nums">
                    {c.openRate === null ? "—" : formatPercent(c.openRate)}
                  </td>
                  <td className="text-secondary-foreground px-5 py-3.5">
                    {formatDate(c.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : null}
    </div>
  );
}
