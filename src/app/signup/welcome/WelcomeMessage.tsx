"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { WELCOME_STORAGE_KEY } from "../details/DetailsForm";

const noopSubscribe = () => () => {};

function readWelcome() {
  try {
    return sessionStorage.getItem(WELCOME_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Greets the new user by name and shows how their emails will appear to recipients. */
export default function WelcomeMessage() {
  const raw = useSyncExternalStore(noopSubscribe, readWelcome, () => null);
  const { firstName, companyName } = useMemo<{
    firstName?: string;
    companyName?: string;
  }>(() => {
    try {
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, [raw]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="bg-signup-input/40 mx-auto max-w-xl rounded-2xl border border-slate-700/70 p-8 text-center sm:p-10"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
        <CheckCircle2 aria-hidden className="h-12 w-12 text-green-400" />
      </div>
      <h1 className="text-3xl font-bold">
        Welcome to Diliate{firstName ? `, ${firstName}` : ""}!
      </h1>
      <p className="mt-3 text-slate-400">
        Your account is ready. Start sending emails with your company identity.
      </p>

      <div className="bg-signup-background/60 mt-8 rounded-lg border border-slate-700/70 p-4 text-left">
        <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">
          Your emails will appear as
        </p>
        <p className="mt-1.5 font-mono text-sm break-all text-white">
          {companyName || "Your Company"} &lt;noreply@diliate.com&gt;
        </p>
      </div>

      <Link
        href="/dashboard"
        className="bg-signup-accent hover:bg-signup-accent/90 focus-visible:ring-signup-accent focus-visible:ring-offset-signup-background mt-8 inline-flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Go to Dashboard →
      </Link>
    </motion.section>
  );
}
