"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Plan } from "@/lib/plans";
import { WELCOME_STORAGE_KEY } from "../details/DetailsForm";

const noopSubscribe = () => () => {};

function readWelcome() {
  try {
    return sessionStorage.getItem(WELCOME_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Greets the new user by name and shows how their emails will appear to recipients.
 * For a paid `plan`, also prompts the (upcoming) payment step.
 */
export default function WelcomeMessage({ plan }: { plan?: Plan }) {
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
      className="bg-signup-input/40 border-border mx-auto max-w-xl rounded-2xl border p-8 text-center sm:p-10"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
        <CheckCircle2 aria-hidden className="h-12 w-12 text-green-700" />
      </div>
      <h1 className="text-3xl font-bold">
        Welcome to Diliate{firstName ? `, ${firstName}` : ""}!
      </h1>
      <p className="text-secondary-foreground mt-3">
        Your account is ready. Start sending emails with your company identity.
      </p>

      <div className="bg-signup-background/60 border-border mt-8 rounded-lg border p-4 text-left">
        <p className="text-secondary-foreground text-xs font-medium tracking-wide uppercase">
          Your emails will appear as
        </p>
        <p className="text-foreground mt-1.5 font-mono text-sm break-all">
          {`${companyName || "Your Company"} <noreply@diliate.com>`}
        </p>
      </div>

      {plan && plan.id !== "free" && (
        <div className="border-primary/40 bg-primary/10 mt-4 rounded-lg border p-4 text-left">
          <p className="text-primary-ink text-sm">
            You selected the <span className="font-semibold">{plan.name}</span>{" "}
            plan. Complete payment to unlock{" "}
            {plan.monthlyEmails.toLocaleString("en-US")} emails/month.
          </p>
          <div className="group relative mt-3 inline-block">
            <button
              type="button"
              aria-disabled="true"
              aria-describedby="payment-coming-soon"
              onClick={(e) => e.preventDefault()}
              className="border-primary/50 text-primary-ink focus-visible:ring-primary cursor-not-allowed rounded-md border px-3.5 py-2 text-sm font-semibold opacity-70 focus-visible:ring-2 focus-visible:outline-none"
            >
              Set Up Payment →
            </button>
            <span
              id="payment-coming-soon"
              role="tooltip"
              className="bg-popover text-foreground border-border pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md border px-2.5 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
            >
              Coming soon
            </span>
          </div>
        </div>
      )}

      <Link
        href="/dashboard"
        className="bg-signup-accent hover:bg-signup-accent/90 focus-visible:ring-signup-accent focus-visible:ring-offset-signup-background text-primary-foreground mt-8 inline-flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Go to Dashboard →
      </Link>
    </motion.section>
  );
}
