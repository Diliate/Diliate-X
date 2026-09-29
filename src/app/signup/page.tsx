import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS, findPlan } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Choose your plan — Diliate",
  description:
    "Pick a Diliate plan and create your account. Start free with 50 emails a month or scale up to 100,000.",
  openGraph: {
    title: "Choose your plan — Diliate",
    description: "Start free with 50 emails a month or scale up to 100,000.",
    url: "https://diliate.com/signup",
    siteName: "Diliate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose your plan — Diliate",
    description: "Start free with 50 emails a month or scale up to 100,000.",
  },
};

/** Step 1 of signup: plan selection. `?plan=<id>` pre-highlights a card (e.g. from the landing page). */
export default async function SignupPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const selected = findPlan((await searchParams).plan)?.id;

  return (
    <div className="pt-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold tracking-wide text-blue-400 uppercase">
          Step 1 of 3
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Pick the plan that fits your sending
        </h1>
        <p className="mt-3 text-slate-400">
          Start free and upgrade any time. No credit card required for Free.
        </p>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const isSelected = plan.id === selected;
          return (
            <li key={plan.id}>
              <article
                aria-labelledby={`plan-${plan.id}`}
                className={cn(
                  "bg-signup-input flex h-full flex-col rounded-2xl border p-6 transition-all duration-200",
                  "focus-within:border-signup-accent hover:border-signup-accent/60",
                  isSelected
                    ? "border-signup-accent shadow-[0_0_36px_-6px_var(--signup-accent)]"
                    : "border-slate-700/70",
                )}
              >
                <div className="flex items-center justify-between">
                  <h2 id={`plan-${plan.id}`} className="text-lg font-semibold">
                    {plan.name}
                  </h2>
                  {isSelected && (
                    <span className="bg-signup-accent rounded-full px-2.5 py-0.5 text-xs font-medium text-white">
                      Selected
                    </span>
                  )}
                </div>
                <p className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="ml-1 text-sm text-slate-400">
                    {plan.period}
                  </span>
                </p>
                <p className="mt-1 text-sm font-medium text-blue-400">
                  {plan.emails}
                </p>

                <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle
                        aria-hidden
                        className="mt-0.5 h-4 w-4 shrink-0 text-blue-400"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/signup/details?plan=${plan.id}`}
                  aria-label={`Get started with the ${plan.name} plan`}
                  className={cn(
                    "mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold transition-colors",
                    "focus-visible:ring-signup-accent focus-visible:ring-offset-signup-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    isSelected
                      ? "bg-signup-accent hover:bg-signup-accent/90 text-white"
                      : "border-signup-accent/60 hover:bg-signup-accent border text-white",
                  )}
                >
                  Get Started
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
