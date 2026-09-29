"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
} from "lucide-react";

const dailyData = [
  { day: "Mon", sent: 180, delivered: 175, failed: 5 },
  { day: "Tue", sent: 320, delivered: 310, failed: 10 },
  { day: "Wed", sent: 240, delivered: 232, failed: 8 },
  { day: "Thu", sent: 450, delivered: 438, failed: 12 },
  { day: "Fri", sent: 380, delivered: 370, failed: 10 },
  { day: "Sat", sent: 90, delivered: 88, failed: 2 },
  { day: "Sun", sent: 60, delivered: 58, failed: 2 },
];

const maxVal = Math.max(...dailyData.map((d) => d.sent));

export default function AnalyticsPage() {
  const totalSent = dailyData.reduce((s, d) => s + d.sent, 0);
  const totalDelivered = dailyData.reduce((s, d) => s + d.delivered, 0);
  const totalFailed = dailyData.reduce((s, d) => s + d.failed, 0);
  const deliveryRate = ((totalDelivered / totalSent) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Analytics</h1>
        <p className="text-secondary-foreground mt-1 text-sm">
          Last 7 days — Sep 23 to Sep 29, 2026
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Sent",
            value: totalSent.toLocaleString(),
            icon: Mail,
            color: "text-primary-ink",
          },
          {
            label: "Delivered",
            value: totalDelivered.toLocaleString(),
            icon: CheckCircle,
            color: "text-green-700",
          },
          {
            label: "Failed",
            value: totalFailed.toLocaleString(),
            icon: XCircle,
            color: "text-red-700",
          },
          {
            label: "Delivery Rate",
            value: `${deliveryRate}%`,
            icon: TrendingUp,
            color: "text-blue-700",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="border-border bg-card rounded-xl border p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-secondary-foreground text-sm">{stat.label}</p>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <p className="text-foreground mt-3 text-3xl font-bold">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-border bg-card rounded-xl border p-6"
      >
        <div className="mb-6 flex items-center gap-2">
          <BarChart3 className="text-primary-ink h-4 w-4" />
          <h2 className="text-foreground text-sm font-semibold">
            Daily Volume
          </h2>
        </div>

        {/* Legend */}
        <div className="text-secondary-foreground mb-4 flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="bg-primary h-2 w-2 rounded-sm" /> Sent
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-green-400" /> Delivered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-red-400" /> Failed
          </span>
        </div>

        <div className="flex items-end gap-3 md:gap-5">
          {dailyData.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{
                delay: 0.4 + i * 0.07,
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "bottom" }}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <div
                className="flex w-full items-end gap-0.5"
                style={{ height: "160px" }}
              >
                {/* Sent */}
                <div
                  className="bg-primary/30 flex-1 rounded-t-sm"
                  style={{ height: `${(d.sent / maxVal) * 100}%` }}
                />
                {/* Delivered */}
                <div
                  className="flex-1 rounded-t-sm bg-green-400/60"
                  style={{ height: `${(d.delivered / maxVal) * 100}%` }}
                />
              </div>
              <span className="text-muted-foreground text-xs">{d.day}</span>
              <span className="text-secondary-foreground text-xs font-medium">
                {d.sent}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Table breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border-border bg-card rounded-xl border"
      >
        <div className="border-border border-b px-5 py-4">
          <h2 className="text-foreground text-sm font-semibold">
            Daily Breakdown
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border text-muted-foreground border-b text-xs">
              <th className="px-5 py-3 text-left font-medium">Day</th>
              <th className="px-5 py-3 text-right font-medium">Sent</th>
              <th className="px-5 py-3 text-right font-medium">Delivered</th>
              <th className="px-5 py-3 text-right font-medium">Failed</th>
              <th className="px-5 py-3 text-right font-medium">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {dailyData.map((d) => (
              <tr key={d.day} className="hover:bg-card">
                <td className="text-secondary-foreground px-5 py-3">{d.day}</td>
                <td className="text-foreground px-5 py-3 text-right font-medium">
                  {d.sent}
                </td>
                <td className="px-5 py-3 text-right text-green-700">
                  {d.delivered}
                </td>
                <td className="px-5 py-3 text-right text-red-700">
                  {d.failed}
                </td>
                <td className="text-secondary-foreground px-5 py-3 text-right">
                  {((d.delivered / d.sent) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-border border-t text-xs font-bold">
              <td className="text-secondary-foreground px-5 py-3">Total</td>
              <td className="text-foreground px-5 py-3 text-right">
                {totalSent}
              </td>
              <td className="px-5 py-3 text-right text-green-700">
                {totalDelivered}
              </td>
              <td className="px-5 py-3 text-right text-red-700">
                {totalFailed}
              </td>
              <td className="text-primary-ink px-5 py-3 text-right">
                {deliveryRate}%
              </td>
            </tr>
          </tfoot>
        </table>
      </motion.div>
    </div>
  );
}
