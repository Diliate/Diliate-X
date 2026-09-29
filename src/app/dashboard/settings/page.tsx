"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Plus, CheckCircle, Key, Shield } from "lucide-react";

const tabs = ["Profile", "Security", "Billing", "API Keys"];

export default function SettingsPage() {
  const [tab, setTab] = useState("Profile");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Settings</h1>
        <p className="text-secondary-foreground mt-1 text-sm">
          Manage your account and preferences
        </p>
      </div>

      {/* Tab nav */}
      <div className="border-border flex overflow-x-auto border-b">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
              tab === t
                ? "border-primary text-primary-ink"
                : "text-secondary-foreground hover:text-secondary-foreground border-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Profile ── */}
      {tab === "Profile" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-border bg-card space-y-5 rounded-xl border p-6"
        >
          <h2 className="text-foreground flex items-center gap-2 text-base font-semibold">
            <User className="text-primary-ink h-4 w-4" /> Profile Information
          </h2>

          <div className="flex items-center gap-4">
            <div className="bg-primary/20 text-primary-ink flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
              N
            </div>
            <div>
              <button className="text-primary-ink text-sm hover:underline">
                Change avatar
              </button>
              <p className="text-muted-foreground text-xs">
                JPG, PNG up to 2MB
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-secondary-foreground mb-1.5 block text-sm">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Nitin Sharma"
                className="border-border bg-background text-foreground focus:border-primary/50 w-full rounded-md border px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-secondary-foreground mb-1.5 block text-sm">
                Email
              </label>
              <input
                type="email"
                defaultValue="nitin.sharma2882@gmail.com"
                className="border-border bg-background text-foreground focus:border-primary/50 w-full rounded-md border px-3 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-semibold">
            Save Changes
          </button>
        </motion.div>
      )}

      {/* ── Security ── */}
      {tab === "Security" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-border bg-card space-y-5 rounded-xl border p-6"
        >
          <h2 className="text-foreground flex items-center gap-2 text-base font-semibold">
            <Shield className="text-primary-ink h-4 w-4" /> Security
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-secondary-foreground mb-1.5 block text-sm">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="border-border bg-background text-foreground focus:border-primary/50 w-full rounded-md border px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-secondary-foreground mb-1.5 block text-sm">
                New Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className="border-border bg-background text-foreground focus:border-primary/50 w-full rounded-md border px-3 py-2.5 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-secondary-foreground mb-1.5 block text-sm">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Repeat new password"
                className="border-border bg-background text-foreground focus:border-primary/50 w-full rounded-md border px-3 py-2.5 text-sm outline-none"
              />
            </div>
          </div>

          <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-semibold">
            Update Password
          </button>
        </motion.div>
      )}

      {/* ── Billing ── */}
      {tab === "Billing" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Current plan */}
          <div className="border-primary/30 bg-primary/5 rounded-xl border p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-primary-ink text-sm font-semibold">
                  Free Plan
                </div>
                <div className="text-secondary-foreground mt-1 text-xs">
                  30 / 50 emails used this month
                </div>
              </div>
              <div className="text-foreground text-2xl font-bold">$0/mo</div>
            </div>
            <div className="bg-secondary mt-4 h-2 rounded-full">
              <div className="bg-primary h-2 w-[60%] rounded-full" />
            </div>
          </div>

          {/* Upgrade plans */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$19",
                emails: "5,000/mo",
                features: [
                  "All Free features",
                  "Gmail OAuth sending",
                  "Priority support",
                ],
              },
              {
                name: "Pro",
                price: "$49",
                emails: "25,000/mo",
                features: [
                  "All Starter features",
                  "Multi-page campaigns",
                  "Clone & reuse",
                ],
              },
              {
                name: "Business",
                price: "$129",
                emails: "100,000/mo",
                features: [
                  "All Pro features",
                  "Priority infrastructure",
                  "Dedicated manager",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="border-border bg-card rounded-xl border p-5"
              >
                <div className="text-foreground text-sm font-bold">
                  {plan.name}
                </div>
                <div className="text-foreground mt-2 text-2xl font-bold">
                  {plan.price}
                  <span className="text-secondary-foreground text-sm font-normal">
                    /mo
                  </span>
                </div>
                <div className="text-primary-ink mt-1 text-xs">
                  {plan.emails}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="text-secondary-foreground flex items-center gap-1.5 text-xs"
                    >
                      <CheckCircle className="text-primary-ink h-3 w-3" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="border-primary/30 text-primary-ink hover:bg-primary/10 mt-4 w-full rounded-md border py-2 text-xs font-semibold">
                  Upgrade to {plan.name}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── API Keys ── */}
      {tab === "API Keys" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-border bg-card rounded-xl border p-6"
        >
          <h2 className="text-foreground mb-1 flex items-center gap-2 text-base font-semibold">
            <Key className="text-primary-ink h-4 w-4" /> API Keys
          </h2>
          <p className="text-secondary-foreground mb-5 text-xs">
            Use these keys to integrate Diliate with your own apps and automate
            campaign creation.
          </p>

          <div className="space-y-3">
            <div className="border-border bg-background rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground text-sm font-medium">
                    Production API Key
                  </p>
                  <p className="text-secondary-foreground mt-0.5 text-xs">
                    Created Sep 1, 2026
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-secondary text-primary-ink rounded-md px-3 py-1 font-mono text-xs">
                    dlx_prod_••••••••••••
                  </code>
                  <button className="text-muted-foreground hover:text-secondary-foreground text-xs">
                    Reveal
                  </button>
                  <button className="text-muted-foreground hover:text-secondary-foreground text-xs">
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <button className="border-border text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground flex items-center gap-2 rounded-md border px-4 py-2 text-sm">
              <Plus className="h-4 w-4" /> Generate New Key
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
