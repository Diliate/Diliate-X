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
        <h1 className="text-2xl font-bold text-[#f0f0f0]">Settings</h1>
        <p className="mt-1 text-sm text-[#555]">
          Manage your account and preferences
        </p>
      </div>

      {/* Tab nav */}
      <div className="flex overflow-x-auto border-b border-[#1e1e1e]">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
              tab === t
                ? "border-[#f5c842] text-[#f5c842]"
                : "border-transparent text-[#555] hover:text-[#888]"
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
          className="space-y-5 rounded-xl border border-[#1e1e1e] bg-[#111] p-6"
        >
          <h2 className="flex items-center gap-2 text-base font-semibold text-[#f0f0f0]">
            <User className="h-4 w-4 text-[#f5c842]" /> Profile Information
          </h2>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5c842]/20 text-2xl font-bold text-[#f5c842]">
              N
            </div>
            <div>
              <button className="text-sm text-[#f5c842] hover:underline">
                Change avatar
              </button>
              <p className="text-xs text-[#444]">JPG, PNG up to 2MB</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-[#888]">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Nitin Sharma"
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#f5c842]/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#888]">Email</label>
              <input
                type="email"
                defaultValue="nitin.sharma2882@gmail.com"
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#f5c842]/50"
              />
            </div>
          </div>

          <button className="rounded-md bg-[#f5c842] px-4 py-2 text-sm font-semibold text-[#0d0d0d] hover:bg-[#f0c030]">
            Save Changes
          </button>
        </motion.div>
      )}

      {/* ── Security ── */}
      {tab === "Security" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5 rounded-xl border border-[#1e1e1e] bg-[#111] p-6"
        >
          <h2 className="flex items-center gap-2 text-base font-semibold text-[#f0f0f0]">
            <Shield className="h-4 w-4 text-[#f5c842]" /> Security
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-[#888]">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#f5c842]/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#888]">
                New Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#f5c842]/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#888]">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Repeat new password"
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3 py-2.5 text-sm text-[#f0f0f0] outline-none focus:border-[#f5c842]/50"
              />
            </div>
          </div>

          <button className="rounded-md bg-[#f5c842] px-4 py-2 text-sm font-semibold text-[#0d0d0d] hover:bg-[#f0c030]">
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
          <div className="rounded-xl border border-[#f5c842]/30 bg-[#f5c842]/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[#f5c842]">
                  Free Plan
                </div>
                <div className="mt-1 text-xs text-[#555]">
                  30 / 50 emails used this month
                </div>
              </div>
              <div className="text-2xl font-bold text-[#f0f0f0]">$0/mo</div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#1e1e1e]">
              <div className="h-2 w-[60%] rounded-full bg-[#f5c842]" />
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
                className="rounded-xl border border-[#1e1e1e] bg-[#111] p-5"
              >
                <div className="text-sm font-bold text-[#f0f0f0]">
                  {plan.name}
                </div>
                <div className="mt-2 text-2xl font-bold text-[#f0f0f0]">
                  {plan.price}
                  <span className="text-sm font-normal text-[#555]">/mo</span>
                </div>
                <div className="mt-1 text-xs text-[#f5c842]">{plan.emails}</div>
                <ul className="mt-3 space-y-1.5">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-1.5 text-xs text-[#666]"
                    >
                      <CheckCircle className="h-3 w-3 text-[#f5c842]" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="mt-4 w-full rounded-md border border-[#f5c842]/30 py-2 text-xs font-semibold text-[#f5c842] hover:bg-[#f5c842]/10">
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
          className="rounded-xl border border-[#1e1e1e] bg-[#111] p-6"
        >
          <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-[#f0f0f0]">
            <Key className="h-4 w-4 text-[#f5c842]" /> API Keys
          </h2>
          <p className="mb-5 text-xs text-[#555]">
            Use these keys to integrate Diliate with your own apps and automate
            campaign creation.
          </p>

          <div className="space-y-3">
            <div className="rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#f0f0f0]">
                    Production API Key
                  </p>
                  <p className="mt-0.5 text-xs text-[#555]">
                    Created Sep 1, 2026
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <code className="rounded-md bg-[#1e1e1e] px-3 py-1 font-mono text-xs text-[#f5c842]">
                    dlx_prod_••••••••••••
                  </code>
                  <button className="text-xs text-[#444] hover:text-[#888]">
                    Reveal
                  </button>
                  <button className="text-xs text-[#444] hover:text-[#888]">
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-md border border-[#2a2a2a] px-4 py-2 text-sm text-[#666] hover:bg-[#1a1a1a] hover:text-[#888]">
              <Plus className="h-4 w-4" /> Generate New Key
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
